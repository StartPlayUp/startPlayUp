import React, {useState} from "react";
import HEADER from "./webHeader";
import CreateButton from "./CreateButton";
import * as S from '../Style/WebFrameStyle'
import {
    BodyFrame,
    BodyCenter,
    RoomFrame,
    UserList,
    Users,
    ButtonArea,
} from "../Style/WebFrameStyle";
import axios from "axios";

const BODY = ({location, history}) => {
    const [click, setClick] = useState(false)
    const onClick = () => {
        setClick(!click)
    }
    console.log(location);
    console.log(history);
    return (
        <>
            <HEADER isClick={onClick}/>
            <BodyFrame>
                <BodyCenter>
                    {click && <S.PlayerInfo>
                        <div>
                            <h5>닉네임 : oxix</h5>
                            <h5>게임 수 : 10판</h5>
                            <h5>승 : 5판</h5>
                            <h5>패 : 5판</h5>
                            <h5>승률 : 50%</h5>
                        </div>
                    </S.PlayerInfo>
                    }
                    <ButtonArea>
                        <CreateButton type={"submit"}/>
                    </ButtonArea>
                    <RoomFrame>
                        <UserList color={"#566270"} background={"white"}>
                            <Users width={"5vw"}>방 번호</Users>
                            <Users width={"15vw"}>게임 이름</Users>
                            <Users width={"30vw"}>방 제목</Users>
                            <Users width={"15vw"}>방 사용자</Users>
                            <Users width={"5vw"}>인원</Users>
                        </UserList>
                        <hr/>
                        <UserList>
                            {

                            }
                        </UserList>
                        <UserList onClick={() => history.push("./waitingRoom")}>
                            <Users width={"5vw"}>1</Users>
                            <Users width={"15vw"}>Yutnori</Users>
                            <Users width={"30vw"}>윷놀이 ㄱ ㄱ</Users>
                            <Users width={"15vw"}>Jang</Users>
                            <Users width={"5vw"}>3</Users>
                        </UserList>
                        <hr/>
                        <UserList onClick={() => history.push("./waitingRoom")}>
                            <Users width={"5vw"}>1</Users>
                            <Users width={"15vw"}>Mafia</Users>
                            <Users width={"30vw"}>마피아 빠르게 한판 ㄱ ㄱ</Users>
                            <Users width={"15vw"}>Jang</Users>
                            <Users width={"5vw"}>3</Users>
                        </UserList>
                        <hr/>
                    </RoomFrame>
                </BodyCenter>
            </BodyFrame>
        </>
    );
};

export default BODY;
