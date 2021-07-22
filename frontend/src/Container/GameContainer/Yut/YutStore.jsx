import React, { useReducer, useEffect, createContext, useMemo, memo, useContext, useState } from 'react';
import styled from 'styled-components';
import { PeerDataContext, PeersContext, UserContext } from 'Routes/peerStore';
import { GAME, YUT } from 'Constants/peerDataTypes.js';
import { initialState } from './Constants/yutGame';

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
} from './Constants/actionType.js';
import actionHandler from './Action/actionHandler.js';


export const YutContext = createContext(null);
export const TimerContext = createContext(null);



const reducer = (state, { type, ...action }) => {
    const nickname = localStorage.getItem('nickname');
    switch (type) {
        case GET_DATA_FROM_PEER: {
            let halted = true;
            if (action.state.nowTurn.nickname === nickname) {
                halted = false;
            }
            return { ...state, ...action.state, halted };
        };
        case START_GAME:
        case THROW_YUT:
        case UPDATE_GOAL:
        case SELECT_HORSE:
        case MOVE_FIRST_HORSE:
        case MOVE_HORSE:
        case NEXT_TURN:
        case PLAY_AI: {
            return { ...action.state };
        }
        case UPDATE_TIMER:
            return { ...state, timer: state.timer + 1 };
        case STOP_TIMER:
            return { ...state, halted: true };
        case DESELECT_HORSE: {
            return { ...state, selectHorse: -1, placeToMove: {} };
        }
        // case UPDATE_STATE:
        //     return { ...state, ...action.state }
        default:
            return state;
    }
}

const YutStore = ({ children }) => {
    // dispatch는 실행중 변경하지 않기에 useMemo를 통해 제함.
    const [state, dispatch] = useReducer(reducer, initialState);
    const { peers } = useContext(PeersContext);
    const { peerData } = useContext(PeerDataContext);
    const { playerData, placeToMove, myThrowCount, selectHorse, winner, yutData, halted, nowTurn, playerHorsePosition, timer } = state;


    // const [halted, setHalted] = useState(true);
    // // 보내야 하는 데이터 

    // // 타이머 돌리기
    useEffect(() => {
        let t;
        if (halted === false) {
            t = setInterval(() => {
                dispatch({ type: UPDATE_TIMER })
            }, 1000);
        }
        return () => {
            clearInterval(t);
        }
    }, [halted])

    // 타이머가 30 초가 넘었을 때 순서 넘기기
    useEffect(() => {
        if (timer > 30) {
            const nickname = localStorage.getItem('nickname');
            actionHandler.nextTurnHandler({ dispatch, state, peers, nickname })
        }
    }, [timer])

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

            const state = peerData.data;

            if (Array.isArray(state.playerData) &&
                typeof (state.nowTurn) === "object" &&
                Array.isArray(state.playerHorsePosition) && state.playerHorsePosition.length <= 4 && state.playerHorsePosition.length >= 0 &&
                Array.isArray(state.yutData) &&
                typeof (state.placeToMove) === "object" && Object.keys(state.placeToMove).length <= 4 && Object.keys(state.placeToMove).length >= 0 &&
                typeof (state.selectHorse) === "number" && state.selectHorse >= -1 && state.selectHorse <= 30 &&
                typeof (state.myThrowCount) === "number" && state.myThrowCount > -1 &&
                Array.isArray(state.winner)) {
                dispatch({ type: GET_DATA_FROM_PEER, state: { ...state, timer: 0 } })
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
                    Array.isArray(state.winner) // === "number"
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
            actionHandler.updateGoalHandler({ dispatch, state, peers, nickname });
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
        timer,
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
            winner,
            timer,]
    );
    useEffect(() => {
        console.log("state 출력 시작------------")
        console.log(state)
        console.log("state 출력 끝------------")

    }, [state])

    return (
        <div>
            <div>{state.timer}</div>
            <div>nowTurn Index : {nowTurn.index}</div>
            <div>nowTurn Nickname : {nowTurn.nickname}</div>
            {winner.map((i, index) => <div key={index}>{index}등 : {i}</div>)}
            <YutContext.Provider value={value}>
                {/* <TimerContext.Provider value={timerContextValue}> */}
                {children}
                {/* </TimerContext.Provider> */}
            </YutContext.Provider >
        </div >
    );
}

export default memo(YutStore);