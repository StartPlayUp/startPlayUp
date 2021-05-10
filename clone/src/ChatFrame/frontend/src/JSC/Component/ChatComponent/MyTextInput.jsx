import React, { memo, useState } from 'react';
import styled from "styled-components";
import voicetalk from "../../icon/voicetalk.svg";
import { sendDataToPeers } from '../../Common/peerModule/sendToPeers'
import { chatAddMessage } from "../../Common/ChatModule/addMessage"
import { PEER_CHAT } from "../../Constants/peerDataTypes";

// import { SEND_MESSAGE, socketApi } from "../../Common/socketModule";

const SendChat = styled.div`
   border-top: 3px solid #ececec;
   height:75px;
   width:inherit;
   background-color: rgb(255, 255, 255);
`;

const FieldSet = styled.div`
    display:flex;
    flex-direction: row;
`;

const FieldInput = styled.input`
    width:100%;
    height:30px;
    border:3px solid #ececec; /* <input> 태그 테두리 삭제*/
    border-radius:30px;
    margin:5px 10px 5px 10px;
`;

const FieldSetBtn = styled.button`
    margin:10px;
    display:flex;
    align-items: center; /* 세로축 중앙 가로축 중앙 맞춤*/
    justify-content: center;
    width:60px;
    height:25px;
    overflow:hidden;
    background-color: ${props => props.disabled === false ? "rgb(208,208,208)" : "rgb(150,150,150)"};
    color:white;
    border:none;
    border-radius: 30px;
    box-shadow: 0.2px 0.2px 0.1px 0.1px rgba(163, 167, 162, 0.774); /*그림자 만들기*/
    cursor:pointer;    
`;


const SendMenuButtons = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: space-around; /*임시로 크기 정해주고 위치 맞춤*/
    align-items: center;
`;

const SendMenuButton = styled.button`
    border:0;
    outline:0;
    background-color: white;
    cursor: pointer;
    width:20%;
`;


const makeSendMediaButton = (mediaBtn) => {
    return (
        <SendMenuButtons className="sendMenuBtn">
            {
                mediaBtn.map((i, index) =>
                    <SendMenuButton key={mediaBtn[index]}><img src={i} /></SendMenuButton>
                )
            }
        </SendMenuButtons>
    )
};


const MyTextInput = ({ chatList, setChatList, myNickname, socketRef, peers }) => {
    const [inputMessage, setInputMessage] = useState("");
    const InputMessageChangeHandler = (e) => {
        e.preventDefault();
        inputMessage.length > 30 || setInputMessage(e.target.value); // 30글자 제한해야함.
    };

    const fieldSetButtonHandler = (e) => { // 텍스트가 들어있으면 버튼이 활성화 핸들러
        e.preventDefault();
        let success = undefined;
        success = sendDataToPeers(PEER_CHAT, { nickname: myNickname, data: inputMessage, peers });
        if (success) {
            chatAddMessage({ nickname: myNickname, inputMessage, chatList, setChatList });
            setInputMessage("");
        }
        else {
            console.log("채팅 전송 실패");
        }
    };

    return (
        <SendChat className="sendChat">
            <form className="sendForm" name="chat">
                <FieldSet className="fieldSet">
                    <FieldInput value={inputMessage} onChange={InputMessageChangeHandler} className="fieldInput" />
                    <FieldSetBtn disabled={!inputMessage} onClick={fieldSetButtonHandler} type='submit'
                        className="fieldSetBtn">전송</FieldSetBtn>
                </FieldSet>
                <div>
                    {makeSendMediaButton([voicetalk])}
                </div>
            </form>
        </SendChat>
    );
}

export default memo(MyTextInput);
