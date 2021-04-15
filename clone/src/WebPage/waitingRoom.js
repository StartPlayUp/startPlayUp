import React, {Component, useState} from 'react';
import styled from "styled-components";
import WebHeader from './webHeader';
import FOOTER from "./webFooter";
import Users from "./Users";
import webBody from "./webBody";
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

const WaitingRoom = ({location, history, props, match}) => {

    return (
        <div>
            <BodyFrame>
                <WebHeader/>
                <Room>
                    <Title>
                        <TitleSpan fontSize={"18px"} color={"red"}>Mafia</TitleSpan>
                        <TitleSpan fontSize={"22px"} color={"black"}>마피아 게임 한판 ㄱ</TitleSpan>
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
                            <h1>대기 목록</h1>
                            <hr/>
                            <div>
                                <Users id='1' name='Jang'/>
                                <Users id='2' name='Chan'/>
                                <Users id='3' name='Jin'/>
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