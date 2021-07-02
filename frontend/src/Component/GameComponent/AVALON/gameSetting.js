import React, {createContext, useContext, useReducer, useState} from "react";
import shuffle from 'lodash.shuffle';
import {Circle, Frame, Title, User} from "./MainPage/Styled";
import MerlinPlayer from "./Ability/MerlinPlayer";
import PercivalPlayer from "./Ability/PercivalPlayer";
import Vote from './RepresentVote/Vote'
import {createStore} from "redux";

export const angels = ['Merlin', 'Percival', 'Citizen'];
export const evils = ['Morgana', 'Assassin', 'Heresy', 'Modred'];
export const merlinSight = ['Morgana', 'Assassin', 'Heresy'];
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

export const GameContext = createContext(Games);
export const PlayerContext = createContext(Players);

const START = 0;
const MAIN_FRAME = 1;
const VOTE = 2;
const EXPEDITION = 3;
const ASSASSIN = 4;
const END_GAME = 5;

const initialState = {
    mainFrameClick: false,
    playCount: 0,
    voteCount: 0,
    voteResult: false,
    expedition: false,
    winner: '',
    page: START,
    kill: '',
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "mainFrameClick":
            return {
                mainFrameClick: true
            }
        case "playCount" :
        case "voteCount":
        case "voteResult":
        case "expedition":
        case "winner":
        case "page":
        case "kill":
        default :
            return state
    }
}

// const reducerView = ()

export function Store() {
    const user = useContext(PlayerContext)
    const game = useContext(GameContext)
    const [mainFrameClick, setMainFrameClick] = useState(false)
    const [playerCount, setPlayerCount] = useState(0);
    const [voteCount, setVoteCount] = useState(0);
    const [voteResult, setVoteResult] = useState(false)
    const [expedition, setExpedition] = useState(false);
    const [winner, setWinner] = useState('')
    const [page, setPage] = useState(START);
    const [kill, setKill] = useState('')

    const voteOnChange = e => {
        user[e.target.value].selected = e.target.checked;
        e.target.checked ? setPlayerCount(playerCount + 1) : setPlayerCount(playerCount - 1);
    }
    const voteOnClick = () => {
        if (playerCount === game.takeStage[game.expeditionStage]) {
            setVoteCount(voteCount + 1);
            setMainFrameClick(false);
            setPlayerCount(0)
            setPage(VOTE)
        } else {
            alert(`${game.takeStage[game.expeditionStage]}명을 선택해야합니다.`);
        }
    }
    const mainFrameClicked = () => {
        setMainFrameClick(true)
    }
    const setVoteTrue = () => {
        setVoteResult(true)
    }
    const setVoteFalse = () => {
        setVoteResult(false)
    }
    const votePage = () => {
        let agree = 0;
        let oppose = 0;
        user.map(e => e.toGo === 'agree' ? ++agree : ++oppose)
        if (agree >= oppose) {
            game.voteStage = 0;
            setPage(EXPEDITION)
        } else {
            if (game.voteStage === 4) {
                game.takeStage[game.expeditionStage] = 'fail';
                game.expeditionStage += 1;
                game.voteStage = 0;
            } else {
                game.voteStage += 1;
            }
            setPage(MAIN_FRAME)
        }
        game.represent += 1;
        game.represent %= user.length;
        nextPage()
    }
    const nextPage = () => {
        const angelCount = game.takeStage.filter(element => 'success' === element).length;
        const evilCount = game.takeStage.filter(element => 'fail' === element).length;
        if (angelCount === 3) {
            setPage(ASSASSIN)
        }
        if (evilCount === 3) {
            setWinner('EVILS_WIN')
            setPage(END_GAME)
        }
        setExpedition(false)
        game.vote = []
    }
    const expeditionClick = () => {
        setExpedition(true)
        if (game.expeditionStage === 4 && user.length >= 7) {
            if (game.vote.filter(element => 'fail' === element).length >= 2) {
                game.takeStage[game.expeditionStage] = 'fail';
            } else {
                game.takeStage[game.expeditionStage] = 'success'
            }
        } else {
            game.vote.includes('fail') ?
                game.takeStage[game.expeditionStage] = 'fail' :
                game.takeStage[game.expeditionStage] = 'success'
        }
        game.expeditionStage += 1;
    }
    const assassinOnChange = e => {
        setKill(e.target.value)
    }
    const killPlayer = () => {
        const win = kill === 'merlin' ? '악의 승리' : '선의 승리'
        setWinner(win)
        setPage(END_GAME)
    }
}//리듀서 사용 , 스토어 써서
