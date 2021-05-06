import React, {memo, useContext, useEffect, useRef, useState} from 'react';
import styled from 'styled-components'
import Message from './Message'
import MyTextInput from "./MyTextInput";
import Nav from "./Nav";
import {UserContext} from "../../store";
import io from "socket.io-client";
import {chatAddMessage} from "../../Common/chat"
import {RECEIVE_MESSAGE, socketApi} from "../../Common/socketApi";
import SideVoiceUser from "./SideVoiceUser";

const TextField = styled.div`
  display:flex;
  padding:10px;
  border: rgb(0, 0, 0);
  flex-direction: column;
  overflow-y: scroll;
  height:${props => props.width || 600}px;
  width:inherit;
  border-right:3px solid #ececec;
  background-color: white;
  
  &::-webkit-scrollbar{
    width: 100%;
    background-color: black;
  }
  
`;

const Chat = styled.div`

    display:flex;
    flex-direction: column;
    height:${props => props.width || 600}px;
    width:${props => props.width || 600}px;
    border-radius: 10%;
`;

const TextFieldWithVoiceUsers = styled.div`
      background-color: white;
      width: inherit;
      display: flex;
      flex-direction: row;
`;

// const currentSocket = io.connect("/");

function Index({backgroundColor, height, width, ...props}) {
    const socketRef = useRef();
    const {user, isAuthenticated, dispatch} = useContext(UserContext);
    const myNickName = user;
    console.log("[debug] : ", user, isAuthenticated);
    const [chatList, setChatList] = useState([]);
    const scrollRef = useRef(null);
    const scrollToBottom = () => {
        const {scrollHeight, clientHeight} = scrollRef.current;
        scrollRef.current.scrollTop = scrollHeight - clientHeight;
    };
    useEffect(()=>{
        socketRef.current = io.connect("/");
    },[]);

    useEffect(() => {
        socketApi(RECEIVE_MESSAGE, {socketRef, chatList, setChatList}, chatAddMessage);
        return () => socketApi(RECEIVE_MESSAGE, {socketRef, socketOnOff: false});
    }, [chatList]);


    useEffect(() => {
        console.log(chatList);
        scrollToBottom();
    }, [chatList]);
    return (
        <Chat width={height} height={width}>

            <Nav/>
            <TextFieldWithVoiceUsers>
                <TextField className="textField" ref={scrollRef}>
                    {chatList.map((i, index) => <Message key={"chat" + index}
                                                         who={i.nickname === myNickName ? "me" : "another"}
                                                         chatObject={i} chatList={chatList}/>)}
                </TextField>
                <SideVoiceUser socketRef={socketRef}/>
            </TextFieldWithVoiceUsers>
            <MyTextInput nickname={myNickName} chatList={chatList} setChatList={setChatList}
                         socketRef={socketRef}/>

        </Chat>
    );
}

export default memo(Index);
