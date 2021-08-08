import React, { useReducer, useEffect, createContext, useMemo, memo, useContext, useState } from 'react';
import styled from 'styled-components';
import { PeersContext } from 'Routes/peerStore';
import { TimerContext } from './YutStore';
import { YutContext } from './YutStore';

import { GAME, YUT } from 'Constants/peerDataTypes';
import { NEXT_TURN } from 'Container/GameContainer/Yut/Constants/yutActionType';
import reducerAction from 'Container/GameContainer/Yut/Reducer/yutStoreReducerAction'
import { sendDataToPeers } from 'Common/peerModule/sendToPeers';

const Timer = ({ children }) => {
    const { peers } = useContext(PeersContext);
    const { dispatch, ...state } = useContext(YutContext);
    const { time, decreaseTimeOneSecond } = useContext(TimerContext);
    const nickname = localStorage.getItem('nickname');

    // // 타이머 돌리기
    useEffect(() => {
        let t;
        if (state.halted === false) {
            t = setInterval(() => {
                decreaseTimeOneSecond();
            }, 1000);
        }
        return () => {
            clearInterval(t);
        }
    }, [state.halted])

    // 타이머가 30 초가 넘었을 때 순서 넘기기
    useEffect(() => {
        if (time <= 0) {
            const nextTurnHandler = () => {
                if (typeof (dispatch) === "function"
                    && typeof (state) === "object"
                    && typeof (peers) === "object"
                    && typeof (nickname) === "string") {
                    const [newState, success] = reducerAction.NEXT_TURN(state);
                    if (success) {
                        dispatch({ type: NEXT_TURN, state: newState });
                        sendDataToPeers(GAME, { nickname, peers, game: YUT, data: { state: newState, reducerActionType: NEXT_TURN } });
                    }
                    else {
                        alert("본인 차례가 아닙니다.");
                    }
                }
                else {
                    console.error("nextTurnHandler error");

                }
            }
            // nextTurnHandler({ dispatch, state, peers, nickname })
            nextTurnHandler();
        }
    }, [time])

    const playAiHandler = () => {
        console.log(dispatch, state, peers)
        if (typeof (dispatch) === "function"
            && typeof (state) === "object"
            && typeof (peers) === "object"
            && typeof (nickname) === "string") {
            const newState = reducerAction.PLAY_AI(state);
            dispatch({ type: PLAY_AI, state: newState });
            sendDataToPeers(GAME, { nickname, peers, game: YUT, data: { state: newState, reducerActionType: PLAY_AI } });
        }
        else {
            console.error("playAiHandler");
        }
    }


    return (
        <>
        </>
    );
}

export default memo(Timer);