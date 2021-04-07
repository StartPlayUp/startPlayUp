import React from "react";
import styled from "styled-components";
import FOOTER from "./webFooter";
const BodyFrame = styled.div`
    width: 100%;
    height: 90%;
    position : absolute;
`;
const BodyCenter = styled.div`
    width: 75%;
    height: 100%;
    margin: 0 auto;
    flex: 1 1 auto;
    flex-direction: column;
`;

const RoomList = styled.div`
    height: 90%;
    background-color: #FFFFF3;
    flex: 1 1 auto;
    flex-direction: column;
`;

const UserList = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding: 5px;
`;

const Users = styled.span`
    margin: 0 auto;
    font-size: 18px;
    

    &.title{
        font-size : 24px;
    }
`;

const ButtonArea = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
`;

const Button = styled.button`
    font-size: 14px;
    color: #FFFFFF;
    background-color: #A593E0;
    border-radius: 2px;
    border: 0;
    padding: 10px;
`;

const BODY = ({children}, ...rest) => {
    return (
        <div>
            <BodyFrame>
                <BodyCenter>
                    <ButtonArea>
                        <Button>Create Room</Button>
                    </ButtonArea>
                    <RoomList>
                        <UserList>
                            <Users>방 번호</Users>
                            <Users>방 제목</Users>
                            <Users>방 사용자</Users>
                            <Users>인원</Users>
                        </UserList>
                        <UserList>
                            {/*    map 사용하여 정렬하기 추후에 선도 그러놓고 할 거임 일단 틀만 잡아놈*/}
                        </UserList>
                    </RoomList>
                </BodyCenter>
                <FOOTER/>
            </BodyFrame>
        </div>
    )
}

export default BODY;