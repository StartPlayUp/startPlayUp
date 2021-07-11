import React, { createContext, useMemo, useReducer, useState, useRef, useEffect, memo, Children } from "react";
import { LOGIN, GET_CHATLIST, SET_CHATLIST } from './Constants/actionTypes';
import { PEER_CHAT } from "Constants/peerDataTypes"
import { testDB } from "./Common/TestDB";
import styled from 'styled-components'
import { PeerDataContext, PeersContext } from 'Routes/peerStore';


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


export const LoginStore = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { user, isAuthenticated } = state;
    const valueUserContext = useMemo(() => ({
        user: user,
        isAuthenticated: isAuthenticated,
        dispatch: dispatch
    }), [user, isAuthenticated]);

    // dispatch는 실행중 변경하지 않기에 useMemo를 통해 제함.

    return (
        <UserContext.Provider value={valueUserContext}>
            {children}
        </UserContext.Provider >
    );
}