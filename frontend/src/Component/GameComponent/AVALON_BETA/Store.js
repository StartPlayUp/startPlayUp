import React, {useEffect, useReducer, useMemo, useState, useContext} from "react";
import shuffle from 'lodash.shuffle';
import reducer, {EXPEDITION_CLICK, GAME_CHECK, SET_COMPONENT, VOTE_CHECK} from "./MVC/AVALON_Reducer";
import {PeerDataContext, PeersContext} from "../../../Routes/peerStore";
import {AVALON, GAME} from "../../../Constants/peerDataTypes";
import {GET_DATA_FROM_PEER} from "../../../Container/GameContainer/Yut/yutReducerType";

export const START_FRAME = 'START_FRAME'
export const FRAME_MAIN = 'FRAME_MAIN'
export const MAIN_VOTE = 'MAIN_VOTE'
export const VOTE_FRAME = 'VOTE_FRAME'
export const VOTE_RESULT = 'VOTE_RESULT'
export const EXPEDITION_FRAME = 'EXPEDITION_FRAME'
export const EXPEDITION_RESULT = 'EXPEDITION_RESULT'
export const ASSASSIN_FRAME = 'ASSASSIN_FRAME'
export const END_GAME_FRAME = 'END_GAME_FRAME'
export const angels = ['Merlin', 'Percival', 'Citizen']; // 천사팀
export const evils = ['Morgana', 'Assassin', 'Heresy', 'Modred']; //악마팀
export const merlinSight = ['Morgana', 'Assassin', 'Heresy']; // 멀린이 볼 수 있는 직업군
export const percivalSight = ['Morgana', 'Merlin'];

export const needPlayers = {
    _5P: [2, 3, 2, 3, 3],
    _6P: [2, 3, 4, 3, 4],
    _7P: [2, 3, 3, 4, 4],
    _8to10P: [3, 4, 4, 5, 5],
}
export const voteStageColor = ['white', 'white', 'white', 'white', 'red'];
export const mustHaveRoles = ['Merlin', 'Percival', 'Citizen', 'Morgana', 'Assassin'];
export const expandRoles = ['Citizen', 'Heresy', 'Citizen', 'Modred', 'Citizen'];

const initialData = {
    usingPlayers: [
        {nickname: 'user1', role: '', vote: '', toGo: '', selected: false},
        {nickname: 'user2', role: '', vote: '', toGo: '', selected: false},
        {nickname: 'user3', role: '', vote: '', toGo: '', selected: false},
        {nickname: 'user4', role: '', vote: '', toGo: '', selected: false},
        {nickname: 'user5', role: '', vote: '', toGo: '', selected: false},
    ],
    voteStage: 0, //5-voteStage 재투표 가능횟수
    expeditionStage: 0, //게임 expedition 진행 상황
    represent: 0, //원정 인원 정하는 대표자 index
    vote: [], //원정 성공 여부 투표함
    takeStage: [], //인원에 맞는 게임 스테이지 설정
    playerCount: 0, // 대표자가 원정에 보낼 인원 수
    winner: '',
    component: START_FRAME,
    index: 0,
    checked: false,
}

const GameContext = React.createContext('')

const Store = ({children}) => {
    const {peers} = useContext(PeersContext);
    const {peerData} = useContext(PeerDataContext);
    const nickname = localStorage.getItem('nickname');
    const [gameState, dispatch] = useReducer(reducer, initialData)
    console.log(gameState)

    useEffect(() => {
        const gameData = {...gameState}
        const angelCount = gameData.takeStage.filter(element => 'success' === element).length;
        const evilCount = gameData.takeStage.filter(element => 'fail' === element).length;
        if (angelCount === 3) {
            gameData.component = ASSASSIN_FRAME
        }
        if (evilCount === 3) {
            gameData.winner = 'EVILS_WIN'
            gameData.component = END_GAME_FRAME
        }
        gameData.usingPlayers.map((user, index) => {
            user.selected = false
        })
        dispatch({type: GAME_CHECK, gameData})
    }, [gameState.expeditionStage])

    useEffect(() => {
        if (peerData.type === GAME && peerData.game === AVALON) {
            const data = peerData.data
            dispatch({type: GET_DATA_FROM_PEER, data})
        }
    }, [peerData])
    return (
        <GameContext.Provider value={
            {
                gameState,
                dispatch,
                // gameStart,
                // voteCheck,
                // expeditionClick,
                // setComponent,
            }
        }>
            {children}
        </GameContext.Provider>
    )
}
export {Store, GameContext}