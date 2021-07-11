import React, { useReducer, useEffect, createContext, useMemo, memo, useContext } from 'react';
import styled from 'styled-components';
import { PeerDataContext, PeersContext, UserContext } from 'Routes/peerStore';
import { checkPlace, checkSelectState, checkEmptySelectHorse, checkHavePlaceToMove, YUT_RESULT_TYPE } from './YutFunctionModule.js'
import { sendDataToPeers } from 'Common/peerModule/sendToPeers/index.js';
import { GAME, YUT } from 'Constants/peerDataTypes.js';
import { DESELECT_HORSE, UPDATE_TIMER, STOP_TIMER, UPDATE_STATE, GET_DATA_FROM_PEER } from './yutReducerType.js';
import reducerActionHandler from './reducerActionHandler.js';


export const boardContext = createContext(null);
export const stateContext = createContext(null);

export const initialState = {
    playerData: [
        //      (예시)
        //     { nickname: '장석찬', color: 'red', horses: 4, goal: 0 },
        //     { nickname: '정진', color: 'orange', horses: 4, goal: 0 },
        //     { nickname: '이종찬', color: 'blue', horses: 4, goal: 0 },
        //     { nickname: '조석영', color: 'green', horses: 4, goal: 0 },
    ], // 몇번 칸에 누구 말이 몇개 있는지 알 수 있음.
    nowTurnIndex: 0,
    nowTurnNickname: '',
    // horsePosition: { 2: { player: 0, horses: 2 } },
    horsePosition: {},
    playerHorsePosition: [], // 4명일 때 [{2:2},{},{},{}]
    halted: true, // 내 순서 일때 false 그 외에는 true (정지)
    yutData: [], // 윷을 던졌을때 윷 또는 모가 나오거나, 상대 말을 잡을 때 추가
    selectHorse: undefined, // 현재 선택한 말.
    placeToMove: {},
    timer: 0, // 1초에 +1 씩 더해준다.
    myThrowCount: 1, // 윷을 던질 수 있는 횟수를 나타냄. // halted 와 useEffect 사용해서 대체할 수 있는지 테스트 // 
    winner: [], // 이긴사람을 순서대로 추가함.
};
const init = ({ initialState, peers }) => {
    console.log("in init : ", peers)
    return { ...initialState, peers }
}

const reducer = (state, { type, ...action }) => {
    const nickname = localStorage.getItem('nickname');
    switch (type) {
        case GET_DATA_FROM_PEER: {
            const halted = !(nickname === action.data.nowTurnNickname)
            return { ...state, ...action.data, halted };
        };
        case UPDATE_TIMER:
            return { ...state, timer: state.timer + 1 };
        case STOP_TIMER:
            return { ...state, halted: true };
        case DESELECT_HORSE: {
            return { ...state, selectHorse: undefined, placeToMove: {} };
        }
        case UPDATE_STATE:
            return { ...state, ...action.state }
        default:
            return state;
    }
}

const YutStore = ({ children }) => {
    // dispatch는 실행중 변경하지 않기에 useMemo를 통해 제함.
    // const [state, dispatch] = useReducer(reducer, initialState);
    const { peers } = useContext(PeersContext);
    const [state, dispatch] = useReducer(reducer, { initialState, peers }, init);
    const { peerData } = useContext(PeerDataContext);
    const { playerData, placeToMove, myThrowCount, selectHorse, winner, yutData, halted, timer, nowTurnIndex, nowTurnNickname, horsePosition } = state;

    const stateValue = useMemo(() => {
        console.log("state rerender");
        return {
            playerData,
            nowTurnIndex,
            nowTurnNickname,
            horsePosition,
            halted,
            yutData,
            selectHorse,
            placeToMove,
            myThrowCount,
            winner,
        }
    }
        , [playerData,
            nowTurnIndex,
            nowTurnNickname,
            horsePosition,
            halted,
            yutData,
            selectHorse,
            placeToMove,
            myThrowCount,
            winner,]
    )

    // // 타이머 돌리기
    useEffect(() => {
        let timer;
        if (halted === false) {
            timer = setInterval(() => {
                dispatch({ type: UPDATE_TIMER })
            }, 1000);
        }
        return () => {
            clearInterval(timer);
        }
    }, [halted])

    // 타이머가 30 초가 넘었을 때 순서 넘기기
    useEffect(() => {
        if (timer > 100) {
            // 시간 멈춰놓고
            dispatch({ type: STOP_TIMER });
            // 컴퓨터 행동 하고
            // dispatch({ type: PLAY_COMPUTER, dispatch });
            // 턴 넘겨주고
            // dispatch({ type: NEXT_TURN });
            // yutDataSendToPeers(state);
            reducerActionHandler.nextTurnHandler({ dispatch, state, peers })
        }
    }, [timer])

    useEffect(() => {
        if (peerData.type === GAME && peerData.game === YUT) {
            const data = peerData.data;
            dispatch({ type: GET_DATA_FROM_PEER, data })
        }
    }, [peerData])



    // 순서 넘기기
    // useEffect(() => {
    //     if (yutData.length === 0 && myThrowCount === 0) {
    //         dispatch({ type: NEXT_TURN })
    //     }    
    // }, [yutData, myThrowCount])



    useEffect(() => {
        // 말 위치 데이터가 변경이 되었다면 골인지점 에 있는 상태인지 확인,
        // 골인지점에 있다면 점수 올리고 말 삭제
        if (state.horsePosition.hasOwnProperty(30)) {
            dispatch({ type: UPDATE_GOAL })
        }
    }, [horsePosition]);

    const value = useMemo(() => ({ playerData, yutData, placeToMove, selectHorse, halted, horsePosition, myThrowCount, dispatch }), [selectHorse, myThrowCount, placeToMove, horsePosition, playerData, yutData, nowTurnIndex, halted]);
    // playerData 플레이어 데이터
    // yutData yut을 던져 나온 결과 리스트
    // placeToMove 움직일 수 있는 위치
    // selectHorse 현재 선택한 말
    // halted 

    return (
        <div>
            <div>{timer}</div>
            <div>nowTurnIndex : {nowTurnIndex}</div>
            <div>nowTurnNickname : {nowTurnNickname}</div>
            {winner.map((i, index) => <div key={index}>1등 : {i}</div>)}
            <boardContext.Provider value={value}>
                <stateContext.Provider value={stateValue}>
                    {children}
                </stateContext.Provider>
            </boardContext.Provider >
        </div >
    );
}

export default memo(YutStore);