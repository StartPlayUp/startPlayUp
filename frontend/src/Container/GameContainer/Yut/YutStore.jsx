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
    MOVE_HORSE_ON_PLAYER_SECTION,
    MOVE_HORSE_ON_FIELD_SECTION,
    TEXT_START_GAME,
    TEXT_MOVE_HORSE,
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
                    setTextModalHandler(TEXT_START_GAME);
                }
                // else if (reducerActionType === MOVE_HORSE_ON_FIELD_SECTION || reducerActionType === MOVE_HORSE_ON_PLAYER_SECTION) {
                //     setTextModalHandler(TEXT_MOVE_HORSE);
                // }
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