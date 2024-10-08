import styled from 'styled-components'

export const Greetings = styled.div`
  color: white;
  padding: 20px 32px;
`

export const WelcomeMessage = styled.div`
  font-size: 18px;
  font-weight: bold;
`

export const Nickname = styled.div`
  font-size: 23px;
  padding: 5px 10px;
  width: fit-content;
  border-radius: 10px;
  background-color: rgba(117, 117, 117, 0.5);
  margin-top: 5px;
  font-weight: bold;
  color: rgba(255, 204, 0);
`

export const BannerImage = styled.img`
  background-color: grey;
  height: fit-content;
  width: 100%;
  display: flex;
  object-fit: cover;
  align-items: center;
  justify-content: center;

  @media (min-width: 600px) {
    height: 280px;
  }
`

export const BannerVideo = styled.video`
  background-color: grey;
  width: 100%;
  height: 180px;

  display: flex;
  object-fit: cover;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1.9;

  @media (min-width: 600px) {
    height: 250px;
  }
`

export const MyObjetContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const MyObjetTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px 32px;
  margin-top: 20px;
  font-size: 17px;
  font-weight: 500;

  img {
    width: 22px;
    height: 22px;
    margin-right: 10px;
  }

  @media (min-width: 600px) {
    font-size: 20px;
  }
`

export const LottieContainer = styled.div`
  margin-top: 70px;
`

export const PreparingContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  height: 50px;
  padding: 25px 0 100px 0;
  max-width: 600px;
  overflow: hidden;
  white-space: nowrap;

  @media (max-width: 599px) {
    display: none;
  }

  @media (min-height: 860px) {
    position: absolute;
    bottom: 70px;
    padding: 0;
    height: 80px;
  }
`

export const PreparingItem = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  justify-content: center;
  text-align: center;
  height: 50px;
  width: 190px;
  border-radius: 10px;
  border: 0.1px solid #505050;
  color: #505050;
  font-size: 13px;
`
