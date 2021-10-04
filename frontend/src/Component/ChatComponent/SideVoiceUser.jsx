import React, { memo, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Button } from '../WebComponent/WebPage/Style/WaitingRoomStyle'

const ConnectUsers = styled.div`
    display:flex;
    flex-direction:column;
    flex-basis:100px;
    overflow:hidden;
    text-overflow:ellipsis;
    flex-grow:0;
    margin-top:12px;
`;
const PeersList = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Jua&display=swap');
    padding:1px;
    padding-left:5px;
    overflow:hidden;
    text-overflow:ellipsis;
    /* border:1px solid gray; */
    margin:1px;
    justify-self: center;
    font-family: 'Fira Code', monospace;
    font-weight: bold;

`;

const StyleButton = styled(Button)`
     &:hover {
       background-color: green;
     }
`;

const App = ({ peers }) => {
    const onClickSendReport = async (opponentNickname) => {
        if (window.confirm(`${opponentNickname.split(' ')[0]} : 플레이어를 정말 신고합니까?`)) {
            const result = await axios.get(`/api/user/report?nickname=${opponentNickname}`);
            if (result.data.success) {
                alert("신고 완료!")
            }
            else {
                alert("신고 실패!")
            }
        }
    }

    return (
        <ConnectUsers>
            <StyleButton>
                <PeersList>{localStorage.getItem('nickname').split(' ')[0] + '(나)'}</PeersList>
            </StyleButton>
            {peers.map((i) => <StyleButton onClick={() => onClickSendReport(i.nickname)}>
                <PeersList key={i.peer}>{i.nickname.split(' ')[0]}</PeersList>
            </StyleButton>)
            }
        </ConnectUsers >
    )
}

export default memo(App);
