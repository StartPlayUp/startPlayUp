import React, {Component} from 'react';
import styled from "styled-components";
import WebHeader from './webHeader';
import FOOTER from "./webFooter";
import Users from "./Users";

const BodyFrame = styled.div`
    width: 100%;
    height: 100vh;
    position : absolute;
    background-color : #E0E3DA;
`;

const Room = styled.div`
    width: 75%;
    height :80vh;
    margin : auto;
    margin-top : 50px;
`

const Title = styled.div`
    display: flex;
    align-items: center;
`

const TitleSpan = styled.span`
    margin-right : 30px;
    font-size : ${(props) => props.fontSize};
    color : ${(props) => props.color};
`
const ButtonArea = styled.div`
    margin-top: 30px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
`

const LeftButtonsArea = styled.div`
    justify-content: flex-start;
`

const RightButtonsArea = styled.div`
    justify-content: flex-end;
`

const Button = styled.button`
    font-size: 14px;
    padding: 7px;
    margin-right : 15px;
`

const MainList = styled.div`
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin-top: 30px;
`

const UserList = styled.div`
    flex-basis: 50%;
    flex-direction: column;
`

const ChattingList = styled.div`
    flex-basis: 50%;
    flex-direction: column;
    height: 400px;
    background-color: #FFFFF3;
`

const WaitingRoom = ({location,history}) => {
    return (
        <div>
            <BodyFrame>
                <WebHeader/>
                <Room>
                    <Title>
                        <TitleSpan fontSize={"18px"} color={"red"}>Game</TitleSpan>
                        <TitleSpan fontSize={"22px"} color={"black"}>Title</TitleSpan>
                    </Title>
                    <hr/>
                    <ButtonArea>
                        <LeftButtonsArea>
                            <Button>시작</Button>
                            <Button>준비</Button>
                            <Button>관전</Button>
                        </LeftButtonsArea>
                        <RightButtonsArea>
                            <Button onClick={() => history.push('/')}>나가기</Button>
                        </RightButtonsArea>
                    </ButtonArea>
                    <MainList>
                        <UserList>
                            <h1>대기 목록</h1>
                            <hr/>
                            <div>
                                <Users id='1' name='Jang' />
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