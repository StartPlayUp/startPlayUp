import React from 'react';
import WebHeader from './webHeader';
import FOOTER from "./webFooter";
import {useLocation} from 'react-router-dom';
import ChatComponent from '../../ChatFrame/frontend/src/JSC/Component/ChatComponent'
import {Store} from '../../ChatFrame/frontend/src/JSC/store'
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

const WaitingRoom = ({history}) => {
    const location = useLocation();
    const input = location.state.input;
    const game = location.state.game;

    require('react-dom');
    window.React2 = require('react');
    console.log(window.React1 === window.React2)

    return (
        <div>
            <BodyFrame>
                <WebHeader/>
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
                            <Button>관전</Button>
                        </LeftButtonsArea>
                        <RightButtonsArea>
                            <Button margin={'0'} onClick={() => history.push('/Home')}>나가기</Button>
                        </RightButtonsArea>
                    </ButtonArea>
                    <MainList>
                        <UserList>
                            <div>
                                <h1>유저</h1>
                            </div>
                        </UserList>
                        <ChattingList>
                            <Store>
                                <ChatComponent/>
                            </Store>
                        </ChattingList>
                    </MainList>
                </Room>
                <FOOTER/>
            </BodyFrame>
        </div>
    )
}
export default WaitingRoom;