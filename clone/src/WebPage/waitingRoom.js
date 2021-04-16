import React, {Component, useState} from 'react';
import WebHeader from './webHeader';
import FOOTER from "./webFooter";
import {useLocation} from 'react-router-dom';

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
} from "./WaitingRoomStyle";

const WaitingRoom = ({ history}) => {
    const location = useLocation();
    const input = location.state.input;
    const game = location.state.game;

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
                            <Button margin={'0'} onClick={() => history.push('/')}>나가기</Button>
                        </RightButtonsArea>
                    </ButtonArea>
                    <MainList>
                        <UserList>
                            <div>
                                dff
                            </div>
                        </UserList>
                        <ChattingList>
                            <h1>채팅 방</h1>
                            <hr/>
                        </ChattingList>
                    </MainList>
                </Room>
                <FOOTER/>
            </BodyFrame>
        </div>
    )
}


export default WaitingRoom;