import React from "react";
import FOOTER from "./webFooter";
import HEADER from "./webHeader";
import CreateButton from "./CreateButton";

import {
    BodyFrame,
    BodyCenter,
    RoomFrame,
    UserList,
    Users,
    ButtonArea
} from '../Style/WebFrameStyle';

const BODY = ({location, history}) => {

    console.log(location);
    console.log(history);

    return (
        <>
            <HEADER/>
            <BodyFrame>
                <BodyCenter>
                    <ButtonArea>
                        <CreateButton type={'submit'}/>
                    </ButtonArea>
                    <RoomFrame>
                        <UserList color={'#566270'} background={'white'}>
                            <Users width={'5vw'}>방 번호</Users>
                            <Users width={'15vw'}>게임 이름</Users>
                            <Users width={'30vw'}>방 제목</Users>
                            <Users width={'15vw'}>방 사용자</Users>
                            <Users width={'5vw'}>인원</Users>
                        </UserList>
                        <hr/>
                        <UserList onClick={() => history.push('./waitingRoom')}>
                            <Users width={'5vw'}>1</Users>
                            <Users width={'15vw'}>Yutnori</Users>
                            <Users width={'30vw'}>윷놀이 ㄱ ㄱ</Users>
                            <Users width={'15vw'}>Jang</Users>
                            <Users width={'5vw'}>3</Users>
                        </UserList>
                        <hr/>
                        <UserList onClick={() => history.push('./waitingRoom')}>
                            <Users width={'5vw'}>1</Users>
                            <Users width={'15vw'}>Mafia</Users>
                            <Users width={'30vw'}>마피아 빠르게 한판 ㄱ ㄱ</Users>
                            <Users width={'15vw'}>Jang</Users>
                            <Users width={'5vw'}>3</Users>
                        </UserList>
                        <hr/>
                    </RoomFrame>
                </BodyCenter>
                <FOOTER/>
            </BodyFrame>
        </>
    );
}

export default BODY;