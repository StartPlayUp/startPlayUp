import React, {Component} from "react";
import styled from 'styled-components';
import CreateButton from "./CreateButton";

const Modal = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
`

const LoginModal = styled.div`
    flex-basis : 320px;
    background-color: white;
    position: relative;
    box-sizing: border-box;
    margin: 56px auto;
`

const LoginMid = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Close = styled.div`
    float: right;
    font-size: 28px;
    margin-right : 5px;
`

const ModalContents = styled.div`
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

const Title = styled.div`
    font-size : 24px;
    text-align : center;
    margin-bottom : 20px;
    letter-spacing : 3px;
`

const RoomTitle = styled.div`
    display : flex;
    flex-wrap : nowrap;
    font-size : 14px;
    margin-top: 20px;
    align-items: center;
    padding: 8px;
`
const Input = styled.input`
        font-size : 12px;
        border-style:none;
        border-bottom:solid 1px #cacaca;
        border-collapse:collapse;
        width : ${props => props.width};
`

const SelectGame = styled.div`
    display : flex;
    justify-content = center;
    flex-direction : column;
`

const Select = styled.select`
    font-size : 12px;
    text-align : center;
    width : 40%;
    margin : 30px auto;
`

const Games = styled.option`
    font-size : 12px;
    text-align : center;
`
const SelectPrivate = styled.div`
    display : flex;
    flex-wrap : nowrap;
    justify-content : center;
    margin-bottom : 10px;
`

const Footer = styled.div`
    display : flex;
    flex-wrap : nowrap;
    justify-content : space-between;
`
const ResultButton = styled.button`
    border : 0;
    width : 100%;
    font-size : 14px;
    padding : 5px;
    background-color : ${props => props.color};
    color : white;
`


class CreateRoom extends Component {
    componentDidMount() {
        window.onpopstate = function (event) {
            console.log(`location : ${document.location}, state : ${event.state}`)
        }
    }

    Move() {
        window.history.pushState('data', '', './waitingRoom');
    }

    render() {
        const {isOpen, close} = this.props;   //아까 버튼에서 props로 가져온것

        return (
            <>
                {isOpen ? (

                    ////만약 isopen(this.state.isModalOpen)이 true일때 코드를 실행 false면  null
                    /// <div onClick={close}> 로그인창 말고 회색 바탕을 누를시 모달이 꺼지게 만듬
                    ///<span className="close" onClick={close}>&times;</span> x버튼 누를시 꺼짐
                    ////<div className="modalContents" onClick={isOpen}> 로그인 화면은 버튼 클릭해서 들어오면
                    /// true인 상태로 있어서 화면이 안꺼진다.


                    <Modal>
                        <LoginMid>
                            <LoginModal>
                                <Close onClick={close}>
                                    &times;
                                </Close>
                                <ModalContents onClick={isOpen}>
                                    <Title>
                                        StartPlayUp
                                    </Title>
                                    <RoomTitle>
                                        <span>제목 : &nbsp; </span>
                                        <Input type="text" maxLength="20" width='200px'/>
                                    </RoomTitle>
                                    <RoomTitle>
                                        <span>암호 : &nbsp; </span>
                                        <input type="checkbox"/>
                                        <Input type="password" maxLength='10' width='180px'/>
                                    </RoomTitle>
                                    <SelectGame>
                                        <Select>
                                            <Games>윷놀이</Games>
                                            <Games>요트 다이스</Games>
                                            <Games>마피아</Games>
                                        </Select>
                                    </SelectGame>
                                    <SelectPrivate>
                                        <span>관전허용 : </span>
                                        <input type="checkbox"/>
                                    </SelectPrivate>
                                </ModalContents>
                                <Footer>
                                    {/*<ResultButton color='#B8B8B0'>취소</ResultButton>*/}
                                    <ResultButton onClick={(props) => {
                                        this.Move();
                                    }} color='#A593E0'>확인 </ResultButton>
                                </Footer>
                            </LoginModal>
                        </LoginMid>
                    </Modal>
                ) : null}
            </>
        );
    }
}

export default CreateRoom;