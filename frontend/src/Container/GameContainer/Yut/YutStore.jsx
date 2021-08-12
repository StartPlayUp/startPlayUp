import React, { useReducer, useEffect, createContext, useMemo, memo, useContext, useState } from 'react';
import styled from 'styled-components';
import { PeerDataContext, PeersContext, UserContext } from 'Routes/peerStore';
import { GAME, YUT } from 'Constants/peerDataTypes.js';
import { YUT_INITIAL_STATE, DEFAULT_TIME_VALUE, NUMBER_TO_MATCH_KOREA_YUT_TYPE } from './Constants/yutGame';
import { reducer } from './Reducer/yutStoreReducer';

import reducerAction, { sumYutArrayToMatchTypeIndex } from 'Container/GameContainer/Yut/Reducer/yutStoreReducerAction'
import { sendDataToPeers } from 'Common/peerModule/sendToPeers';
import { checkGetDataFromPeers, isArray, isFunction, isObject, isString, getDataFromPeersError } from './YutFunctionModule';

import {
    THROW_YUT,
    GET_DATA_FROM_PEER,
    UPDATE_GOAL,
    START_GAME,
} from './Constants/yutActionType.js';
import { TextModal } from './YutTextViewModal';

export const YutContext = createContext(null);
export const YutViewContext = createContext(null);
export const TimerContext = createContext(null);
// export const TextModal = createContext(null);

const YutStore = ({ children }) => {
    // dispatch는 실행중 변경하지 않기에 useMemo를 통해 제함.
    const nickname = localStorage.getItem('nickname');
    const [state, dispatch] = useReducer(reducer, YUT_INITIAL_STATE);
    const { peers } = useContext(PeersContext);
    const { peerData } = useContext(PeerDataContext);
    const { playerData, placeToMove, myThrowCount, selectHorse, winner, yutData, halted, nowTurn, playerHorsePosition } = state;

    const [time, setTime] = useState(DEFAULT_TIME_VALUE);
    const [yutView, setYutView] = useState([0, 0, 0, 0]);
    // const [textModal, setTextModal] = useState("");
    const { setTextModalHandler } = useContext(TextModal);

    // const [fieldView, setFieldView] = useState([]);


    useEffect(() => {
        console.log("nowTurn", typeof (nowTurn))
        if (peerData.type === GAME && peerData.game === YUT) {
            const { state, yutView, reducerActionType } = peerData.data;
            if (checkGetDataFromPeers(state)
                && isString(reducerActionType)) {
                dispatch({ type: GET_DATA_FROM_PEER, state })
                setTime(DEFAULT_TIME_VALUE);
                if (reducerActionType === THROW_YUT && yutView !== undefined) {
                    setYutView([...yutView]);
                    const yutTypeIndex = sumYutArrayToMatchTypeIndex(yutView);
                    // setTextModal(NUMBER_TO_MATCH_KOREA_YUT_TYPE[yutTypeIndex])
                    setTextModalHandler(NUMBER_TO_MATCH_KOREA_YUT_TYPE[yutTypeIndex])
                }
                else if (reducerActionType === START_GAME) {
                    setTextModalHandler("게임시작");
                }
            }
            else {
                console.log(checkGetDataFromPeers(state))
                getDataFromPeersError();
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
            if (isFunction(dispatch)
                && isObject(state)
                && isObject(peers)
                && isString(nickname)) {
                const newState = reducerAction.UPDATE_GOAL(state);
                dispatch({ type: UPDATE_GOAL, state: newState });
                sendDataToPeers(GAME, { nickname, peers, game: YUT, data: { state: newState, reducerActionType: UPDATE_GOAL } });
            }
            else {
                console.error("updateGoalHandler");
            }
        }
    }, [playerHorsePosition]);


    // useEffect(() => {
    //     if (playerData.length > 0) {
    //         const yutTypeIndex = sumYutArrayToMatchTypeIndex(yutView);
    //         setTextModal(NUMBER_TO_MATCH_KOREA_YUT_TYPE[yutTypeIndex])
    //     }
    // }, [yutView])

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
        time, setTime, decreaseTimeOneSecond: () => {
            setTime(prev => prev - 1);
        }
    }), [time]);

    const yutViewValue = useMemo(() => ({
        yutView, setYutView
    }), [yutView]);

    // const textModalValue = useMemo(() => (
    //     { textModal, setTextModal }
    // ), [textModal]);

    return (
        <div style={{
            userSelect: 'none', overflow: 'hidden'
        }}>
            <YutContext.Provider value={value}>
                <YutViewContext.Provider value={yutViewValue}>
                    <TimerContext.Provider value={timeValue}>
                        {/* <TextModal.Provider value={textModalValue}> */}
                        {children}
                        {/* </TextModal.Provider> */}
                    </TimerContext.Provider>
                </YutViewContext.Provider>
            </YutContext.Provider >
        </div >
    );
}

export default memo(YutStore);