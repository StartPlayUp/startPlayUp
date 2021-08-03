import React, { useReducer, useEffect, createContext, useMemo, memo, useContext, useState } from 'react';
import styled from 'styled-components';
import { PeerDataContext, PeersContext, UserContext } from 'Routes/peerStore';
import { GAME, YUT } from 'Constants/peerDataTypes.js';
import { initialState } from './Constants/yutGameInitData';
import { TimerContext } from './YutStore';
import { YutContext } from './YutStore';
import actionHandler from './Action/actionHandler'

const Timer = ({ children }) => {
    const { peers } = useContext(PeersContext);
    const { dispatch, ...state } = useContext(YutContext);
    const { time, setTimeHandler } = useContext(TimerContext);
    const nickname = localStorage.getItem('nickname');

    // // 타이머 돌리기
    useEffect(() => {
        let t;
        if (state.halted === false) {
            t = setInterval(() => {
                setTimeHandler();
            }, 1000);
        }
        return () => {
            clearInterval(t);
        }
    }, [state.halted])

    // 타이머가 30 초가 넘었을 때 순서 넘기기
    useEffect(() => {
        if (time <= 0) {
            actionHandler.nextTurnHandler({ dispatch, state, peers, nickname })
        }
    }, [time])

    return (
        <>
        </>
    );
}

export default memo(Timer);