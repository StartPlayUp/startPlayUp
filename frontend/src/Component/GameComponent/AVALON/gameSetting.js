import React, {createContext, useContext, useReducer} from "react";
import shuffle from 'lodash.shuffle';


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

const START_FRAME = 0;
const MAIN_FRAME = 1;
const VOTE_FRAME = 2;
const EXPEDITION_FRAME = 3;
const ASSASSIN_FRAME = 4;
const END_GAME_FRAME = 5;

const initialState = {
    mainFrameClick: false,
    playerCheckedNumber: 0,
    voteCount: 0,
    voteResult: false,
    expedition: false,
    winner: '',
    page: START_FRAME,
    kill: '',
}
export const GameContext = createContext(Games);
export const PlayerContext = createContext(Players);
export const InitState = createContext(initialState)

// const reducer = (state, action) => {
//     console.log(state)
//     switch (action.type) {
//         case "mainFrameClick":
//             return {...state, mainFrameClick: action.mainFrameClick}
//         case "playerCheckedNumber" :
//             return {...state, playerCheckedNumber: state.playerCheckedNumber + action.playerCheckedNumber}
//         case "checkedReset":
//             return {...state, playerCheckedNumber: 0}
//         case "voteCount":
//             return {...state, voteCount: action.voteCount}
//         case "voteResult":
//             return {...state, voteResult: action.voteResult}
//         case "expedition":
//             return {...state, expedition: action.expedition}
//         case "winner":
//             return {...state, winner: action.winner}
//         case "page":
//             return {...state, page: action.page}
//         case "kill":
//             return {...state, kill: action.killedPlayer}
//         default :
//             return state
//     }
// }
// const Store = () => {
//     const [state, dispatch] = useReducer(reducer, initialState)
//     const game = useContext(GameContext)
//     const user = useContext(PlayerContext)
//     const voteOnChange = e => {
//         user[e.target.value].selected = e.target.checked;
//         const playerCheckedNumber = e.target.checked ? 1 : -1
//         dispatch({type: "playerCheckedNumber", playerCheckedNumber})
//     }
//     const voteOnClick = () => {
//         if (state.playerCheckedNumber === game.takeStage[game.expeditionStage]) {
//             const voteCount = state.voteCount + 1
//             const page = VOTE_FRAME
//             dispatch({type: "voteCount", voteCount})
//             dispatch({type: "mainFrameClick"})
//             dispatch({type: "checkedReset"})
//             dispatch({type: "page", page})
//         } else {
//             alert(`${Games.takeStage[Games.expeditionStage]}명을 선택해야합니다.`);
//         }
//     }
//     const mainFrameClicked = () => {
//         const mainFrameClick = true
//         dispatch({type: "mainFrameClick", mainFrameClick})
//     }
//     const votePage = () => {
//         let agree = 0;
//         let oppose = 0;
//         user.map(e => e.toGo === 'agree' ? ++agree : ++oppose)
//         if (agree >= oppose) {
//             const page = EXPEDITION_FRAME
//             game.voteStage = 0;
//             dispatch({type: "page", page})
//         } else {
//             const page = MAIN_FRAME
//             if (game.voteStage === 4) {
//                 game.takeStage[game.expeditionStage] = 'fail';
//                 game.expeditionStage += 1;
//                 game.voteStage = 0;
//             } else {
//                 game.voteStage += 1;
//             }
//             dispatch({type: "page", page})
//         }
//         game.represent += 1;
//         game.represent %= user.length;
//         nextPage()
//     }
//     const nextPage = () => {
//         const expedition = false
//         const angelCount = game.takeStage.filter(element => 'success' === element).length;
//         const evilCount = game.takeStage.filter(element => 'fail' === element).length;
//         if (angelCount === 3) {
//             const page = ASSASSIN_FRAME
//             dispatch({type: "page", page})
//         }
//         if (evilCount === 3) {
//             const page = END_GAME_FRAME
//             const winner = 'EVILS_WIN'
//             dispatch({type: "winner", winner})
//             dispatch({type: "page", page})
//         }
//         dispatch({type: "expedition", expedition})
//         game.vote = []
//     }
//     const expeditionClick = () => {
//         const expedition = true
//         dispatch({type: "expedition", expedition})
//         if (game.expeditionStage === 4 && user.length >= 7) {
//             if (game.vote.filter(element => 'fail' === element).length >= 2) {
//                 game.takeStage[game.expeditionStage] = 'fail';
//             } else {
//                 game.takeStage[game.expeditionStage] = 'success'
//             }
//         } else {
//             game.vote.includes('fail') ?
//                 game.takeStage[game.expeditionStage] = 'fail' :
//                 game.takeStage[game.expeditionStage] = 'success'
//         }
//         game.expeditionStage += 1;
//     }
//     const assassinOnChange = e => {
//         const killedPlayer = e.target.value
//         dispatch({type: "kill", killedPlayer})
//     }
//     const killPlayer = () => {
//         const page = END_GAME_FRAME
//         const winner = state.killedPlayer === 'merlin' ? '악의 승리' : '선의 승리'
//         dispatch({type: "winner", winner})
//         dispatch({type: "page", page})
//     }
//
//     const gameStart = () => {
//         const PlayersNumber = user.length;
//         const page = MAIN_FRAME
//         switch (user.length) {
//             case 5 :
//                 game.takeStage = needPlayers._5P;
//                 break;
//             case 6:
//                 game.takeStage = needPlayers._6P;
//                 break;
//             case 7:
//                 game.takeStage = needPlayers._7P;
//                 break;
//             case 8:
//             case 9:
//             case 10:
//                 game.takeStage = needPlayers._8to10P;
//                 break;
//             default:
//                 alert('error');
//         }
//         if (PlayersNumber >= 5) {
//             const temp = [
//                 ...mustHaveRoles,
//                 ...expandRoles.slice(0, PlayersNumber - 5),
//             ];
//             const roles = shuffle(temp);
//             // eslint-disable-next-line array-callback-return
//             user.map((Player, index) => {
//                 Player.role = roles[index];
//             });
//             dispatch({type: "page", page})
//             console.log(state.page)
//         } else {
//             alert('error')
//         }
//     };
// }
// export default Store
