import React, { useReducer, useEffect, createContext, useMemo, memo, useContext } from 'react';
import styled from 'styled-components';
import { PeerDataContext, PeersContext, UserContext } from 'store';
import { checkPlace, checkSelectState, checkEmptySelectHorse, checkHavePlaceToMove } from './YutFunctionModule.js'
import { sendDataToPeers } from 'Common/peerModule/sendToPeers/index.js';
import { GAME, YUT } from 'Constants/peerDataTypes.js';

export const UPDATE_TIMER = 'UPDATE_TIMER';
export const START_GAME = 'START_GAME';
export const THROW_YUT = 'THROW_YUT';
export const SELECT_HORSE = 'SELECT_HORSE';
export const MOVE_FIRST_HORSE = 'MOVE_FIRST_HORSE';
export const MOVE_HORSE = 'MOVE_HORSE';
export const UPDATE_GOAL = 'UPDATE_GOAL'
export const TIME_OUT = 'TIME_OUT';
export const NEXT_TURN = 'NEXT_TURN';
export const DESELECT_HORSE = 'DESELECT_HORSE';
export const GET_DATA_FROM_PEER = 'GET_DATA_FROM_PEER';
export const UPDATE_PEERS = 'UPDATE_PEERS';

export const boardContext = createContext(null);

export const YUT_RESULT_TYPE = {
    BACK_DO: 0,
    DO: 1,
    GAE: 2,
    GIRL: 3,
    YUT: 4,
    MO: 5,
}

const initialState = {
    playerData: [
        //      (예시)
        //     { nickname: '장석찬', color: 'red', horses: 4, goal: 0 },
        //     { nickname: '정진', color: 'orange', horses: 4, goal: 0 },
        //     { nickname: '이종찬', color: 'blue', horses: 4, goal: 0 },
        //     { nickname: '조석영', color: 'green', horses: 4, goal: 0 },
    ], // 몇번 칸에 누구 말이 몇개 있는지 알 수 있음.
    nowTurnIndex: 0,
    nowTurnNickname: '',
    // horsePosition: { 2: { player: 0, horses: 2, placeList: [] } },
    horsePosition: {},
    halted: false, // 내 순서 일때 false 그 외에는 true (정지)
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

const randomYut = () => {
    const yutMatchTable = {
        0: YUT_RESULT_TYPE.MO, // 모
        1: YUT_RESULT_TYPE.DO, // 도
        2: YUT_RESULT_TYPE.GAE, // 개
        3: YUT_RESULT_TYPE.GIRL, // 걸
        4: YUT_RESULT_TYPE.YUT  // 윷
        // 0 : 백도
    }
    const arr = [];
    for (let i = 0; i < 4; i++) {
        arr.push(Math.floor(Math.random() * 2, 1))
    }
    let result = yutMatchTable[arr.reduce((a, b) => a + b)];
    // 백도가 있으면 1 말고 0 출력
    return result === 1 && arr[0] === 1 ? YUT_RESULT_TYPE.BACK_DO : result;
}


const shuffle = (array) => {
    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    var currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

const reducer = ({ peers, ...sendState }, { type, ...action }) => {
    const state = { ...sendState, peers };
    const nickname = localStorage.getItem('nickname');
    switch (type) {
        case UPDATE_PEERS: {
            return { ...state, peers: action.peers }
        };
        case GET_DATA_FROM_PEER: {
            const halted = !(nickname === action.data.nowTurnNickname)
            return { ...state, ...action.data, halted };
        }
        case UPDATE_TIMER:
            return { ...state, timer: state.timer + 1 };
        case START_GAME: {
            const peers = action.peers;
            const colorList = ['orange', 'blue', 'green']
            const playerData = [{ nickname, color: 'red', horses: 4, goal: 0 }];
            peers.slice(0, 3).forEach((i, index) => {
                playerData.push({ nickname: i.nickname, color: colorList[index], horses: 4, goal: 0 });
            });
            shuffle(playerData);

            const nowTurnNickname = playerData[0].nickname; // playerData의 첫번째 닉네임
            const halted = !(nickname === playerData[0].nickname);
            const result = { ...initialState, nowTurnNickname, playerData, myThrowCount: 1 };

            sendDataToPeers(GAME, { game: YUT, nickname, peers, data: result });
            return { ...result, peers, halted };
        }

        case THROW_YUT: {
            // 윷 배열에 던져 나온 수를 추가해줌.
            if (state.myThrowCount <= 0) {
                return { ...state }
            }
            const result = { ...state };
            const randomYutResult = randomYut();
            let myThrowCount = state.myThrowCount;
            const yutData = [...state.yutData, randomYutResult];
            if (!(randomYutResult === YUT_RESULT_TYPE.YUT || randomYutResult === YUT_RESULT_TYPE.MO)) {
                myThrowCount = myThrowCount - 1;
            }
            // return { ...state, myThrowCount, yutData };
            // result.myThrowCount = myThrowCount;
            // result.yutData = yutData;

            sendDataToPeers(GAME, { nickname, peers, game: YUT, data: { ...sendState, myThrowCount, yutData } })
            return { ...state, myThrowCount, yutData };
        }
        case SELECT_HORSE:
            console.log("말 선택 : ", action.index)
            if (state.yutData.length === 0 ||
                (state.horsePosition.hasOwnProperty(String(action.index)) && state.nowTurnIndex !== state.horsePosition[action.index].player) ||
                state.halted
            ) {
                // 윷 던진 것이 아무것도 없으면 선택 안함.
                // 본인 차례에 상대망 말 클릭하면 선택 안함.
                // halted 가 true 이면( 즉 내 차례가 아님 멈춘 상태일 경우)
                return { ...state }
            }
            let arr = [...new Set(state.yutData)].sort().reverse();
            let placeToMove = {};
            arr.forEach((i) => {
                if (action.index === 0) {
                    placeToMove[checkPlace([], action.index, i)] = i
                }
                else {
                    // placeToMove[checkPlace(state.horsePosition[action.index].placeList, action.index, i)] = i;
                    checkPlace(state.horsePosition[action.index].placeList, action.index, i).forEach((p) => {
                        placeToMove[p] = i;
                    })
                }
            });
            console.log("말이 갈 수 있는 위치 : ", placeToMove);

            //sendDataToPeers(GAME, { nickname, peers, game: YUT, data: { ...state, selectHorse: action.index, placeToMove } });

            return { ...state, selectHorse: action.index, placeToMove };

        case MOVE_FIRST_HORSE: {
            // 선택한 말이 없는 상태에서 눌렸거나 해당 값이 없으면 말을 이동하지 않음.
            if (checkEmptySelectHorse(state.selectHorse) ||
                checkHavePlaceToMove(state.placeToMove, action.index)) {
                return { ...state };
            }

            // 사용할 윷 데이터가 들어오면 해당 윷 데이터를 삭제
            const yutData = [...state.yutData];
            yutData.splice(yutData.indexOf(state.placeToMove[action.index]), 1);
            // 말 이동 관련 코드
            // 만약에 selectHorse 가 0 이라면 (윷 판에 말이 없는 경우)
            const horsePosition = { ...state.horsePosition };
            // let nowTurn = horsePosition[action.index]['player']
            const nowTurnIndex = state.nowTurnIndex;
            const playerData = [...state.playerData]
            let myThrowCount = state.myThrowCount;

            // 내가 가지고 있는 horses -1 해주기.
            playerData[nowTurnIndex] = { ...playerData[nowTurnIndex], horses: playerData[nowTurnIndex].horses - 1 }
            if (state.horsePosition.hasOwnProperty(String(action.index))) {
                if (nowTurnIndex === state.horsePosition[action.index].player)
                    // 내 말이 있을 때
                    horsePosition[action.index] = {
                        ...state.horsePosition[action.index],
                        'horses': state.horsePosition[action.index].horses + 1
                    };
                else {
                    // 상대 말이 있을 때
                    let deadHorseOwner = horsePosition[action.index].player;
                    playerData[deadHorseOwner] = { ...playerData[deadHorseOwner], horses: playerData[deadHorseOwner].horses + horsePosition[action.index].horses }

                    myThrowCount += 1;

                    horsePosition[action.index] = { player: nowTurnIndex, horses: 1, placeList: [0] }
                }
            }
            else {
                // 아무것도 없었을 때
                horsePosition[action.index] = { player: nowTurnIndex, horses: 1, placeList: [0] }
            }

            // 만약에 먹으면 먹힌 사람 말 갯수 올려주고 
            // 내거라면 위치에 + 1 해주고

            sendDataToPeers(GAME, { nickname, peers, game: YUT, data: { ...sendState, yutData, playerData, myThrowCount, horsePosition, selectHorse: undefined, placeToMove: {} } });

            return { ...state, yutData, playerData, myThrowCount, horsePosition, selectHorse: undefined, placeToMove: {} };
        }

        case MOVE_HORSE: {
            // 선택한 말이 없는 상태에서 눌렸거나 해당 값이 없으면 말을 이동하지 않음.
            // if (checkSelectState(state.selectHorse, state.placeToMove, action.index)) return { ...state };

            if (checkEmptySelectHorse(state.selectHorse) ||
                checkHavePlaceToMove(state.placeToMove, action.index)) {
                return { ...state };
            }

            // 사용할 윷 데이터가 들어오면 해당 윷 데이터를 삭제
            const yutData = [...state.yutData];
            yutData.splice(yutData.indexOf(state.placeToMove[action.index]), 1);


            // 말 이동 관련 코드
            const horsePosition = { ...state.horsePosition };
            const nowTurnIndex = state.nowTurnIndex;
            let myThrowCount = state.myThrowCount;
            const playerData = [...state.playerData]

            const placeList = [...state.horsePosition[state.selectHorse].placeList];
            if (state.placeToMove[action.index] !== YUT_RESULT_TYPE.BACK_DO) {
                // 백도일 때 추가 하지 않음.
                placeList.push(state.selectHorse);
                console.log('placeList 추가');
            }
            const selectHorseData = state.horsePosition[state.selectHorse];
            if (state.horsePosition.hasOwnProperty(String(action.index))) {
                const actionIndexHorseData = state.horsePosition[action.index];
                if (selectHorseData.player === actionIndexHorseData.player)
                    // 내 말이 있을 때
                    horsePosition[action.index] = {
                        ...actionIndexHorseData,
                        'horses': actionIndexHorseData.horses + selectHorseData.horses
                    };
                else {
                    // 상대 말이 있을 때
                    let deadHorseOwner = actionIndexHorseData.player;
                    playerData[deadHorseOwner] = { ...playerData[deadHorseOwner], horses: playerData[deadHorseOwner].horses + actionIndexHorseData.horses }
                    myThrowCount += 1;

                    horsePosition[action.index] = { ...selectHorseData, placeList }
                }
            }
            else {
                // 아무것도 없었을 때
                horsePosition[action.index] = { ...selectHorseData, placeList };
            }
            delete horsePosition[state.selectHorse]

            sendDataToPeers(GAME, { nickname, peers, game: YUT, data: { ...sendState, yutData, playerData, horsePosition, myThrowCount, selectHorse: undefined, placeToMove: {} } });

            return { ...state, yutData, playerData, horsePosition, myThrowCount, selectHorse: undefined, placeToMove: {} };
        }
        case UPDATE_GOAL: {
            // 말 위치 데이터가 변경이 되었다면 골인지점 에 있는 상태인지 확인,
            // 골인지점에 있다면 점수 올리고 말 삭제
            const playerData = [...state.playerData]
            const horsePosition = { ...state.horsePosition };
            const player = horsePosition[30].player;
            let winner = [...state.winner];
            const goal = playerData[player].goal // 플레이어 데이터의 goal과 
                + horsePosition[30].horses // 현재 골인지점에 있는 말들을 더함.
            delete horsePosition[30]; // 골인 지점 말 삭제
            playerData[player] = { ...playerData[player], goal }
            if (playerData[player].goal >= 4) {
                winner.push(playerData[player].nickname);
            }

            sendDataToPeers(GAME, { nickname, peers, game: YUT, data: { ...sendState, horsePosition, playerData, winner } });

            return { ...state, horsePosition, playerData, winner };

        }
        case DESELECT_HORSE: {
            sendDataToPeers(GAME, { nickname, peers, game: YUT, data: { ...sendState, selectHorse: undefined, placeToMove: {} } });
            return { ...state, selectHorse: undefined, placeToMove: {} };
        }
        case TIME_OUT:
        case NEXT_TURN: {
            const peers = state.peers;
            // send next user
            console.log("NEXT_TURN START ----------------------")
            console.log(nickname)
            console.log(state.nowTurnNickname)
            console.log(state.nowTurnNickname === nickname)

            if (state.nowTurnNickname === nickname) {
                console.log("들어옴")
                const nowTurnIndex = state.nowTurnIndex === state.playerData.length - 1 ? 0 : state.nowTurnIndex + 1;
                const nowTurnNickname = state.playerData[nowTurnIndex].nickname;
                console.log("nowTurn", nowTurnIndex, nowTurnNickname);
                console.log("peers :", peers)
                sendDataToPeers(GAME, { nickname, peers, game: YUT, data: { ...sendState, placeToMove: {}, myThrowCount: 1, yutData: [], nowTurnIndex, nowTurnNickname, timer: 0 } });
                console.log("NEXT_TURN END ----------------------")
                return { ...state, placeToMove: {}, myThrowCount: 1, yutData: [], nowTurnIndex, timer: 0, nowTurnNickname, halted: true };
            }
            console.log("NEXT_TURN END ----------------------")
        }
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


    useEffect(() => {
        console.log("[debug] update_peers : ", peers);
        dispatch({ type: UPDATE_PEERS, peers })
    }, [peers])

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
        if (timer > 10) {
            dispatch({ type: NEXT_TURN })
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
            {winner.map((i) => <div>1등 : {i}</div>)}
            <boardContext.Provider value={value}>
                {children}
            </boardContext.Provider >
        </div>
    );
}

export default memo(YutStore);