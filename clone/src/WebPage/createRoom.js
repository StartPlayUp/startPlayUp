import React, {Component, useState} from "react";
import {useHistory} from 'react-router-dom';

import {
    Modal,
    LoginMid,
    LoginModal,
    Close,
    ModalContents,
    Title,
    Games,
    SelectGame,
    RoomTitle,
    Input,
    SelectPrivate,
    Select,
    Footer,
    ResultButton,
} from './CreateRoomStyle';
import WaitingRoom from "./waitingRoom";
import {TitleSpan} from "./WaitingRoomStyle";


const CreateRoom = ({isOpen, close}) => {

    let history = useHistory();

    const [input, setInput] = useState('');
    const [game, setGame] = useState('Yutnori');

    const onChange = e => {
        setInput(e.target.value);
    }

    const onGameChange = e => {
        setGame(e.target.value);
    }


    return (
        <>
            {isOpen ? (
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
                                    <Input
                                        type="text"
                                        maxLength="20"
                                        width='200px'
                                        value={input}
                                        onChange={onChange}/>
                                </RoomTitle>
                                <RoomTitle>
                                    <span>암호 : &nbsp; </span>
                                    <input type="checkbox"/>
                                    <Input type="password" maxLength='10' width='180px'/>
                                </RoomTitle>
                                <SelectGame>
                                    <Select value={game} onChange={onGameChange}>
                                        <Games value={'Yutnori'}>윷놀이</Games>
                                        <Games value={'YachtDice'}>요트 다이스</Games>
                                        <Games value={'Mafia'}>마피아</Games>
                                    </Select>
                                </SelectGame>
                                <SelectPrivate>
                                    <span>관전허용 : </span>
                                    <input type="checkbox"/>
                                </SelectPrivate>
                            </ModalContents>
                            <Footer>
                                {/*<ResultButton color='#B8B8B0'>취소</ResultButton>*/}
                                <ResultButton color='#A593E0'
                                              onClick={() => {
                                                  history.push({
                                                      pathname: "/waitingRoom",
                                                      state: {
                                                          input: input,
                                                          game: game
                                                      }
                                                  })
                                              }}>
                                    확인
                                </ResultButton>
                            </Footer>
                        </LoginModal>
                    </LoginMid>
                </Modal>
            ) : null}
        </>
    )
}

// class CreateRoom extends Component {
//
//     MovePage() {
//         // window.history.pushState('data', '', './waitingRoom');
//         this.props.history.push('./waitingRoom');
//     }
//
//
//     componentDidMount() {
//         window.onpopstate = function (event) {
//             console.log(`location : ${document.location}, state : ${event.state}`)
//         }
//     }
//
//
//     render() {
//         const {isOpen, close} = this.props;   //아까 버튼에서 props로 가져온것
//
//         return (
//             <>
//                 {isOpen ? (
//
//                     ////만약 isopen(this.state.isModalOpen)이 true일때 코드를 실행 false면  null
//                     /// <div onClick={close}> 로그인창 말고 회색 바탕을 누를시 모달이 꺼지게 만듬
//                     ///<span className="close" onClick={close}>&times;</span> x버튼 누를시 꺼짐
//                     ////<div className="modalContents" onClick={isOpen}> 로그인 화면은 버튼 클릭해서 들어오면
//                     /// true인 상태로 있어서 화면이 안꺼진다.
//
//                     <Modal>
//                         <LoginMid>
//                             <LoginModal>
//                                 <Close onClick={close}>
//                                     &times;
//                                 </Close>
//                                 <ModalContents onClick={isOpen}>
//                                     <Title>
//                                         StartPlayUp
//                                     </Title>
//                                     <RoomTitle>
//                                         <span>제목 : &nbsp; </span>
//                                         <Input type="text" maxLength="20" width='200px'/>
//                                     </RoomTitle>
//                                     <RoomTitle>
//                                         <span>암호 : &nbsp; </span>
//                                         <input type="checkbox"/>
//                                         <Input type="password" maxLength='10' width='180px'/>
//                                     </RoomTitle>
//                                     <SelectGame>
//                                         <Select>
//                                             <Games>윷놀이</Games>
//                                             <Games>요트 다이스</Games>
//                                             <Games>마피아</Games>
//                                         </Select>
//                                     </SelectGame>
//                                     <SelectPrivate>
//                                         <span>관전허용 : </span>
//                                         <input type="checkbox"/>
//                                     </SelectPrivate>
//                                 </ModalContents>
//                                 <Footer>
//                                     {/*<ResultButton color='#B8B8B0'>취소</ResultButton>*/}
//                                     <ResultButton color='#A593E0'>
//                                         <Link to={`/waitingRoom`}>확인</Link><br/>
//                                     </ResultButton>
//                                 </Footer>
//                             </LoginModal>
//                         </LoginMid>
//                     </Modal>
//
//                 ) : null}
//             </>
//         );
//     }
// }

export default CreateRoom;
