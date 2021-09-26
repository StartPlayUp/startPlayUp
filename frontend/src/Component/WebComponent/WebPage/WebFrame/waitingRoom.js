import React, {useEffect, useState, useContext} from 'react';
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
    RightButtonsArea, WaitingUsers
} from "../Style/WaitingRoomStyle";
import ChatComponent from "../../../ChatComponent";
import {PeerStore, RoomIdContext} from "../../../../Routes/peerStore";
import {useHistory} from "react-router";
import axios from "axios";
import {Background, Users} from "../Style/WebFrameStyle";
import PlayerList from "./PlayerList";


const WaitingRoom = ({chatList, chatShow, setChatList}) => {
    const location = useLocation();
    const gameType = location.state.gameType
    const roomTitle = location.state.roomTitle
    const hostname = location.state.hostname
    // const guests = location.list.guestList;
    const {roomID, setRoomID} = useContext(RoomIdContext);
    const history = useHistory()
    const gameStart = () => {
        console.log(game);
        switch (game) {
            case 'Yutnori':
                history.push({
                    pathname: "/YUT",
                    state: {
                        roomTitle : roomTitle,
                        gameType : gameType,
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

    const [user, setUsers] = useState([]);
    useEffect(() => {
        axios.post('http://localhost:4000/api/room/accessRoom')
            .then(function (result) {
                console.log('checkUser get useEffect')
                const {userList, success} = result.data
                success && setUsers(userList)
            })
            .catch(function (error) {
                console.error('error : ', error)
            });
    }, [])

    return (
        <BodyFrame>
            <Background/>
            <Room>
                <Title>
                    <TitleSpan fontSize={"18px"} color={"red"}>{gameType}</TitleSpan>
                    <TitleSpan fontSize={"22px"} color={"black"}>{roomTitle}</TitleSpan>
                </Title>
                <hr/>
                <ButtonArea>
                    <LeftButtonsArea>
                        <Button onClick={gameStart}>시작</Button>
                        <Button>준비</Button>
                    </LeftButtonsArea>
                    <RightButtonsArea>
                        <Button margin={'0'} onClick={() => {
                            setRoomID({...roomID, id: "", state: false});
                            history.push('/main')
                        }}>나가기</Button>
                    </RightButtonsArea>
                </ButtonArea>
                <MainList>
                    <WaitingUsers>
                        <PlayerList/>
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