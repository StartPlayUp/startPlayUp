import React, { memo, useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components'
import Message from './Message'
import MyTextInput from "./MyTextInput";
import Nav from "./Nav";
import { PEER_CHAT } from "Constants/peerDataTypes"
import { chatAddMessage } from "Common/ChatModule/addMessage"

import { PeerDataContext, PeersContext, UserContext } from 'Routes/peerStore';

// import { RECEIVE_MESSAGE, socketApi } from "../../Common/socketModule";
import SideVoiceUser from "./SideVoiceUser";
import { getDataFromPeerOn } from 'Common/peerModule/receiveFromPeers';

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
  flex-grow:1;
  
  &::-webkit-scrollbar{
    width: 100%;
    background-color: black;
  }
`;

const Chat = styled.div`

    display:flex;
    flex-direction: column;
    ${props => console.log(props.height, props.width)}
    /* height:${props => props.height !== undefined ? props.height : 600}px;
    width:${props => props.width !== undefined ? props.width : 600}px; */
    ${props => (props.width !== undefined && { width: `${props.width}px` })}
    ${props => (props.width !== undefined && { height: `${props.height}px` })}

    border-radius: 10%;
`;

const TextFieldWithVoiceUsers = styled.div`
      background-color: white;
      width: inherit;
      display: flex;
      flex-direction: row;
`;

const StyledAudio = styled.audio`
    height: 40%;
    width: 50%;
    display:none;
`;




function Index({ chatList, setChatList, backgroundColor, height, width, socketRef, peersRef, ...props }) {
    const myNickname = localStorage.getItem('nickname');

    const { peerData, setPeerData, clearPeerData } = useContext(PeerDataContext);
    const { peers, setPeers } = useContext(PeersContext);

    // const [chatList, setChatList] = useState([]);
    let chatListRef = useRef([...chatList]);

    // scroll ref;
    const scrollRef = useRef(null);

    const scrollToBottom = () => {
        const { scrollHeight, clientHeight } = scrollRef.current;
        scrollRef.current.scrollTop = scrollHeight - clientHeight;
    };


    useEffect(() => {
        scrollToBottom();
    }, [chatList]);

    useEffect(() => {
        if (peerData.type === PEER_CHAT) {
            console.log("peerData asdfdsafadsafsdsdafsdfa : ", peerData)
            chatAddMessage({ nickname: peerData.nickname, inputMessage: peerData.data, chatList, setChatList })
            clearPeerData();
        }
    }, [peerData])


    return (
        <Chat width={width} height={height}>
            <Nav />
            <TextFieldWithVoiceUsers>
                <TextField className="textField" ref={scrollRef}>
                    {chatList.map((i, index) => <Message key={"chat" + index}
                        who={i.nickname === myNickname ? "me" : "another"}
                        chatObject={i} chatList={chatList} />)}
                </TextField>
                <SideVoiceUser peers={peers} chatList={chatList} setChatList={setChatList} />
            </TextFieldWithVoiceUsers>
            <MyTextInput peers={peers} myNickname={myNickname} chatList={chatList} setChatList={setChatList}
            />
        </Chat >
    );
}

export default memo(Index);
