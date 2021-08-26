import React from 'react';
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
import {CHAT_SHOW_BUTTON_STYLE, CHAT_SHOW_DIV_STYLE} from "../../../../Routes";
import {useHistory} from "react-router";


const WaitingRoom = ({chatList,chatShow,setChatList}) => {
    const location = useLocation();
    const input = location.state.input;
    const game = location.state.game;
    const history = useHistory()
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
                            <Button>시작</Button>
                            <Button>준비</Button>
                        </LeftButtonsArea>
                        <RightButtonsArea>
                            <Button margin={'0'} onClick={()=>history.push('/main')}>나가기</Button>
                        </RightButtonsArea>
                    </ButtonArea>
                    <MainList>
                        <UserList>
                            <h3>유저 목록 입니다.</h3>
                        </UserList>
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
                {/*<FOOTER/>*/}
            </BodyFrame>
        </div>
    )
}
export default WaitingRoom;