import React, {useState} from "react";
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
} from '../Style/CreateRoomStyle';

const CreateRoom = ({isOpen, close}) => {

    let history = useHistory();
    const [input, setInput] = useState('');
    const [game, setGame] = useState('Yutnori');
    const [checked, setChecked] = useState(false);

    const onChange = e => {
        setInput(e.target.value);
    }

    const onGameChange = e => {
        setGame(e.target.value);
    }

    const onCheckChange = () => {
        setChecked(!checked);
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
                                        maxLength="25"
                                        width='200px'
                                        value={input}
                                        onChange={onChange}/>
                                </RoomTitle>
                                <RoomTitle>
                                    <span>암호 : &nbsp; </span>
                                    <input type="checkbox"
                                           checked={checked}
                                           onChange={onCheckChange}/>
                                    {checked ? (
                                        <Input type="password" maxLength='10' width='180px'/>
                                    ) : null}
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

export default CreateRoom;
