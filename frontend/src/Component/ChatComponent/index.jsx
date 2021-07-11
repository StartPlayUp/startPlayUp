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




function Index({ backgroundColor, height, width, socketRef, peersRef, ...props }) {
    // socket io.connect

    // const socketRef = useRef();
    // const myNickname = localStorage.getItem('nickname');
    // const { peerData, setPeerData } = useContext(PeerDataContext);
    // const { peers, setPeers } = useContext(PeersContext);
    // const { voicePeers, setVoicePeers } = useContext(VoicePeersContext);

    // let peersRef = useRef([]);
    // let voicePeersRef = useRef([]);
    // const roomID = "9a06eb80-9fd4-11eb-a3e2-377a237cffe7";

    // const peersDestory = (peers, voicePeers) => {
    //     peers.forEach((peer) => {
    //         console.log("return useEffect peer destroy")
    //         // peer.peer.destroy()
    //         peer.peer.on('close', () => console.log("delete"));
    //     });
    //     setPeerData([]);

    //     voicePeers.forEach((voicePeer) => {
    //         voicePeer.peer.destroy()
    //     });
    //     setVoicePeers([]);
    // }
    // useEffect(() => {
    //     socketRef.current = io.connect("/");
    //     if (Peer.WEBRTC_SUPPORT) {
    //         connectDataPeer({ socketRef, roomID, peersRef, setPeers, myNickname, setPeerData });//데이터 피어 생성
    //         connectVoicePeer({ socketRef, voicePeersRef, roomID: roomID + "-Voice", setVoicePeers, myNickname });//보이스 피어 생성
    //     } else {
    //         console.log("webrtc not support!")
    //     }

    //     // 방법 1 테스트 해보기.
    //     // return () => peersRef.current.forEach(i => {
    //     //     console.log("destroy peer", i);
    //     //     i.peer.removeAllListeners();
    //     //     i.peer.destroy();
    //     // })

    //     // 방법 2 테스트 해보기.
    //     // return () => {
    //     //     setPeers({});
    //     // }
    //     return () => {
    //         peersDestory(peers, voicePeers)
    //     };
    // }, []);

    const myNickname = localStorage.getItem('nickname');

    const { peerData, setPeerData } = useContext(PeerDataContext);
    const { peers, setPeers } = useContext(PeersContext);


    const [chatList, setChatList] = useState([]);
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
            console.log("peerData : ", peerData)
            chatAddMessage({ nickname: peerData.nickname, inputMessage: peerData.data, chatList, setChatList })
        }
    }, [peerData])


    return (
        <Chat width={height} height={width}>
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
