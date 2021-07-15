import React, {createContext, useContext, useReducer, useState, useEffect, useMemo} from "react";
import shuffle from 'lodash.shuffle';
import {
    GET_DATA_FROM_PEER,
    STOP_TIMER,
    UPDATE_PEERS,
    UPDATE_TIMER
} from "../../../Container/GameContainer/Yut/yutReducerType";
import {PeerDataContext, PeersContext} from "../../../Routes/peerStore";
import {AVALON, GAME, YUT} from "../../../Constants/peerDataTypes";
import {sendDataToPeers} from "../../../Common/peerModule/sendToPeers";
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
    voteCount: 0,
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
const START_FRAME = 0;
const MAIN_FRAME = 1;
const VOTE_FRAME = 2;
const EXPEDITION_FRAME = 3;
const ASSASSIN_FRAME = 4;
const END_GAME_FRAME = 5;

const initialState = {
    playerData: [
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
    ],
    mainFrameClick: false,
    playerCheckedNumber: 0,
    voteCount: 0,
    voteResult: false,
    expedition: false,
    winner: '',
    page: START_FRAME,
    kill: '',
}
const GameContext = React.createContext()
const PlayerContext = React.createContext(playerData)

const init = ({initialState, peers}) => {
    console.log("in init : ", peers)
    return {...initialState, peers}
}
const Store = ({children}) => {
    const [gameState, setGameState] = useState({
        voteStage: 0, //5-voteStage 재투표 가능횟수
        expeditionStage: 0, //게임 expedition 진행 상황
        represent: 0, //원정 인원 정하는 대표자 index
        vote: [], //원정 성공 여부 투표함
        takeStage: [], //인원에 맞는 게임 스테이지 설정
        playerCount: 0, // 대표자가 원정에 보낼 인원 수
        voteCount: 0, //

        voteResult: false,
        expedition: false,
        //위의 두개는 뷰로 그냥 빼는게 좋을듯??
        winner: '',
        page: Pages.START_FRAME,
        kill: '',
    })
    const [playerState, setPlayerState] = useState({
        nickname: '',
        role: '',
        vote: '',
        toGo: '',
        selected: false
    })
    // const game = useContext(gameData)
    // const user = useContext(playerData)
    const {peers} = useContext(PeersContext);
    const {peerData} = useContext(PeerDataContext);
    // const [playerCount, setPlayerCount] = useState(0);
    // const [voteCount, setVoteCount] = useState(0);
    // const [winner, setWinner] = useState('')
    // const [page, setPage] = useState(START_FRAME);
    // const [kill, setKill] = useState('')

    // useEffect(() => {
    //     let timer;
    //     if (halted === false) {
    //         timer = setInterval(() => {
    //             dispatch({type: UPDATE_TIMER})
    //         }, 1000);
    //     }
    //     return () => {
    //         clearInterval(timer);
    //     }
    // }, [halted])
    //
    // useEffect(() => {
    //     if (timer > 3) {
    //         // 시간 멈춰놓고
    //         dispatch({type: STOP_TIMER});
    //         // 컴퓨터 행동 하고
    //         // dispatch({ type: PLAY_COMPUTER, dispatch });
    //         // 턴 넘겨주고
    //         // dispatch({ type: NEXT_TURN });
    //         // yutDataSendToPeers(state);
    //         reducerActionHandler.playAiHandler({dispatch, state, peers});
    //         dispatch({type: STOP_TIMER});
    //         // reducerActionHandler.nextTurnHandler({ dispatch, state, peers });
    //     }
    // }, [timer])

    // useEffect(() => {
    //     if (peerData.type === GAME && peerData.game === YUT) {
    //         const data = peerData.data;
    //         dispatch({type: GET_DATA_FROM_PEER, data})
    //     }
    // }, [peerData])

    const gameStart = () => {
        console.log('Store.gameStart')
        const playersNumber = playerState.length;
        let gameTable = []
        switch (playersNumber) {
            case 5 :
                gameTable = needPlayers._5P;
                break;
            case 6:
                gameTable = needPlayers._6P;
                break;
            case 7:
                gameTable = needPlayers._7P;
                break;
            case 8:
            case 9:
            case 10:
                gameTable = needPlayers._8to10P;
                break;
            default:
                alert('error');
        }
        if (playersNumber >= 5) {
            const temp = [
                ...mustHaveRoles,
                ...expandRoles.slice(0, playersNumber - 5),
            ];
            const roles = shuffle(temp)
            const nickname = localStorage.getItem('nickname')
            const playerArr = [...playerState]
            const gameArr = [...gameState]
            peers.forEach((i) => {
                playerArr.push({
                    nickname: i.nickname,
                    role: roles[i],
                    vote: '',
                    toGo: '',
                    selected: false,
                })
            })
            peers.forEach(() => {
                gameArr.push({
                    voteStage: 0, //5-voteStage 재투표 가능횟수
                    expeditionStage: 0, //게임 expedition 진행 상황
                    represent: 0, //원정 인원 정하는 대표자 index
                    vote: [], //원정 성공 여부 투표함
                    takeStage: gameTable, //인원에 맞는 게임 스테이지 설정
                    playerCount: 0, // 대표자가 원정에 보낼 인원 수
                    voteCount: 0, //
                    voteResult: false,
                    expedition: false,
                    //위의 두개는 뷰로 그냥 빼는게 좋을듯??
                    winner: '',
                    page: Pages.START_FRAME,
                    kill: '',
                })
            })
            const halt = true
            setPlayerState({...playerState, playerArr})
            setGameState({...gameState, page: Pages.MAIN_FRAME, gameArr})
            sendDataToPeers(GAME, {game: AVALON, nickname, peers, data: {gameArr, playerArr,}})
        } else {
            alert('error')
        }
    };
    const voteOnChange = e => { //사용자 선택 e
        const playerCount = e.target.checked ? 1 : -1
        const index = e.target.value
        const checked = e.target.checked
        // dispatch({type: func.voteOnChange, index: index, playerCount: playerCount, checked: checked})
        setGameState({...gameState, index: index, playerCount: playerCount, checked: checked})
    }
    const voteOnClick = () => {
        if (gameState.playerCount === gameState.takeStage[gameState.expeditionStage]) {
            const voteCount = gameState.voteCount + 1
            const playerCount = 0
            // dispatch({type: func.voteOnClick, voteCount: voteCount, playerCount: playerCount, page: page})
            setGameState({...gameState, voteCount: voteCount, playerCount: playerCount, page: Pages.VOTE_FRAME})
        } else {
            alert(`${gameState.takeStage[gameState.expeditionStage]}명을 선택해야합니다.`);
        }
    }
    const votePage = () => {
        const agree = gameState.playerData.filter(element => 'agree' === element).length
        const oppose = gameState.playerData.filter(element => 'oppose' === element).length
        let expeditionStage, index = gameState.expeditionStage
        let voteStage = 0
        let page = ''
        if (agree >= oppose) {
            voteStage = 0
            page = Pages.EXPEDITION_FRAME
        } else {
            if (gameState.voteStage === 4) {
                expeditionStage = gameState.expeditionStage + 1
                voteStage = 0
                setGameState({
                    takeStage: 'fail'
                })
            } else {
                // state.voteStage += 1;
                voteStage = gameState.voteStage + 1
            }
            page = Pages.MAIN_FRAME
        }
        const represent = (gameState.represent + 1) % gameState.playerData.length
        setGameState({
            index: index,
            page: page,
            voteStage: voteStage,
            expeditionStage: expeditionStage,
            represent: represent

        })
        nextPage()
    }
    const nextPage = () => {
        const angelCount = gameState.takeStage.filter(element => 'success' === element).length;
        const evilCount = gameState.takeStage.filter(element => 'fail' === element).length;
        let page = ''
        const winner = 'EVILS_WIN'
        if (angelCount === 3) {
            page = Pages.ASSASSIN_FRAME
        }
        if (evilCount === 3) {
            page = Pages.END_GAME_FRAME
        }
        const vote = []
        setGameState({
            vote: vote,
            page: page,
            winner: winner
        })
    }
    const expeditionClick = () => {
        let value = ''
        if (gameState.expeditionStage === 4 && gameState.playerData.length >= 7) {
            if (gameState.vote.filter(element => 'fail' === element).length >= 2) {
                gameState.takeStage[gameState.expeditionStage] = 'fail';
                value = 'fail'
            } else {
                gameState.takeStage[gameState.expeditionStage] = 'success'
                value = 'success'
            }
        } else {
            gameState.vote.includes('fail') ?
                value = 'fail' :
                value = 'success'
        }
        const expeditionStage = gameState.expeditionStage
        const nextExpeditionStage = gameState.expeditionStage + 1
        setGameState({
            value: value,
            expeditionStage: expeditionStage,
            nextExpeditionStage: nextExpeditionStage
        })
    }
    const killPlayer = () => {
        const targetPlayer = selectPlayer.toString()
        const winner = targetPlayer === 'Merlin' ? 'ANGELS_WIN' : 'EVILS_WIN'
        setGameState({...gameState, winner: winner, page: Pages.END_GAME_FRAME})
    }
    const selectPlayer = e => {
        return e.target.value
    }
    const setPage = (page) => {
        setGameState({
            page: page
        })
    }
    useEffect(() => {
        if (peerData.type === GAME && peerData.game === AVALON) {
            const data = peerData.data
            console.log(data)
            setPlayerState([...data.playerArr])
        }
    }, [peerData])
    return (
        <div>
            <PlayerContext.Provider value={
                {playerState}}>
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
        </div>

    )
}
export {PlayerContext, Store, GameContext}