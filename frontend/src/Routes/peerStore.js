import React, { createContext, useMemo, useReducer, cloneElement, useState, useRef, useEffect, memo, Children } from "react";
import styled from 'styled-components'

import io from "socket.io-client";
import { connectDataPeer } from "Common/peerModule/CreatePeer/createDataPeers"
import { connectVoicePeer } from "Common/peerModule/CreatePeer/createVoicePeers"
import Peer from 'simple-peer';

export const PeerDataContext = createContext();
export const PeersContext = createContext();
export const VoicePeersContext = createContext();
export const RefContext = createContext();


const StyledAudio = styled.audio`
    display:none;
`;

const Audio = (props) => {
    const ref = useRef();
    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);
    return (
        props.peer.readable && <StyledAudio playsInline autoPlay ref={ref} />
    );
}

const initialPeerData = { type: "", game: "", nickname: "", data: {} }

export const PeerStore = ({ children }) => {
    const [peerData, setPeerData] = useState(initialPeerData); //피어 데이터 받는곳
    const valuePeerData = useMemo(() => ({
        peerData,
        setPeerData,
        clearPeerData: () => {
            setPeerData(initialPeerData);
        }
    }), [peerData]);


    const [peers, setPeers] = useState([]);//피어 생성
    const valuePeers = useMemo(() => ({
        peers,
        setPeers
    }), [peers]);

    const [voicePeers, setVoicePeers] = useState([]);//음성
    const valueVoicePeers = useMemo(() => ({
        voicePeers,
        setVoicePeers
    }), [voicePeers]);

    // dispatch는 실행중 변경하지 않기에 useMemo를 통해 제함.



    const socketRef = useRef();
    const myNickname = localStorage.getItem('nickname');
    let peersRef = useRef([]);
    let voicePeersRef = useRef([]);
    const roomID = "9a06eb80-9fd4-11eb-a3e2-377a237cffe7";

    const peersDestory = (peers, voicePeers) => {
        peers.forEach((peer) => {
            console.log("return useEffect peer destroy")
            // peer.peer.destroy()
            peer.peer.on('close', () => console.log("delete"));
        });
        setPeerData([]);

        voicePeers.forEach((voicePeer) => {
            voicePeer.peer.destroy()
        });
        setVoicePeers([]);
    }
    useEffect(() => {
        socketRef.current = io.connect("/");
        if (Peer.WEBRTC_SUPPORT) {
            connectDataPeer({ socketRef, roomID, peersRef, setPeers, myNickname, setPeerData });//데이터 피어 생성
            connectVoicePeer({ socketRef, voicePeersRef, roomID: roomID + "-Voice", setVoicePeers, myNickname });//보이스 피어 생성
        } else {
            console.log("webrtc not support!")
        }

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
        return () => {
            peersDestory(peers, voicePeers)
        };
    }, []);
    return (
        <>
            {
                voicePeers.map(({ peer }, index) => {
                    return (
                        <Audio key={index} peer={peer} peers={voicePeers} />
                    );
                })
            }
            <PeerDataContext.Provider value={valuePeerData}>
                <PeersContext.Provider value={valuePeers}>
                    <VoicePeersContext.Provider value={valueVoicePeers}>
                        {children}
                    </VoicePeersContext.Provider>
                </PeersContext.Provider>
            </PeerDataContext.Provider>
        </>
    );
}