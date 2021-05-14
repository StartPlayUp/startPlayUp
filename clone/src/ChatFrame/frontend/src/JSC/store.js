import React, { createContext, useMemo, useReducer, useState, useRef, useEffect, memo, Children } from "react";
import { LOGIN, GET_CHATLIST, SET_CHATLIST } from './Constants/actionTypes';
import { testDB } from "./Common/TestDB";
import styled from 'styled-components'


const InitialState = {
    user: "",
    isAuthenticated: false,
};
const reducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
            const res = testDB.filter((i) => i.id === action.id && i.password === action.password);
            console.log("[DEBUG] : STORE LOGIN");
            if (res.length > 0) {
                action.history.push("/chat");
                return {
                    ...state,
                    user: res[0].nickname,
                    isAuthenticated: true
                }
            } else {
                return {
                    ...state,
                    user: "Guest"
                };
            }
        default:
            return state;
    }
};
export const UserContext = createContext({
    user: "",
    isAuthenticated: false,
    dispatch: () => { }
});

export const PeerDataContext = createContext({
    peerData: "",
    setPeerData: ""
});

export const PeersContext = createContext([]);
export const VoicePeersContext = createContext([]);

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
    const [state, dispatch] = useReducer(reducer,InitialState);
    const { user, isAuthenticated } = state;
    const [peerData, setPeerData] = useState();
    const [peers, setPeers] = useState([]);
    const [voicePeers, setVoicePeers] = useState([]);
    const value = useMemo(() => ({
        user: user,
        isAuthenticated: isAuthenticated,
        dispatch: dispatch
    }), [user, isAuthenticated]);
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
            <UserContext.Provider value={value}>
                <PeerDataContext.Provider value={{ peerData, setPeerData }}>
                    <PeersContext.Provider value={{ peers, setPeers }}>
                        <VoicePeersContext.Provider value={{ voicePeers, setVoicePeers }}>
                            {children}
                        </VoicePeersContext.Provider>
                    </PeersContext.Provider>
                </PeerDataContext.Provider>
            </UserContext.Provider >
        </>
    );
}