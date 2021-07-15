import React, {createContext} from "react";
import { sendDataToPeers } from 'Common/peerModule/sendToPeers/index.js';
import { GAME, AVALON } from 'Constants/peerDataTypes.js';

export const Pages = {
    START_FRAME: 'START_FRAME',
    //
    MAIN_FRAME: 'MAIN_FRAME',
    MAIN_VOTE: 'MAIN_VOTE',
    //
    VOTE_FRAME: 'VOTE_FRAME',
    VOTE_RESULT: 'VOTE_RESULT',
    //
    EXPEDITION_FRAME: 'EXPEDITION_FRAME',
    EXPEDITION_RESULT: 'EXPEDITION_RESULT',
    //
    ASSASSIN_FRAME: 'ASSASSIN_FRAME',
    //
    END_GAME_FRAME: 'END_GAME_FRAME',
}
const initState = {
    playerData: [
        {nickname: 'user1', role: '', vote: '', toGo: '', selected: false},
        {nickname: 'user2', role: '', vote: '', toGo: '', selected: false},
        {nickname: 'user3', role: '', vote: '', toGo: '', selected: false},
        {nickname: 'user4', role: '', vote: '', toGo: '', selected: false},
        {nickname: 'user5', role: '', vote: '', toGo: '', selected: false},
        //여기에 플레이어 데이터
        // {nickname: 'user6', role: '', vote: '', toGo: '',selected : false},
        // {nickname: 'user7', role: '', vote: '', toGo: '',selected : false},
        // {nickname: 'user8', role: '', vote: '', toGo: '',selected : false},
        // {nickname: 'user9', role: '', vote: '', toGo: '',selected : false},
    ],
    page: Pages.START_FRAME, // 이용자에게 보여질 화면페이지
    voteStage: 0, // 5 - voteCount  재투표 횟수
    represent: 0, // 원정대를 꾸릴 대표자 index
    vote: [], // 꾸려진 원정대 찬반 투표
    takeStage: [], // 인원수에 따라 필요한 원정을 넣는다.
    playerCount: 0, // 원정에 필요한 인원 체크
    voteCount: 0, //
    winner: '', // 승리한 팀
    expeditionStage: 0, // 지금 진행중인 원정 표시
}

export const func = {
    gameStart: 'gameStart',
    votePage: 'votePage',
    nextPage: 'nextPage',
    voteOnClick: 'voteOnClick',
    voteResult: 'voteResult',
    voteOnChange: 'voteOnChange',
    expeditionClick: 'expeditionClick',
    assassinOnChange: 'assassinOnChange',
    killPlayer: 'killPlayer',
    expeditionResult: 'expeditionResult',
    setPage: 'setPage',
    initVote: 'initFVote'
}
export const initContext = createContext(initState)
const reducer = ({peers, ...sendState}, {type, ...action}) => {
    const state = {...sendState, peers};
    const nickname = localStorage.getItem('nickname');
    switch (action) {
        case UPDATE_TIMER: {
            return { ...state, peers: action.peers }
        };
        case GET_DATA_FROM_PEER: {
            const halted = !(nickname === action.data.nowTurnNickname)
            return { ...state, ...action.data, halted };
        }
        case UPDATE_TIMER:
            return { ...state, timer: state.timer + 1 };
        case func.setPage: {
            return {...state, setPage: action.page}
        }
        case func.gameStart: {
            return {...state, setPage: action.result.page, takeStage: action.result.takeStage,}
        }
        case func.voteOnChange: {
            const playerCount = state.playerCount + action.playerCount
            state.playerData[action.index].selected = action.checked
            return {...state, playerCount: playerCount}
        }
        case func.voteOnClick : {
            return {...state, voteCount: action.voteCount, playerCount: action.playerCount, setPage: action.page}
        }
        case func.votePage : {
            if (action.takeStageFail === 'fail' && state.voteStage === 4) {
                state.takeStage[action.index] = action.takeStageFail
            }
            return {
                ...state,
                setPage: action.page,
                voteStage: action.voteStage,
                expeditionStage: action.expeditionStage,
                represent: action.represent
            };
        }
        case func.nextPage : {
            return {
                ...state,
                vote: action.vote,
                setPage: action.page,
                winner: action.winner
            }
        }
        case func.expeditionClick : {
            state.takeStage[action.expeditionStage] = action.value
            return {
                ...state,
                expeditionStage: action.nextExpeditionStage
            }
        }
        case func.killPlayer : {
            return {
                ...state,
                winner: action.winner,
                setPage: action.page
            }
        }
        default :
            return {state}
    }
}