import React, {useEffect, useState} from 'react';
import WebHeader from './webHeader';
import FOOTER from "./webFooter";
import {useLocation} from 'react-router-dom';
//import ChatComponent from '../../ChatFrame/frontend/src/Component/ChatComponent'
//import {Store} from '../../ChatFrame/frontend/src/store'
import {
    BodyFrame,
    Button,
    ButtonArea,
    ChattingList,
    MainList,
    Room,
    Title,
    TitleSpan,
    UserList,
    LeftButtonsArea,
    RightButtonsArea
} from "../Style/WaitingRoomStyle";
import ChatComponent from "../../../ChatComponent";
import {PeerStore} from "../../../../Routes/peerStore";
import {useHistory} from "react-router";
import axios from "axios";
import {Users} from "../Style/WebFrameStyle";


const WaitingRoom = ({chatList, chatShow, setChatList}) => {
    const location = useLocation();
    const input = location.state.input;
    const game = location.state.game;
    const history = useHistory()
    const gameStart = () => {
        switch (game) {
            case 'Yut':
                history.push('/Yut');
                break;
            case 'YachtDice':
                history.push('/Yacht');
                break;
            case 'AVALON':
                history.push('/AVALON');
                break;
            case 'MineSearch':
                history.push('/MineSearch');
                break;
            default:
                alert('error');
        }
    }
    const [user, setUsers] = useState([]);
    useEffect(() => {
        axios.post('http://localhost:4000/checkUser?email=test2@gmail.com')
            .then(function (result) {
                console.log('checkUser get useEffect')
                const {userList, success} = result.data
                success && setUsers(userList)
            })
            .catch(function (error) {
                console.error('error : ', error)
            });
    })
    return (
        <div>
            <BodyFrame>
                <Room>
                    <Title>
                        <TitleSpan fontSize={"18px"} color={"red"}>{game}</TitleSpan>
                        <TitleSpan fontSize={"22px"} color={"black"}>{input}</TitleSpan>
                    </Title>
                    <hr/>
                    <ButtonArea>
                        <LeftButtonsArea>
                            <Button onClick={gameStart}>시작</Button>
                            <Button>준비</Button>
                        </LeftButtonsArea>
                        <RightButtonsArea>
                            <Button margin={'0'} onClick={() => history.push('/main')}>나가기</Button>
                        </RightButtonsArea>
                    </ButtonArea>
                    <MainList>
                        {
                            user.map(function (user, index) {
                                return (
                                    <UserList key={index}>
                                        <Users width={'5vw'}>
                                            {user.nickname}
                                        </Users>
                                    </UserList>
                                )
                            })
                        }
                        <ChattingList>
                            <PeerStore>
                                {chatShow && (
                                    <ChatComponent
                                        chatList={chatList}
                                        setChatList={setChatList}
                                        width={500}
                                    />
                                )}
                                {/*<CHAT_SHOW_DIV_STYLE>*/}
                                {/*    <CHAT_SHOW_BUTTON_STYLE onClick={chatOnClickHandler} />*/}
                                {/*</CHAT_SHOW_DIV_STYLE>*/}
                            </PeerStore>
                        </ChattingList>
                    </MainList>
                </Room>
            </BodyFrame>
        </div>
    );
}
export default WaitingRoom;