import React, { useEffect, useState, useContext } from 'react';
import WebHeader from './webHeader';
import FOOTER from "./webFooter";
import { useLocation } from 'react-router-dom';
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
    RightButtonsArea, WaitingUsers
} from "../Style/WaitingRoomStyle";
import ChatComponent from "../../../ChatComponent";
import { RoomIdContext, PeersContext, PeerDataContext } from "../../../../Routes/peerStore";
import { useHistory } from "react-router";
import axios from "axios";
import { Background, Users } from "../Style/WebFrameStyle";
import { sendDataToPeers } from "Common/peerModule/sendToPeers"
import { GAME_START_SIGN } from 'Constants/peerDataTypes';


const WaitingRoom = ({ chatList, chatShow, setChatList }) => {
    const location = useLocation();
    const input = location.state.input;
    const game = location.state.game;
    const hostname = location.state.hostname;
    // const guests = location.list.guestList;
    const { roomID, setRoomID } = useContext(RoomIdContext);
    const history = useHistory()
    const { peers } = useContext(PeersContext);
    const { peerData } = useContext(PeerDataContext);



    const gameStart = () => {
        console.log(game);
        sendDataToPeers(GAME_START_SIGN, {
            game: null,
            nickname: localStorage.getItem('nickname'),
            peers,
            data: null,
        });
        console.log("waiting room hostname : ", hostname)
        switch (game) {
            case 'Yutnori':
                history.push({
                    pathname: "/YUT",
                    state: {
                        hostname,
                        input: input,
                        game: game,
                    },
                });
                break;
            case 'YACHT':
                history.push('/Yacht');
                break;
            case 'AVALON':
                history.push('/AVALON');
                break;
            case 'MINE_SEARCH':
                history.push('/MineSearch');
                break;
            default:
                alert('error');
        }
    }

    useEffect(() => {
        if (peerData.type === GAME_START_SIGN) {
            console.log("waiting room hostname : ", hostname)
            switch (game) {
                case 'Yutnori':
                    history.push({
                        pathname: "/YUT",
                        state: {
                            hostname,
                            input: input,
                            game: game,
                        },
                    });
                    break;
                case 'YACHT':
                    history.push('/Yacht');
                    break;
                case 'AVALON':
                    history.push('/AVALON');
                    break;
                case 'MINE_SEARCH':
                    history.push('/MineSearch');
                    break;
                default:
                    alert('error');
            }
        }
    }, [peerData])

    const [user, setUsers] = useState([]);
    useEffect(() => {
        axios.post('http://localhost:4000/api/room/accessRoom')
            .then(function (result) {
                console.log('checkUser get useEffect')
                const { userList, success } = result.data
                success && setUsers(userList)
            })
            .catch(function (error) {
                console.error('error : ', error)
            });
    }, [])

    return (
        <BodyFrame>
            <Background />
            <Room>
                <Title>
                    <TitleSpan fontSize={"18px"} color={"red"}>{game}</TitleSpan>
                    <TitleSpan fontSize={"22px"} color={"black"}>{input}</TitleSpan>
                </Title>
                <hr />
                <ButtonArea>
                    <LeftButtonsArea>
                        <Button onClick={gameStart}>시작</Button>
                        <Button>준비</Button>
                    </LeftButtonsArea>
                    <RightButtonsArea>
                        <Button margin={'0'} onClick={() => {
                            setRoomID({ ...roomID, id: "", state: false });
                            history.push('/main')
                        }}>나가기</Button>
                    </RightButtonsArea>
                </ButtonArea>
                <MainList>
                    <WaitingUsers>
                        {/*{*/}
                        {/*    guests.map(function (user, index) {*/}
                        {/*        console.log('---------------')*/}
                        {/*        console.log(user)*/}
                        {/*        return (*/}
                        {/*            <UserList key={index}>*/}
                        {/*                <Users width={'5vw'}>*/}
                        {/*                    {user}*/}
                        {/*                </Users>*/}
                        {/*            </UserList>*/}
                        {/*        )*/}
                        {/*    })*/}
                        {/*}*/}
                    </WaitingUsers>
                    <ChattingList>
                        {chatShow && (
                            <ChatComponent
                                chatList={chatList}
                                setChatList={setChatList}
                            />
                        )}
                    </ChattingList>
                </MainList>
            </Room>
        </BodyFrame>
    );
}
export default WaitingRoom;