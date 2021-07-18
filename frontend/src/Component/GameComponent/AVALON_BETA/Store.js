import React, {useState} from "react";
import shuffle from 'lodash.shuffle';
import {Pages} from "./MVC/AVALON_Reducer";

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

//**--------------------**
    playerCount: 0,
    voteResult: false,
    expedition: false,
    winner: '',
    page: Pages.START_FRAME,
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
    page: Pages.START_FRAME,
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

const GameContext = React.createContext('')
const PlayerContext = React.createContext('')

const Store = ({children}) => {
    // const nickname = localStorage.getItem('nickname')
    const [gameState, setGameState] = useState({
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
        page: Pages.START_FRAME,
        kill: '',
        index: 0,
        checked: false,
        voteCount: 0
    })
    const gameStart = () => {
        console.log('gameStart')
        const gameArr = {...gameState}
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
                console.log('error')
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
            gameArr.page = Pages.MAIN_FRAME
            setGameState(gameArr)
        } else {
            alert(`${playersNumber}명입니다. ${5 - playersNumber}명이 더 필요합니다.`)
        }
    };
    const voteOnChange = e => { //사용자 선택 e
        const gameArr = {...gameState}
        console.log('voteOnChange')
        console.log(`index : ${e.target.value} , check : ${e.target.checked}`)
        console.log(`playerCount : ${gameArr.playerCount}`)
        gameArr.usingPlayers[e.target.value].selected = e.target.checked
        e.target.checked ? ++gameArr.playerCount : --gameArr.playerCount
        setGameState(gameArr)
    }
    const voteOnClick = () => {
        console.log('voteOnClick')
        const gameArr = {...gameState}
        if (gameArr.playerCount === gameArr.takeStage[gameArr.expeditionStage]) {
            gameArr.voteCount += 1
            gameArr.playerCount = 0
            // dispatch({type: func.voteOnClick, voteCount: voteCount, playerCount: playerCount, page: page})
            // sendDataToPeers(GAME, {game: AVALON, nickname, peers, data: {voteCount, playerCount}})
            gameArr.page = Pages.VOTE_FRAME
            setGameState(gameArr)
        } else {
            alert(`${gameArr.takeStage[gameArr.expeditionStage]}명을 선택해야합니다.`);
        }
    }
    const votePage = () => {
        console.log('votePage')
        console.log(gameState)
        const gameArr = {...gameState}
        let agree = 0;
        let oppose = 0;
        gameArr.usingPlayers.map(e => e.toGo === 'agree' ? ++agree : ++oppose)
        if (agree >= oppose) {
            gameArr.page = Pages.EXPEDITION_FRAME
        } else {
            if (gameArr.voteStage === 4) {
                gameArr.takeStage[gameArr.expeditionStage] = 'fail'
                gameArr.expeditionStage += 1
                gameArr.voteStage = 0
            } else {
                gameArr.voteStage += 1
            }
            gameArr.page = Pages.MAIN_FRAME
        }
        gameArr.represent += 1
        gameArr.represent %= gameArr.usingPlayers.length
        nextPage(gameArr.page)
        setGameState(gameArr)
    }
    const nextPage = (prop) => {
        const gameArr = {...gameState}
        const angelCount = gameArr.takeStage.filter(element => 'success' === element).length;
        const evilCount = gameArr.takeStage.filter(element => 'fail' === element).length;
        gameArr.page = prop
        if (angelCount === 3) {
            gameArr.page = Pages.ASSASSIN_FRAME
        }
        if (evilCount === 3) {
            gameArr.winner = 'EVILS_WIN'
            gameArr.page = Pages.END_GAME_FRAME
        }
        gameArr.vote = []
        setGameState(gameArr)
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
        gameArr.page = Pages.EXPEDITION_RESULT
        gameArr.voteStage = 0
        gameArr.usingPlayers.map((user) => {
            user.selected = false
        })
        setGameState(gameArr)
    }
    const killPlayer = () => {
        const gameArr = {...gameState}
        const targetPlayer = selectPlayer.toString()
        targetPlayer === 'Merlin' ? gameArr.winner = '악의 승리' : gameArr.winnner = '선의 승리'
        gameArr.page = Pages.END_GAME_FRAME
        setGameState(gameArr)
    }
    const selectPlayer = e => {
        return e.target.value
    }
    const setPage = (page) => {
        console.log(page)
        setGameState({
            ...gameState,
            page: page,
        })
    }
    // useEffect(() => {
    //     if (peerData.type === GAME && peerData.game === AVALON) {
    //         const data = peerData.data
    //         console.log(data)
    //         setPlayerState([...data.playerArr])
    //     }
    // }, [peerData])
    return (
        <PlayerContext.Provider value={
            {
                testPlayer,
            }}>
            <GameContext.Provider value={
                {
                    gameState,
                    gameStart,
                    voteOnChange,
                    voteOnClick,
                    votePage,
                    nextPage,
                    expeditionClick,
                    killPlayer,
                    selectPlayer,
                    setPage,
                }
            }>
                {children}
            </GameContext.Provider>
        </PlayerContext.Provider>
    )
}
export {PlayerContext, Store, GameContext}