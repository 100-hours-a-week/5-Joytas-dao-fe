import styled from 'styled-components'

export const Main = styled.div`
  width: 326ppx;
  padding: 0 16px;
  box-sizing: border-box;
  color: white;
  width: 100%;
  height: 100%;
`

export const Title = styled.div`
  padding-top: 70px;
  font-size: 20px;
  font-weight: bold;
`

export const SubTitle = styled.div`
  margin-top: 10px;
  font-size: 12px;
  font-weight: semi-bold;
`

export const ObjetModel = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 10px;
  height: 240px;
`

export const ChooseContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  gap: 20px;
  height: 40px;
  margin: 10px auto;
`

export const MoveIcon = styled.img`
  cursor: pointer;
  width: 25px;
`

export const ChooseButton = styled.button`
  cursor: pointer;
  width: 100px;
  height: 40px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.3);
  color: white;
  border: 0;
`

export const ModelIndexText = styled.div`
  text-align: center;
  font-size: 16px;
  margin-top: 50px;
  color: rgba(255, 255, 255, 0.6);
`

export const Container = styled.div`
  width: 100%;
  margin-top: 70px;
  box-sizing: border-box;
  gap: 30px;
  display: flex;
  flex-direction: column;
`
