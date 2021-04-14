import React, {useState} from "react";
import {Link} from 'react-router-dom';
import styled from "styled-components";
import FOOTER from "./webFooter";
import HEADER from "./webHeader";
import CreateButton from "./CreateButton";

const BodyFrame = styled.div`
    width: 100%;
    height: 100%;
    background-color : #E0E3DA;
    margin : 0 auto;
    position : absolute;
`;
const BodyCenter = styled.div`
    width: 75%;
    height: 90%;
    margin: 0 auto;
    flex: 1 1 auto;
    background-color = gray;
    flex-direction: column;
`;

const RoomFrame = styled.div`
    height: 90%;
    background-color: #FFFFF3;
    flex: 1 1 auto;
    flex-direction: column;
`;

const UserList = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding: 5px;
    color : ${props => props.color};
    background-color : ${props => props.background};
`;

const Users = styled.span`
    margin: 0 auto;
    font-size: 18px;
    display : flex;
    justify-content : center;
    align-item : center;
`;

const RoomList = styled.div`
    align-content : center;
`

const ButtonArea = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
`;

const BODY = ({location, history,match}) => {

    console.log(location);
    console.log(history);

    const[text,setText] = useState('');

    const TextChange = e => {
        setText(e.target.value);
    };

        return (
        <>
            <HEADER/>
            <BodyFrame>
                <BodyCenter>
                    <ButtonArea>
                        <CreateButton/>
                    </ButtonArea>
                    <RoomFrame>
                        <RoomList>
                            <UserList color={'#566270'} background={'white'}>
                                <Users>방 번호</Users>
                                <Users>게임 이름</Users>
                                <Users>방 제목</Users>
                                <Users>방 사용자</Users>
                                <Users>인원</Users>
                            </UserList>
                            <UserList onClick={() => history.push('./waitingRoom')}>
                                <Users><Link to={`${match.url}`}>1</Link></Users>
                                <Users>Mafia</Users>
                                <Users>윷놀이 한판  ㄱ ㄱ</Users>
                                <Users>Jang</Users>
                                <Users>3</Users>
                            </UserList>
                            <hr/>
                        </RoomList>
                    </RoomFrame>
                </BodyCenter>
                <FOOTER/>
            </BodyFrame>
        </>
    );
}

export default BODY;