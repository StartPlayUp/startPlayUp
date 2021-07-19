// import React, {createContext} from "react";
// import { sendDataToPeers } from 'Common/peerModule/sendToPeers/index.js';
// import { GAME, AVALON } from 'Constants/peerDataTypes.js';
// export const initContext = createContext(initState)
export const GAME_CHECK = 'GAME_CHECK'
export const SET_COMPONENT = 'SET_COMPONENT'
export const START_FRAME = 'START_FRAME'
export const MAIN_VOTE_ONCLICK = 'MAIN_VOTE_ONCLICK'
export const VOTE_CHECK = 'VOTE_CHECK'
export const VOTE_ONCLICK = 'VOTE_ONCLICK'
export const VOTE_RESULT_CHECK = 'VOTE_RESULT_CHECK'
export const EXPEDITION_CLICK = 'EXPEDITION_CLICK'
export const ASSASSIN_KILL = 'ASSASSIN_KILL'

const reducer = (state, {type, ...action}) => {
    const nickname = localStorage.getItem('nickname');
    console.log('dispatch: ', state, type, action)
    switch (type) {
        // case UPDATE_TIMER: {
        //     return { ...state, peers: action.peers }
        // }
        // case GET_DATA_FROM_PEER: {
        //     const halted = !(nickname === action.data.nowTurnNickname)
        //     return { ...state, ...action.data, halted };
        // }
        // case UPDATE_TIMER:
        //     return { ...state, timer: state.timer + 1 };
        case SET_COMPONENT: {
            const result = {...state,component:action.component}
            console.log(`result : ${result}`)
            return result
        }
        case START_FRAME:
        case MAIN_VOTE_ONCLICK:
        case VOTE_CHECK :
        case VOTE_ONCLICK :
        case GAME_CHECK:
        case VOTE_RESULT_CHECK :
        case EXPEDITION_CLICK :
        case ASSASSIN_KILL :
            return {...state, ...action.gameArr}

        default :
            return state
    }
}
export default reducer