// import shuffle from "lodash.shuffle";
// import {expandRoles, mustHaveRoles, needPlayers} from "../AVALON_BACKUP/gameSetting";
// import {useReducer} from "react";
// import {func, initContext, Pages, reducer} from "./AVALON_BETA_Reducer";
//
// export const GameStart = () => {
//     const [state, dispatch] = useReducer(reducer, initContext)
//     let takeStage = 0
//     const players = state.playerData.length
//     switch (players) {
//         case 5 :
//             takeStage = needPlayers._5P;
//             break;
//         case 6:
//             takeStage = needPlayers._6P;
//             break;
//         case 7:
//             takeStage = needPlayers._7P;
//             break;
//         case 8:
//         case 9:
//         case 10:
//             takeStage = needPlayers._8to10P;
//             break;
//         default:
//             alert('error');
//     }
//     const PlayersNumber = state.playerData.length;
//     if (PlayersNumber >= 5) {
//         const temp = [
//             ...mustHaveRoles,
//             ...expandRoles.slice(0, PlayersNumber - 5),
//         ];
//         const roles = shuffle(temp);
//         const result = {takeStage: takeStage, roles: roles, page: Pages.MAIN_FRAME}
//         dispatch({type: func.gameStart, result})
//     } else {
//         alert('error')
//     }
// };
// export const SetPage = (pages) => {
//     const [state, dispatch] = useReducer(reducer, initContext);
//     dispatch({type: func.setPage, page: pages})
// }
// export const VoteOnChange = e => {
//     const [state, dispatch] = useReducer(reducer, initContext)
//     const playerCount = e.target.checked ? 1 : -1
//     const index = e.target.value
//     const checked = e.target.checked
//     dispatch({type: func.voteOnChange, index: index, playerCount: playerCount, checked: checked})
// }
// export const VoteOnClick = () => {
//     const [state, dispatch] = useReducer(reducer, initContext)
//     if (state.playerCount === state.takeStage[state.expeditionStage]) {
//         const voteCount = state.voteCount + 1
//         const playerCount = 0
//         const page = Pages.VOTE_FRAME
//         dispatch({type: func.voteOnClick, voteCount: voteCount, playerCount: playerCount, page: page})
//     } else {
//         alert(`${state.takeStage[state.expeditionStage]}명을 선택해야합니다.`);
//     }
// }
// export const VotePage = () => {
//     const [state, dispatch] = useReducer(reducer, initContext)
//     const agree = state.playerData.filter(element => 'agree' === element).length
//     const oppose = state.playerData.filter(element => 'oppose' === element).length
//     let expeditionStage, index = state.expeditionStage
//     let page = ''
//     let voteStage = 0
//     const takeStageFail = 'fail'
//
//     if (agree >= oppose) {
//         voteStage = 0
//         page = Pages.EXPEDITION_FRAME
//     } else {
//         if (state.voteStage === 4) {
//             expeditionStage = state.expeditionStage + 1
//             voteStage = 0
//         } else {
//             // state.voteStage += 1;
//             voteStage = state.voteStage + 1
//         }
//         page = Pages.MAIN_FRAME
//     }
//     const represent = (state.represent + 1) % state.playerData.length
//     NextPage()
//     dispatch({
//         type: func.votePage,
//         index: index,
//         page: page,
//         voteStage: voteStage,
//         expeditionStage: expeditionStage,
//         takeStageFail: takeStageFail,
//         represent: represent
//     })
// }
// export const NextPage = () => {
//     const [state, dispatch] = useReducer(reducer, initContext)
//     const angelCount = state.takeStage.filter(element => 'success' === element).length;
//     const evilCount = state.takeStage.filter(element => 'fail' === element).length;
//     let page = ''
//     const winner = 'EVILS_WIN'
//     if (angelCount === 3) {
//         page = Pages.ASSASSIN_FRAME
//     }
//     if (evilCount === 3) {
//         page = Pages.END_GAME_FRAME
//     }
//     const vote = []
//     dispatch({
//         type: func.nextPage,
//         vote: vote,
//         page: page,
//         winner: winner
//     })
//
// }
// export const ExpeditionClick = () => {
//     const [state, dispatch] = useReducer(reducer, initContext)
//     let value = ''
//     if (state.expeditionStage === 4 && state.playerData.length >= 7) {
//         if (state.vote.filter(element => 'fail' === element).length >= 2) {
//             state.takeStage[state.expeditionStage] = 'fail';
//             value = 'fail'
//         } else {
//             state.takeStage[state.expeditionStage] = 'success'
//             value = 'success'
//         }
//     } else {
//         state.vote.includes('fail') ?
//             value = 'fail' :
//             value = 'success'
//     }
//     const expeditionStage = state.expeditionStage
//     const nextExpeditionStage = state.expeditionStage + 1
//     dispatch({
//         type: func.expeditionClick,
//         value: value,
//         expeditionStage: expeditionStage,
//         nextExpeditionStage: nextExpeditionStage
//     })
// }
// export const KillPlayer = () => {
//     const [state, dispatch] = useReducer(reducer, initContext)
//     const targetPlayer = SelectPlayer.toString()
//     const winner = targetPlayer === 'Merlin' ? 'ANGELS_WIN' : 'EVILS_WIN'
//     dispatch({type: func.killPlayer, winner: winner, page: Pages.END_GAME_FRAME})
// }
// export const SelectPlayer = e => {
//     return e.target.value
// }
// export default {
//     GameStart,
// }