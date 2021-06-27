import styled from "styled-components";

export const Modal = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
`

export const LoginModal = styled.div`
    flex-basis : 320px;
    background-color: white;
    position: relative;
    box-sizing: border-box;
    margin: 128px auto;
`

export const LoginMid = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const Close = styled.div`
    float: right;
    font-size: 28px;
    margin-right : 5px;
`

export const ModalContents = styled.div`
    margin: 0 auto;
      width: 100%;
      position: relative;
      padding: 0 20px 32px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      flex-direction: column;
      padding: 0 20px 20px 20px;

`

export const Title = styled.div`
    font-size : 24px;
    text-align : center;
    margin-bottom : 20px;
    letter-spacing : 3px;
`

export const RoomTitle = styled.div`
    display : flex;
    flex-wrap : nowrap;
    font-size : 14px;
    margin-top: 20px;
    align-items: center;
    padding: 8px;
`
export const Input = styled.input`
        font-size : 12px;
        border-style:none;
        border-bottom:solid 1px #cacaca;
        border-collapse:collapse;
        width : ${props => props.width};
`

export const SelectGame = styled.div`
    display : flex;
    justify-content = center;
    flex-direction : column;
`

export const Select = styled.select`
    font-size : 12px;
    text-align : center;
    width : 40%;
    margin : 30px auto;
`

export const Games = styled.option`
    font-size : 12px;
    text-align : center;
`
export const SelectPrivate = styled.div`
    display : flex;
    flex-wrap : nowrap;
    justify-content : center;
    margin-bottom : 10px;
`

export const Footer = styled.div`
    display : flex;
    flex-wrap : nowrap;
    justify-content : space-between;
`
export const ResultButton = styled.button`
    border : 0;
    width : 100%;
    font-size : 14px;
    padding : 5px;
    background-color : ${props => props.color};
    color : white;
`