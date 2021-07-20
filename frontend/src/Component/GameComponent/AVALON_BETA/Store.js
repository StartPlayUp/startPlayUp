import React, {useEffect, useReducer, useMemo, useState, useContext} from "react";
import shuffle from 'lodash.shuffle';
import reducer, {EXPEDITION_CLICK, GAME_CHECK, SET_COMPONENT, VOTE_CHECK} from "./MVC/AVALON_Reducer";
import {sendDataToPeers} from "../../../Common/peerModule/sendToPeers";
import {AVALON, GAME} from "../../../Constants/peerDataTypes";
import {PeerDataContext, PeersContext} from "../../../Routes/peerStore";

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

const Games = {
    voteStage: 0,
    expeditionStage: 0,
    represent: 0,
    vote: [],
    takeStage: [],

//**--------------------**
    playerCount: 0,
    voteResult: false,
    expedition: false,
    winner: '',
    component: START_FRAME,
    kill: '',
}

const Players = [
    {nickname: 'user1', role: '', vote: '', toGo: '', selected: false},
    {nickname: 'user2', role: '', vote: '', toGo: '', selected: false},
    {nickname: 'user3', role: '', vote: '', toGo: '', selected: false},
    {nickname: 'user4', role: '', vote: '', toGo: '', selected: false},
    {nickname: 'user5', role: '', vote: '', toGo: '', selected: false},
    // {nickname: 'user6', role: '', vote: '', toGo: '',selected : false},
    // {nickname: 'user7', role: '', vote: '', toGo: '',selected : false},
    // {nickname: 'user8', role: '', vote: '', toGo: '',selected : false},
    // {nickname: 'user9', role: '', vote: '', toGo: '',selected : false},
]
const playerData = {
    nickname: '',
    role: '',
    vote: '',
    toGo: '',
    selected: false
}
//
const gameData = {
    voteStage: 0,
    expeditionStage: 0,
    represent: 0,
    vote: [],
    takeStage: [],
    component: START_FRAME,
}
const testPlayer = [
    {nickname: 'user1', role: '', vote: '', toGo: '', selected: false},
    {nickname: 'user2', role: '', vote: '', toGo: '', selected: false},
    {nickname: 'user3', role: '', vote: '', toGo: '', selected: false},
    {nickname: 'user4', role: '', vote: '', toGo: '', selected: false},
    {nickname: 'user5', role: '', vote: '', toGo: '', selected: false},
    // {nickname: 'user6', role: '', vote: '', toGo: '',selected : false},
    // {nickname: 'user7', role: '', vote: '', toGo: '',selected : false},
    // {nickname: 'user8', role: '', vote: '', toGo: '',selected : false},
    // {nickname: 'user9', role: '', vote: '', toGo: '',selected : false},
    //
]
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
    component: START_FRAME, //시작 컴포넌트 설정
    index: 0,
    checked: false,
}
const GameContext = React.createContext('')

const Store = ({children}) => {
    const {peers} = useContext(PeersContext);
    const {peerData} = useContext(PeerDataContext);
    const nickname = localStorage.getItem('nickname')
    const [gameState, dispatch] = useReducer(reducer, initialData)
    console.log(gameState)
    const gameStart = () => {
        const gameArr = {...gameState}
        peers.forEach((i) => {
            console.log(`peers.forEach`)
            gameArr.usingPlayers.push({
                nickname: i.nickname,
                role: '',
                vote: '',
                toGo: '',
                selected: false
            })
        })
        const playersNumber = gameArr.usingPlayers.length
        switch (playersNumber) {
            case 5 :
                gameArr.takeStage = needPlayers._5P;
                break;
            case 6:
                gameArr.takeStage = needPlayers._6P;
                break;
            case 7:
                gameArr.takeStage = needPlayers._7P;
                break;
            case 8:
            case 9:
            case 10:
                gameArr.takeStage = needPlayers._8to10P;
                break;
            default:
                alert('error')
        }
        if (playersNumber >= 5) {
            const temp = [
                ...mustHaveRoles,
                ...expandRoles.slice(0, gameArr.usingPlayers.length - 5),
            ];
            const roles = shuffle(temp)
            gameArr.usingPlayers.map((user, index) => {
                user.role = roles[index]
            })
            gameArr.component = FRAME_MAIN
            sendDataToPeers(GAME, {game: AVALON, nickname, peers, data: gameArr})
            dispatch({type: START_FRAME, gameArr})
        } else {
            alert(`${playersNumber}명입니다. ${5 - playersNumber}명이 더 필요합니다.`)
        }
    }
    const voteCheck = () => {
        const gameArr = {...gameState}
        let agree = 0;
        let oppose = 0;
        gameArr.usingPlayers.map(e => e.toGo === 'agree' ? ++agree : ++oppose)
        if (agree >= oppose) {
            gameArr.component = EXPEDITION_FRAME
        } else {
            if (gameArr.voteStage === 4) {
                gameArr.takeStage[gameArr.expeditionStage] = 'fail'
                gameArr.expeditionStage += 1
                gameArr.voteStage = 0
            } else {
                gameArr.voteStage += 1
            }
            gameArr.component = FRAME_MAIN
        }
        gameArr.represent += 1
        gameArr.represent %= gameArr.usingPlayers.length
        sendDataToPeers(GAME, {game: AVALON, nickname, peers, data: gameArr})
        dispatch({type: VOTE_CHECK, gameArr})
    }
    const expeditionClick = () => {
        const gameArr = {...gameState}
        if (gameArr.expeditionStage === 4 && gameArr.usingPlayers.length >= 7) {
            if (gameArr.vote.filter(element => 'fail' === element).length >= 2) {
                gameArr.takeStage[gameArr.expeditionStage] = 'fail';
            } else {
                gameArr.takeStage[gameArr.expeditionStage] = 'success'
            }
        } else {
            gameArr.vote.includes('fail') ?
                gameArr.takeStage[gameArr.expeditionStage] = 'fail' :
                gameArr.takeStage[gameArr.expeditionStage] = 'success'
        }
        gameArr.expeditionStage += 1
        gameArr.component = EXPEDITION_RESULT
        gameArr.voteStage = 0
        gameArr.usingPlayers.map((user) => {
            user.selected = false
        })
        sendDataToPeers(GAME, {game: AVALON, nickname, peers, data: gameArr})
        dispatch({type: EXPEDITION_CLICK, gameArr})
    }
    const setComponent = (component) => {
        sendDataToPeers(GAME, {game: AVALON, nickname, peers, data: {component: component}})
        dispatch({type: SET_COMPONENT, component: component})
    }
    useEffect(() => {
        const gameArr = {...gameState}
        const angelCount = gameArr.takeStage.filter(element => 'success' === element).length;
        const evilCount = gameArr.takeStage.filter(element => 'fail' === element).length;
        if (angelCount === 3) { // 선이 원정 3개를 차지한 경우
            gameArr.component = ASSASSIN_FRAME // 암살자 역할로 넘어감
        }
        if (evilCount === 3) { // 악이 원정 3개를 차지한 경우
            gameArr.winner = 'EVILS_WIN'
            gameArr.component = END_GAME_FRAME //악이 이긴걸로 게임이 종료
        }
        console.log(`useEffect`)
        dispatch({type: GAME_CHECK, gameArr})
    }, [gameState.expeditionStage]) // 게임 종료 조건 useEffect

    // useEffect(() => {
    //     if (peerData.type === GAME && peerData.game === AVALON) {
    //         const data = peerData.data
    //         (data)
    //         setPlayerState([...data.gameState])
    //     }
    // }, [peerData])
    return (
        <GameContext.Provider value={
            {
                gameState,
                dispatch,
                gameStart,
                voteCheck,
                expeditionClick,
                setComponent,
            }
        }>
            {children}
        </GameContext.Provider>
    )
}
export {Store, GameContext}