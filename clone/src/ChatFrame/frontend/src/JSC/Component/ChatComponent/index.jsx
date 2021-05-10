import React, { memo, useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components'
import Message from './Message'
import MyTextInput from "./MyTextInput";
import Nav from "./Nav";
import { PeerDataContext, UserContext, PeersContext, VoicePeersContext } from "../../store";
import io from "socket.io-client";
import { chatAddMessage } from "../../Common/ChatModule/addMessage"
import { connectDataPeer } from "../../Common/peerModule/CreatePeer/createDataPeers"
import { connectVoicePeer } from "../../Common/peerModule/CreatePeer/createVoicePeers"

// import { RECEIVE_MESSAGE, socketApi } from "../../Common/socketModule";
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
  flex-grow:1;
  
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

const StyledAudio = styled.audio`
    height: 40%;
    width: 50%;
    display:none;
`;

const UserAudio = ({ peers, peer }) => {
    const voiceRef = useRef();
    useEffect(() => {
        peer.on("stream", stream => {
            voiceRef.current.srcObject = stream;
        })
    }, []);

    return (
        <StyledAudio playsInline autoPlay ref={voiceRef} />
    )

}


function Index({ backgroundColor, height, width, ...props }) {
    // socket io.connect
    const socketRef = useRef();


    const { user } = useContext(UserContext);
    const { peerData, setPeerData } = useContext(PeerDataContext);
    const { peers, setPeers } = useContext(PeersContext);
    const { voicePeers, setVoicePeers } = useContext(VoicePeersContext);

    // chat nickname
    const myNickName = user;
    // chat state for rerendering
    const [chatList, setChatList] = useState([]);
    let chatListRef = useRef([...chatList]);
    // scroll ref;
    const scrollRef = useRef(null);

    const voiceRef = useRef();

    let peersRef = useRef([]);
    let voicePeersRef = useRef([]);
    const roomID = "9a06eb80-9fd4-11eb-a3e2-377a237cffe7";

    const scrollToBottom = () => {
        const { scrollHeight, clientHeight } = scrollRef.current;
        scrollRef.current.scrollTop = scrollHeight - clientHeight;
    };

    useEffect(() => {
        socketRef.current = io.connect("/");
        // connectPeer({ socketRef, peersRef, roomID, peers, setPeers, chatList, chatListRef, setChatList, myNickname: user, peerData, setPeerData, voiceRef });
        // let result = true;
        // result = connectDataPeer({ socketRef, roomID, peersRef, setPeers, chatListRef, setChatList, myNickname: user, setPeerData });
        // result && connectVoicePeer({ socketRef, voicePeersRef, roomID: roomID + "-Voice", setVoicePeers, myNickname: user });
        connectDataPeer({ socketRef, roomID, peersRef, setPeers, chatListRef, setChatList, myNickname: user, setPeerData });
        connectVoicePeer({ socketRef, voicePeersRef, roomID: roomID + "-Voice", setVoicePeers, myNickname: user });
        // 방법 1 테스트 해보기.
        // return () => peersRef.current.forEach(i => {
        //     console.log("destroy peer", i);
        //     i.peer.removeAllListeners();
        //     i.peer.destroy();
        // })
        // 방법 2 테스트 해보기.
        // return () => {
        //     setPeers({});
        // }
    }, []);

    console.log("asdf", chatList)
    useEffect(() => {
        scrollToBottom();
        chatListRef.current = [...chatList];
    }, [chatList]);


    return (
        <Chat width={height} height={width}>
            <Nav />
            <TextFieldWithVoiceUsers>
                <TextField className="textField" ref={scrollRef}>
                    {chatList.map((i, index) => <Message key={"chat" + index}
                        who={i.nickname === myNickName ? "me" : "another"}
                        chatObject={i} chatList={chatList} />)}
                </TextField>
                <SideVoiceUser peersRef={peersRef} peers={peers} chatList={chatList} setChatList={setChatList} />
            </TextFieldWithVoiceUsers>
            <MyTextInput peers={peers} myNickname={myNickName} chatList={chatList} setChatList={setChatList}
                socketRef={socketRef} />

        </Chat>
    );
}

export default memo(Index);
