// import React, {createContext, useContext, useReducer} from "react";
// import {angels, expandRoles, GameContext, mustHaveRoles, needPlayers, PlayerContext} from "./gameSetting";
// import {PublicFrame, Title, User} from "./MainPage/Styled";
// // import shuffle from "lodash.shuffle";
// import MerlinPlayer from "./Ability/MerlinPlayer";
// import PercivalPlayer from "./Ability/PercivalPlayer";
// import Vote from "./RepresentVote/Vote";
// import AngelsVote from "./ExpeditionVote/AngelsVote";
// import EvilsVote from "./ExpeditionVote/EvilsVote";
// import TakeStage from "./gamePage/mainView/TakeStage";
// import VoteStage from "./MainPage/VoteStage";
// import {GET_DATA_FROM_PEER, UPDATE_PEERS} from "../../../Container/GameContainer/Yut/YutStore";
// import {sendDataToPeers} from "../../../Common/peerModule/sendToPeers";
// import {AVALON, GAME} from "../../../Constants/peerDataTypes";
//
// export const START_FRAME = 'START_FRAME'
// export const MAIN_FRAME = 'MAIN_FRAME'
// export const MAIN_SELECT_PLAYER = 'MAIN_SELECT_PLAYER'
// export const VOTE_FRAME = 'VOTE_FRAME'
// export const VOTE_RESULT = 'VOTE_RESULT'
// export const EXPEDITION_FRAME = 'EXPEDITION_FRAME'
// export const EXPEDITION_RESULT = 'EXPEDITION_RESULT'
// export const ASSASSIN_FRAME = 'ASSASSIN_FRAME'
// export const END_GAME_FRAME = 'END_GAME_FRAME'
//
// export const mainFrameClicked = 'mainFrameClicked'
// export const votePage = 'votePage'
// export const nextPage = 'nextPage'
// export const expeditionClick = 'expeditionClick'
// export const assassinOnChange = 'assassinOnChange'
// export const killPlayer = 'killPlayer'
// export const gameStart = 'gameStart'
// export const boardContext = createContext(null)
//
// const initialState = {
//     playerData: [
//         {nickname: 'user1', role: '', vote: '', toGo: '', selected: false},
//         {nickname: 'user2', role: '', vote: '', toGo: '', selected: false},
//         {nickname: 'user3', role: '', vote: '', toGo: '', selected: false},
//         {nickname: 'user4', role: '', vote: '', toGo: '', selected: false},
//         {nickname: 'user5', role: '', vote: '', toGo: '', selected: false},
//         // {nickname: 'user6', role: '', vote: '', toGo: '',selected : false},
//         // {nickname: 'user7', role: '', vote: '', toGo: '',selected : false},
//         // {nickname: 'user8', role: '', vote: '', toGo: '',selected : false},
//         // {nickname: 'user9', role: '', vote: '', toGo: '',selected : false},
//     ],
//     voteStage: 0,
//     expeditionStage: 0,
//     represent: 0,
//     vote: [],
//     takeStage: [],
//
//     mainFrameClick: false,
//     playerCheckedNumber: 0,
//     voteCount: 0,
//     voteResult: false,
//     expedition: false,
//     winner: '',
//     page: START_FRAME,
//     kill: '',
// }
//
// export const reducer = ({peers, ...sendState}, {type, ...action}) => {
//     const state = {...sendState, peers};
//     const nickname = localStorage.getItem('nickname');
//     console.log(state)
//     switch (type) {
//         case UPDATE_PEERS: {
//             return {...state, peers: action.peers}
//         }
//         case GET_DATA_FROM_PEER: {
//             const halted = !(nickname === action.data.nowTurnNickname)
//             return {...state, ...action.data, halted};
//         }
//         case mainFrameClicked: {
//             state.page = true
//             return {...state}
//         }
//
//         case gameStart: {
//             const peers = action.peers
//             const nickname = localStorage.getItem('nickname')
//             const playerData = [...state.playerData]
//
//             switch (state.playerData.length) {
//                 case 5 :
//                     state.takeStage = needPlayers._5P;
//                     break;
//                 case 6:
//                     state.takeStage = needPlayers._6P;
//                     break;
//                 case 7:
//                     state.takeStage = needPlayers._7P;
//                     break;
//                 case 8:
//                 case 9:
//                 case 10:
//                     state.takeStage = needPlayers._8to10P;
//                     break;
//                 default:
//                     alert('error');
//             }
//             peers.forEach((i) => {
//                 playerData.push({
//                     nickname: i.nickname,
//                     role: '',
//                     vote: '',
//                     toGo: '',
//                     selected: false
//                 })
//             })
//             if (state.playerData.length >= 5) {
//                 const temp = [
//                     ...mustHaveRoles,
//                     ...expandRoles.slice(0, state.playerData.length - 5),
//                 ]
//                 // const roles = shuffle(temp);
//                 const roles = temp
//                 // eslint-disable-next-line array-callback-return
//                 state.playerData.map((user, index) => {
//                     user.role = roles[index];
//                 });
//                 // dispatch({type: "page", page}) 대체 할 만한 함수?
//                 state.page = MAIN_FRAME
//                 const nowTurnNickname = playerData[0].nickname
//                 const result = {...initialState, nowTurnNickname, playerData}
//                 sendDataToPeers(GAME, {game: AVALON, nickname, peers, data: result})
//                 return {...result, peers}
//             } else {
//                 alert('error')
//                 return null
//             }
//         }
//         case nextPage : {
//             const expedition = false
//             const angelCount = state.takeStage.filter(element => 'success' === element).length;
//             const evilCount = state.takeStage.filter(element => 'fail' === element).length;
//             if (angelCount === 3) {
//                 // const page = ASSASSIN_FRAME
//                 // dispatch({type: "page", page})
//                 state.page = ASSASSIN_FRAME
//             }
//             if (evilCount === 3) {
//                 const page = END_GAME_FRAME
//                 const winner = 'EVILS_WIN'
//                 // dispatch({type: "winner", winner})
//                 // dispatch({type: "page", page})
//                 state.winner = 'EVILS_WIN'
//                 state.page = END_GAME_FRAME
//
//             }
//             // dispatch({type: "expedition", expedition})
//             state.expedtion = false
//             state.vote = []
//             break
//         }
//         case votePage : {
//             let agree = 0;
//             let oppose = 0;
//             state.playerData.map(e => e.toGo === 'agree' ? ++agree : ++oppose)
//             if (agree >= oppose) {
//                 // const page = EXPEDITION_FRAME
//                 state.voteStage = 0;
//                 // dispatch({type: "page", page})
//                 state.page = EXPEDITION_FRAME
//             } else {
//                 // const page = MAIN_FRAME
//                 if (state.voteStage === 4) {
//                     state.takeStage[state.expeditionStage] = 'fail';
//                     state.expeditionStage += 1;
//                     state.voteStage = 0;
//                 } else {
//                     state.voteStage += 1;
//                 }
//                 // dispatch({type: "page", page})
//                 state.page = MAIN_FRAME
//
//             }
//             state.represent += 1;
//             state.represent %= state.playerData.length;
//             break
//             // nextPage()
//         }
//         case expeditionClick : {
//             // const expedition = true
//             // dispatch({type: "expedition", expedition})
//             state.expedtion = true
//             if (state.expeditionStage === 4 && state.playerData.length >= 7) {
//                 if (state.vote.filter(element => 'fail' === element).length >= 2) {
//                     state.takeStage[state.expeditionStage] = 'fail';
//                 } else {
//                     state.takeStage[state.expeditionStage] = 'success'
//                 }
//             } else {
//                 state.vote.includes('fail') ?
//                     state.takeStage[state.expeditionStage] = 'fail' :
//                     state.takeStage[state.expeditionStage] = 'success'
//             }
//             state.expeditionStage += 1;
//             break
//         }
//         case killPlayer : {
//             // const page = END_GAME_FRAME
//             state.winner = state.killedPlayer === 'merlin' ? '악의 승리' : '선의 승리'
//             state.page = END_GAME_FRAME
//             break
//             // dispatch({type: "winner", winner})
//             // dispatch({type: "page", page})
//         }
//         case "mainFrameClicked" :
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
//
// function AVALON_TEST() {
//     const user = useContext(PlayerContext)
//     const game = useContext(GameContext)
//     const [state, dispatch] = useReducer(reducer, initialState)
//
//     //플레이어들의 인원수 체크하여 역할 분배 및 원정 배열 생성
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
//             // const roles = shuffle(temp);
//             // eslint-disable-next-line array-callback-return
//             const roles = temp
//             user.map((user, index) => {
//                 user.role = roles[index];
//             });
//             dispatch({type: "page", page})
//             console.log(state.page)
//         } else {
//             alert('error')
//         }
//     };
//
//     //원정 갈 인원을 체크해주는 함수
//     const voteOnChange = e => {
//         user[e.target.value].selected = e.target.checked;
//         const playerCheckedNumber = e.target.checked ? 1 : -1
//         dispatch({type: "playerCheckedNumber", playerCheckedNumber})
//     }
//
//     //원정에 참여할 인원을 체크하고 인원수가 맞으면 찬반 투표로 넘억가게 하는 함수
//     const voteOnClick = () => {
//         if (state.playerCheckedNumber === game.takeStage[game.expeditionStage]) {
//             const voteCount = state.voteCount + 1
//             const page = VOTE_FRAME
//             dispatch({type: "voteCount", voteCount})
//             dispatch({type: "mainFrameClick"})
//             dispatch({type: "checkedReset"})
//             dispatch({type: "page", page})
//         } else {
//             alert(`${game.takeStage[game.expeditionStage]}명을 선택해야합니다.`);
//         }
//     }
//
//     //원정 보낼 인원 버튼 클릭시 MAIN_FRAME의 다른 화면을 보여주기 위한 버튼 함수
//     const mainFrameClicked = () => {
//         const mainFrameClick = true
//         dispatch({type: "mainFrameClick", mainFrameClick})
//     }
//     // 원정 대표자를 정할 찬반 투표 찬성시에 원정을 가며 , 반대시  메인 화면으로 다시 돌아감, 재투표 횟수 하나 차감 -> 모두 차감시 원정 실패이며 다음 원정으로 넘어감
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
//
//     //게임 종료 조건이 되었는지 확인해 주는 함수 조건 달성시 : if문 실행 , 그렇지 않은 경우 vote 초기화
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
//
//     //원정 성공 실패 확인
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
//     // 암살자가 죽일 사람 onChange
//     const assassinOnChange = e => {
//         const killedPlayer = e.target.value
//         dispatch({type: "kill", killedPlayer})
//     }
//     // 암살자가 멀린을 죽이면 악의 승리 그렇지 못하면 선의 승리
//     const killPlayer = () => {
//         const page = END_GAME_FRAME
//         const winner = state.killedPlayer === 'merlin' ? '악의 승리' : '선의 승리'
//         dispatch({type: "winner", winner})
//         dispatch({type: "page", page})
//     }
//
//
//     if (state.page === START_FRAME) {
//         return (
//             <button onClick={gameStart}>게임 시작</button>
//         )
//     }
//     if (state.page === MAIN_FRAME) {
//         return (
//             <>
//                 <div>Main</div>
//                 <TakeStage/>
//                 <VoteStage/>
//                 <PublicFrame>
//                     {!state.mainFrameClick ?
//                         user.map((user, index) => (
//                             <User key={index}>
//                                 <ul>
//                                     <li>{`nickname : ${user.nickname}`}</li>
//                                     <li>{`role : ${user.role}`}</li>
//                                     <br/>
//                                     {user.role === 'Merlin' ?
//                                         <MerlinPlayer index={index}/> : null
//                                     }
//                                     {user.role === 'Percival' ?
//                                         <PercivalPlayer index={index}/> : null
//                                     }
//                                 </ul>
//                                 {index === game.represent ?
//                                     <button onClick={mainFrameClicked}>원정 인원 정하기</button> : null}
//                             </User>
//                         )) :
//                         <div>
//                             {user.map((user, index) => (
//                                 <ul key={index}>
//                                     <label>{user.nickname}
//                                         <input
//                                             onChange={voteOnChange}
//                                             type="checkbox"
//                                             name={'checkbox'}
//                                             value={index}/>
//                                     </label>
//                                 </ul>
//                             ))}
//                             <button onClick={voteOnClick}>결정</button>
//                         </div>
//                     }
//                 </PublicFrame>
//             </>
//         );
//     }
//     if (state.page === VOTE_FRAME) {
//         let voteResult = true
//         return (
//             <div>
//                 <div>VOTE</div>
//                 {!state.voteResult ?
//                     <div>
//                         <Title>
//                             {user.map((user, index) => <Vote key={index} index={index}/>)}
//                         </Title>
//                         <button onClick={() => dispatch({type: "voteResult", voteResult})}>결과</button>
//                     </div> :
//                     <div>
//                         {voteResult = false}
//                         {
//                             user.map((user, index) => (
//                                 <ul key={index}>
//                                     <li>{`nickname : ${user.nickname}`}</li>
//                                     <li>{`vote : ${user.toGo === 'agree' ? '찬성' : '반대'}`}</li>
//                                 </ul>
//                             ))}
//                         <button onClick={() => ((votePage)(dispatch({type: "voteResult", voteResult})))}>다음</button>
//                     </div>
//                 }
//             </div>
//         )
//     }
//     if (state.page === EXPEDITION_FRAME) {
//         const page = MAIN_FRAME
//         return (
//             <>
//                 {!state.expedition ?
//                     <div>
//                         {
//                             user.map((user, index) => (
//                                 <ul key={index}>
//                                     {user.selected ?
//                                         <div>
//                                             <li>{user.nickname}</li>
//                                             {angels.includes(user.role) ?
//                                                 <AngelsVote value={index}/>
//                                                 :
//                                                 <EvilsVote value={index}/>}
//                                         </div>
//                                         : null}
//                                     {user.selected = false}
//                                 </ul>
//                             ))
//                         }
//                         <button onClick={expeditionClick}>Click</button>
//                     </div> :
//                     <div>
//                         {
//                             game.expeditionStage === 4 && user.length >= 7 ?
//                                 <div>
//                                     {game.vote.filter(element => 'fail' === element).length >= 2 ? '원정 실패' : '원정 성공'}
//                                     <div>성공 개수 : {game.vote.filter(element => 'success' === element).length}</div>
//                                     <div>실패 개수 :{game.vote.filter(element => 'fail' === element).length}</div>
//                                 </div> :
//                                 <div>
//                                     {game.vote.includes('fail') ? '원정 실패' : '원정 성공'}
//                                     <div>성공 개수 : {game.vote.filter(element => 'success' === element).length}</div>
//                                     <div>실패 개수 :{game.vote.filter(element => 'fail' === element).length}</div>
//                                 </div>
//                         }
//                         <button onClick={() => ((nextPage)(dispatch({type: "page", page})))}>다음</button>
//                     </div>
//                 }
//             </>
//         )
//     }
//     if (state.page === ASSASSIN_FRAME) {
//         return (
//             <>
//                 <h3>ASSASSIN</h3>
//                 {user.map((user, index) => (
//                     <label key={index}>
//                         {user.nickname}
//                         <input type="radio"
//                                name={'vote'}
//                                value={user.role}
//                                onChange={assassinOnChange}
//                         />
//                         <br/>
//                     </label>
//                 ))}
//                 <button onClick={killPlayer}>kill</button>
//             </>
//         )
//     }
//     if (state.page === END_GAME_FRAME) {
//         return (
//             <>
//                 <h1>{state.winner}</h1>
//                 <h3>ENDGAME</h3>
//                 <hr/>
//                 {user.map((player, index) => (
//                     <ul key={index}>
//                         <p>player_nickname : <b>{player.nickname}</b></p>
//                         <p>role : <b>{player.role}</b></p>
//                         <hr/>
//                     </ul>
//                 ))}
//             </>
//         )
//     }
//     return (
//         <div>
//             <h1>error</h1>
//         </div>
//     )
// }
//
// export default AVALON_TEST