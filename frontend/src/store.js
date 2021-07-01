import React, { createContext, useMemo, useReducer, useState, useRef, useEffect, memo, Children } from "react";
import { LOGIN, GET_CHATLIST, SET_CHATLIST } from './Constants/actionTypes';
import { PEER_CHAT } from "Constants/peerDataTypes"
import { testDB } from "./Common/TestDB";
import styled from 'styled-components'


const initialState = {
    user: "",
    isAuthenticated: false,
};
const reducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
            const res = testDB.filter((i) => i.id === action.id && i.password === action.password);
            console.log("[DEBUG] : STORE LOGIN");
            if (res.length > 0) {
                action.history.push("/main");
                localStorage.setItem('nickname', res[0].nickname);
                return {
                    ...state,
                    user: res[0].nickname,
                    isAuthenticated: true
                }
            } else {
                return {
                    ...state,
                    // user: "Guest"
                };
            }
        default:
            return state;
    }
};
export const UserContext = createContext();
export const PeerDataContext = createContext();
export const PeersContext = createContext();
export const VoicePeersContext = createContext();


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


export const Store = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { user, isAuthenticated } = state;
    const valueUserContext = useMemo(() => ({
        user: user,
        isAuthenticated: isAuthenticated,
        dispatch: dispatch
    }), [user, isAuthenticated]);

    const [peerData, setPeerData] = useState({ type: "" }); //피어 데이터 받는곳
    const valuePeerData = useMemo(() => ({
        peerData,
        setPeerData
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

    return (
        <>
            {
                voicePeers.map(({ peer }, index) => {
                    return (
                        <Audio key={index} peer={peer} peers={voicePeers} />
                    );
                })
            }
            <UserContext.Provider value={valueUserContext}>
                <PeerDataContext.Provider value={valuePeerData}>
                    <PeersContext.Provider value={valuePeers}>
                        <VoicePeersContext.Provider value={valueVoicePeers}>
                            {children}
                        </VoicePeersContext.Provider>
                    </PeersContext.Provider>
                </PeerDataContext.Provider>
            </UserContext.Provider >
        </>
    );
}