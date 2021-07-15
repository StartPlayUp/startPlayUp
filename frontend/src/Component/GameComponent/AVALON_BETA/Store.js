import React, {createContext, useContext, useReducer, useState, useEffect} from "react";
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

const gameData = {
    voteStage: 0,
    expeditionStage: 0,
    represent: 0,
    vote: [],
    takeStage: [],
    page : Pages.START_FRAME,
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
export const GameContext = React.createContext(gameData)
export const PlayerContext = React.createContext(playerData)
const initState = createContext(initialState)

const init = ({initialState, peers}) => {
    console.log("in init : ", peers)
    return {...initialState, peers}
}
// const reducer = (state, action) => {
//     switch (action.type) {
//         case UPDATE_PEERS: {
//             return {...state, peers: action.peers}
//         }
//         case UPDATE_TIMER:
//             return {...state, timer: state.timer + 1}
//         case GET_DATA_FROM_PEER: {
//             return {...state, ...action.data}
//         }
//         case STOP_TIMER : {
//             return {...state, halted: true}
//         }
//         case func.gameStart: {
//             return {...state, playerData: action.playerData, nowTurnNickname: action.nowTurnNickname, halt: true};
//         }
//         default: {
//             return {...state}
//         }
//     }
// }

const Store = ({children}) => {
    const game = useContext(GameContext)
    const user = useContext(PlayerContext)
    const {peers} = useContext(PeersContext);
    // const [state, dispatch] = useReducer(reducer, {initialState, peers}, init);
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

    useEffect(() => {
        if (peerData.type === GAME && peerData.game === YUT) {
            const data = peerData.data;
            dispatch({type: GET_DATA_FROM_PEER, data})
        }
    }, [peerData])
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
        page: START_FRAME,
        kill: '',
    })
    const [playerState, setPlayerState] = useState({
        nickname: '',
        role: '',
        vote: '',
        toGo: '',
        selected: false
    })
    const gameStart = () => {
        const PlayersNumber = user.length;
        const page = MAIN_FRAME
        switch (user.length) {
            case 5 :
                game.takeStage = needPlayers._5P;
                break;
            case 6:
                game.takeStage = needPlayers._6P;
                break;
            case 7:
                game.takeStage = needPlayers._7P;
                break;
            case 8:
            case 9:
            case 10:
                game.takeStage = needPlayers._8to10P;
                break;
            default:
                alert('error');
        }
        if (PlayersNumber >= 5) {
            const temp = [
                ...mustHaveRoles,
                ...expandRoles.slice(0, PlayersNumber - 5),
            ];
            const roles = shuffle(temp)
            const nickname = localStorage.getItem('nickname')
            const playerArr = [...playerState]
            peers.forEach((i) => {
                playerArr.push({
                    nickname: i.nickname,
                    role: roles[i],
                    vote: '',
                    toGo: '',
                    selected: false,
                })
            })
            const halt = true
            setPlayerState({...playerState, playerArr})
            setGameState({...gameState, page: MAIN_FRAME})
            sendDataToPeers(GAME, {game: AVALON, nickname, peers, data: {gameState, playerArr,}})
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
        const agree = state.playerData.filter(element => 'agree' === element).length
        const oppose = state.playerData.filter(element => 'oppose' === element).length
        let expeditionStage, index = state.expeditionStage
        let voteStage = 0
        let page = ''
        if (agree >= oppose) {
            voteStage = 0
            page = Pages.EXPEDITION_FRAME
        } else {
            if (state.voteStage === 4) {
                expeditionStage = state.expeditionStage + 1
                voteStage = 0
                setGameState({
                    takeStage: 'fail'
                })
            } else {
                // state.voteStage += 1;
                voteStage = state.voteStage + 1
            }
            page = Pages.MAIN_FRAME
        }
        const represent = (state.represent + 1) % state.playerData.length
        setGameState({
            index: index,
            page: page,
            voteStage: voteStage,
            expeditionStage: expeditionStage,
            represent: represent

        })
        nextPage()
        // dispatch({
        //     type: func.votePage,
        //     index: index,
        //     page: page,
        //     voteStage: voteStage,
        //     expeditionStage: expeditionStage,
        //     takeStageFail: takeStageFail,
        //     represent: represent
        // })
    }
    const nextPage = () => {
        const angelCount = state.takeStage.filter(element => 'success' === element).length;
        const evilCount = state.takeStage.filter(element => 'fail' === element).length;
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
        if (state.expeditionStage === 4 && state.playerData.length >= 7) {
            if (state.vote.filter(element => 'fail' === element).length >= 2) {
                state.takeStage[state.expeditionStage] = 'fail';
                value = 'fail'
            } else {
                state.takeStage[state.expeditionStage] = 'success'
                value = 'success'
            }
        } else {
            state.vote.includes('fail') ?
                value = 'fail' :
                value = 'success'
        }
        const expeditionStage = state.expeditionStage
        const nextExpeditionStage = state.expeditionStage + 1
        dispatch({
            type: func.expeditionClick,
            value: value,
            expeditionStage: expeditionStage,
            nextExpeditionStage: nextExpeditionStage
        })
        setGameState({
            value: value,
            expeditionStage: expeditionStage,
            nextExpeditionStage: nextExpeditionStage
        })
    }
    const killPlayer = () => {
        const targetPlayer = selectPlayer.toString()
        const winner = targetPlayer === 'Merlin' ? 'ANGELS_WIN' : 'EVILS_WIN'
        dispatch({type: func.killPlayer, winner: winner, page: Pages.END_GAME_FRAME})
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
        <PlayerContext.Provider value={
            {playerState: playerState}}>
            <GameContext.Provider value={
                {
                    gameState : gameState,
                    gameStart,
                    voteOnChange,
                    voteOnClick,
                    votePage,
                    nextPage,
                    expeditionClick,
                    killPlayer,
                    selectPlayer,
                    setPage
                }
            }>
                {children}
            </GameContext.Provider>
        </PlayerContext.Provider>
    )
}
export default Store