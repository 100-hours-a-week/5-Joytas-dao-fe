import { useState, useRef, useEffect, useCallback } from 'react'
import io from 'socket.io-client'
import Video from './Video'
import useUserStore from '../../store/userStore'
import { Container, UserLabel } from './VideoStyles'

interface WebRTCUser {
  socket_id: string
  nickname: string
  stream: MediaStream
}

interface SocketError {
  error: {
    status: number
    message: string
  }
}

const SOCKET_SERVER_URL = import.meta.env.VITE_BACKHOST

const pc_config = {
  iceServers: [
    {
      urls: 'turn:192.158.29.39:3478?transport=udp',
      credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
      username: '28224511:1379330808',
    },
    {
      urls: 'stun:stun.l.google.com:19302',
    },
  ],
}

const VideoContainer = ({
  objetId,
  loungeId,
}: {
  objetId: number
  loungeId: number
}) => {
  const socketRef = useRef<SocketIOClient.Socket>()
  const pcsRef = useRef<{ [socketId: string]: RTCPeerConnection }>({})
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const localStreamRef = useRef<MediaStream>()
  const [users, setUsers] = useState<WebRTCUser[]>([])

  if (localVideoRef.current) localVideoRef.current.volume = 0

  const token = localStorage.getItem('access_token')
  const nickname = useUserStore((state) => state.nickname)
  const profile_image = useUserStore((state) => state.profileImage)
  const user_id = useUserStore((state) => state.userId)

  const getLocalStream = useCallback(async () => {
    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: 120,
          height: 120,
        },
      })
      localStreamRef.current = localStream

      if (localVideoRef.current) localVideoRef.current.srcObject = localStream
      if (!socketRef.current?.connected) {
        return
      }

      socketRef.current.emit('join_objet', {
        objet_id: objetId,
        nickname,
        profile_image,
        user_id,
      })
    } catch (e) {
      console.error(`getUserMedia error: ${e}`)
    }
  }, [])

  const createPeerConnection = useCallback(
    (socketID: string, nickname: string) => {
      try {
        const pc = new RTCPeerConnection(pc_config)

        pc.onicecandidate = (e) => {
          if (!(socketRef.current && e.candidate)) return
          socketRef.current.emit('candidate', {
            candidate: e.candidate,
            candidateSendID: socketRef.current.id,
            candidateReceiveID: socketID,
          })
        }

        pc.oniceconnectionstatechange = (e) => {
          console.log(e)
        }

        pc.ontrack = (e) => {
          setUsers((oldUsers) =>
            oldUsers
              .filter((user) => user.socket_id !== socketID)
              .concat({
                socket_id: socketID,
                nickname,
                stream: e.streams[0],
              })
          )
        }

        if (localStreamRef.current) {
          localStreamRef.current.getTracks().forEach((track) => {
            if (!localStreamRef.current) return
            pc.addTrack(track, localStreamRef.current)
          })
        } else {
          console.error('no local stream')
        }

        return pc
      } catch (e) {
        console.error(e)
        return undefined
      }
    },
    []
  )

  useEffect(() => {
    socketRef.current = io.connect(SOCKET_SERVER_URL, {
      transports: ['websocket'],
      path: '/signaling/',
      query: {
        token,
        lounge_id: loungeId,
      },
    })

    getLocalStream()

    socketRef.current.on('error_message', (data: SocketError) => {
      alert(`Error: ${data.error.message}`)
    })

    socketRef.current.on(
      'all_users',
      (allUsers: Array<{ socket_id: string; nickname: string }>) => {
        allUsers.forEach(async (user) => {
          if (!localStreamRef.current) return
          const pc = createPeerConnection(user.socket_id, user.nickname)
          if (!(pc && socketRef.current)) return
          pcsRef.current = { ...pcsRef.current, [user.socket_id]: pc }
          try {
            const localSdp = await pc.createOffer({
              offerToReceiveAudio: true,
              offerToReceiveVideo: true,
            })
            await pc.setLocalDescription(new RTCSessionDescription(localSdp))
            socketRef.current.emit('offer', {
              sdp: localSdp,
              offerSendID: socketRef.current.id,
              offerSendNickname: nickname,
              offerReceiveID: user.socket_id,
            })
          } catch (e) {
            console.error(e)
          }
        })
      }
    )

    socketRef.current.on(
      'getOffer',
      async (data: {
        sdp: RTCSessionDescription
        offerSendID: string
        offerSendNickname: string
      }) => {
        const { sdp, offerSendID, offerSendNickname } = data
        if (!localStreamRef.current) return
        const pc = createPeerConnection(offerSendID, offerSendNickname)
        if (!(pc && socketRef.current)) return
        pcsRef.current = { ...pcsRef.current, [offerSendID]: pc }
        try {
          await pc.setRemoteDescription(new RTCSessionDescription(sdp))
          const localSdp = await pc.createAnswer({
            offerToReceiveVideo: true,
            offerToReceiveAudio: true,
          })
          await pc.setLocalDescription(new RTCSessionDescription(localSdp))
          socketRef.current.emit('answer', {
            sdp: localSdp,
            answerSendID: socketRef.current.id,
            answerReceiveID: offerSendID,
          })
        } catch (e) {
          console.error(e)
        }
      }
    )

    socketRef.current.on(
      'getAnswer',
      (data: { sdp: RTCSessionDescription; answerSendID: string }) => {
        const { sdp, answerSendID } = data
        const pc: RTCPeerConnection = pcsRef.current[answerSendID]
        if (!pc) return
        pc.setRemoteDescription(new RTCSessionDescription(sdp))
      }
    )

    socketRef.current.on(
      'getCandidate',
      async (data: {
        candidate: RTCIceCandidateInit
        candidateSendID: string
      }) => {
        const pc: RTCPeerConnection = pcsRef.current[data.candidateSendID]
        if (!pc) return
        await pc.addIceCandidate(new RTCIceCandidate(data.candidate))
      }
    )

    socketRef.current.on('user_exit', (data: { socket_id: string }) => {
      if (!pcsRef.current[data.socket_id]) return
      pcsRef.current[data.socket_id].close()
      delete pcsRef.current[data.socket_id]
      setUsers((oldUsers) =>
        oldUsers.filter((user) => user.socket_id !== data.socket_id)
      )
    })

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
      users.forEach((user) => {
        if (pcsRef.current[user.socket_id]) {
          pcsRef.current[user.socket_id].close()
          delete pcsRef.current[user.socket_id]
        }
      })

      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop())
        localStreamRef.current = undefined
      }
    }
  }, [createPeerConnection, getLocalStream])

  return (
    <>
      {/*본인*/}
      <Container>
        <video
          style={{
            width: 90,
            height: 90,
            backgroundColor: 'black',
            borderRadius: 100,
          }}
          muted
          ref={localVideoRef}
          autoPlay
        />
        <UserLabel>{nickname}</UserLabel>
      </Container>

      {/*다른 사용자*/}
      {users.map((user, index) => (
        <Video key={index} nickname={user.nickname} stream={user.stream} />
      ))}
    </>
  )
}

export default VideoContainer
