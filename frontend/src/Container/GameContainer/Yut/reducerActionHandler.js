import { MOVE_FIRST_HORSE, MOVE_HORSE, NEXT_TURN, SELECT_HORSE, START_GAME, THROW_YUT, UPDATE_GOAL, UPDATE_STATE } from './yutReducerType.js';
import reducerAction from './reducerAction';
import { sendDataToPeers } from 'Common/peerModule/sendToPeers'
import { GAME, YUT } from 'Constants/peerDataTypes'

const nextTurnHandler = ({ dispatch, state, peers }) => {
    const nickname = localStorage.getItem('nickname');
    const newState = reducerAction.NEXT_TURN(state);
    dispatch({ type: UPDATE_STATE, newState });
    sendDataToPeers(GAME, { nickname, peers, game: YUT, data: newState });
}

const startGameHandler = ({ dispatch, peers }) => {
    const nickname = localStorage.getItem('nickname');
    const newState = reducerAction.START_GAME(peers);
    dispatch({ type: UPDATE_STATE, state: newState });
    sendDataToPeers(GAME, { nickname, peers, game: YUT, data: newState });
}

const throwYutHandler = ({ dispatch, state, peers }) => {
    const nickname = localStorage.getItem('nickname');
    const newState = reducerAction.THROW_YUT(state);
    dispatch({ type: UPDATE_STATE, state: newState });
    sendDataToPeers(GAME, { nickname, peers, game: YUT, data: newState });
}

const updateGoalHandler = ({ dispatch, state, peers }) => {
    const nickname = localStorage.getItem('nickname');
    const newState = reducerAction.UPDATE_GOAL(state, action);
    dispatch({ type: UPDATE_STATE, state: newState });
    sendDataToPeers(GAME, { nickname, peers, game: YUT, data: newState });
}

const selectHorseHandler = ({ dispatch, state, peers, index }) => {
    const nickname = localStorage.getItem('nickname');
    console.log("selectHorseHandler : ", dispatch, state, peers, index);
    const newState = reducerAction.SELECT_HORSE(state, index);
    dispatch({ type: UPDATE_STATE, state: newState });
    sendDataToPeers(GAME, { nickname, peers, game: YUT, data: newState });
}

const moveFirstHorseHandler = ({ dispatch, state, peers, index }) => {
    const nickname = localStorage.getItem('nickname');
    const newState = reducerAction.MOVE_FIRST_HORSE(state, index);
    dispatch({ type: UPDATE_STATE, state: newState });
    sendDataToPeers(GAME, { nickname, peers, game: YUT, data: newState });
}

const moveHorseHandler = ({ dispatch, state, peers, index }) => {
    const nickname = localStorage.getItem('nickname');
    const newState = reducerAction.MOVE_HORSE(state, index);
    dispatch({ type: UPDATE_STATE, state: newState });
    sendDataToPeers(GAME, { nickname, peers, game: YUT, data: newState });
}



export default { nextTurnHandler, startGameHandler, throwYutHandler, updateGoalHandler, selectHorseHandler, moveFirstHorseHandler, moveHorseHandler }



const a = () =>{
    const nickname = localStorage.getItem('nickname');    
    

}