import React, { useReducer, useEffect, createContext, useMemo, memo, useContext, useState } from 'react';
import styled from 'styled-components';
import { PeerDataContext, PeersContext, UserContext } from 'Routes/peerStore';
import { GAME, YUT } from 'Constants/peerDataTypes.js';
import { YUT_INITIAL_STATE, DEFAULT_TIME_VALUE } from './Constants/yutGame';
import { reducer } from './Reducer/yutStoreReducer';

import reducerAction from 'Container/GameContainer/Yut/Reducer/yutStoreReducerAction'
import { sendDataToPeers } from 'Common/peerModule/sendToPeers';

import {
    DESELECT_HORSE,
    UPDATE_TIMER,
    STOP_TIMER,
    THROW_YUT,
    UPDATE_STATE,
    GET_DATA_FROM_PEER,
    START_GAME,
    UPDATE_GOAL,
    SELECT_HORSE,
    MOVE_FIRST_HORSE,
    MOVE_HORSE,
    NEXT_TURN,
    PLAY_AI,
    INIT_LAST_YUT_DATA,
} from './Constants/yutActionType.js';
import actionHandler from './Backup/actionHandler.js';

export const YutContext = createContext(null);
export const YutViewContext = createContext(null);
export const TimerContext = createContext(null);

const YutStore = ({ children }) => {
    // dispatch는 실행중 변경하지 않기에 useMemo를 통해 제함.
    const nickname = localStorage.getItem('nickname');
    const [state, dispatch] = useReducer(reducer, YUT_INITIAL_STATE);
    const { peers } = useContext(PeersContext);
    const { peerData } = useContext(PeerDataContext);
    const { playerData, placeToMove, myThrowCount, selectHorse, winner, yutData, halted, nowTurn, playerHorsePosition } = state;

    const [time, setTime] = useState(DEFAULT_TIME_VALUE);
    const [yutView, setYutView] = useState([0, 0, 0, 0])

    const [fieldView, setFieldView] = useState([]);


    useEffect(() => {
        console.log("nowTurn", typeof (nowTurn))
        const getDataError = () => {
            console.error("getDataError");
            alert("네트워크 오류");
        }
        if (peerData.type === GAME && peerData.game === YUT) {
            // const { playerData,
            //     nowTurn,
            //     playerHorsePosition,
            //     yutData,
            //     placeToMove,
            //     selectHorse,
            //     myThrowCount,
            //     winner, } = peerData.data;

            const { state, yutView, reducerActionType } = peerData.data;

            if (Array.isArray(state.playerData) &&
                typeof (state.nowTurn) === "object" &&
                Array.isArray(state.playerHorsePosition) && state.playerHorsePosition.length <= 4 && state.playerHorsePosition.length >= 0 &&
                Array.isArray(state.yutData) &&
                typeof (state.placeToMove) === "object" && Object.keys(state.placeToMove).length <= 4 && Object.keys(state.placeToMove).length >= 0 &&
                typeof (state.selectHorse) === "number" && state.selectHorse >= -1 && state.selectHorse <= 30 &&
                typeof (state.myThrowCount) === "number" && state.myThrowCount > -1 &&
                Array.isArray(state.winner) &&
                typeof (reducerActionType) === "string") {
                dispatch({ type: GET_DATA_FROM_PEER, state })
                setTime(DEFAULT_TIME_VALUE);
                if (reducerActionType === THROW_YUT && yutView !== undefined) {
                    setYutView([...yutView]);
                }

            }
            else {
                console.log(state)
                console.log(
                    Array.isArray(state.playerData),
                    typeof (state.nowTurn) === "object",
                    Array.isArray(state.playerHorsePosition), state.playerHorsePosition.length <= 4, state.playerHorsePosition.length >= 0,
                    Array.isArray(state.yutData),
                    typeof (state.placeToMove) === "object", Object.keys(state.placeToMove).length <= 4, Object.keys(state.placeToMove).length >= 0,
                    typeof (state.selectHorse) === "number", state.selectHorse >= -1, state.selectHorse <= 30,
                    typeof (state.myThrowCount) === "number", state.myThrowCount > -1,
                    Array.isArray(state.winner), // === "number"
                    typeof (peerData.reducerActionType)
                )
                getDataError();
            }

        }
    }, [peerData]);

    // 순서 넘기기
    // useEffect(() => {
    //     if (yutData.length === 0 && myThrowCount === 0) {
    //         dispatch({ type: NEXT_TURN })
    //     }    
    // }, [yutData, myThrowCount])

    useEffect(() => {
        // 말 위치 데이터가 변경이 되었다면 골인지점 에 있는 상태인지 확인,
        // 골인지점에 있다면 점수 올리고 말 삭제
        // if (state.horsePosition.hasOwnProperty(30)) {
        //     dispatch({ type: UPDATE_GOAL })
        // }
        if (state.playerHorsePosition.some((i) => i.hasOwnProperty(30))) {
            if (typeof (dispatch) === "function"
                && typeof (state) === "object"
                && typeof (peers) === "object"
                && typeof (nickname) === "string") {
                const newState = reducerAction.UPDATE_GOAL(state);
                dispatch({ type: UPDATE_GOAL, state: newState });
                sendDataToPeers(GAME, { nickname, peers, game: YUT, data: { state: newState, reducerActionType: UPDATE_GOAL } });
            }
            else {
                console.error("updateGoalHandler");
            }
        }
    }, [playerHorsePosition]);

    const value = useMemo(() => ({
        playerData,
        yutData,
        placeToMove,
        selectHorse,
        halted,
        playerHorsePosition,
        nowTurn,
        myThrowCount,
        winner,
        dispatch
    }),
        [playerData,
            yutData,
            placeToMove,
            selectHorse,
            halted,
            playerHorsePosition,
            nowTurn,
            myThrowCount,
            winner]
    );

    const timeValue = useMemo(() => ({
        time, setTime, setTimeHandler: () => {
            setTime(prev => prev - 1);
        }
    }), [time])

    const yutViewValue = useMemo(() => ({
        yutView, setYutView
    }), [yutView])

    useEffect(() => {
        console.log("state 출력 시작------------")
        console.log(state)
        console.log("state 출력 끝------------")

    }, [state])

    return (
        <div style={{
            userSelect: 'none', overflow: 'hidden'
        }}>
            <YutContext.Provider value={value}>
                <YutViewContext.Provider value={yutViewValue}>
                    <TimerContext.Provider value={timeValue}>
                        {children}
                    </TimerContext.Provider>
                </YutViewContext.Provider>
            </YutContext.Provider >
        </div >
    );
}

export default memo(YutStore);