import reducerAction from '../Reducer/reducerAction';
import { sendDataToPeers } from 'Common/peerModule/sendToPeers';
import { GAME, YUT } from 'Constants/peerDataTypes';
import {
    START_GAME,
    THROW_YUT,
    UPDATE_GOAL,
    SELECT_HORSE,
    MOVE_FIRST_HORSE,
    MOVE_HORSE,
    NEXT_TURN,
    PLAY_AI,
} from '../Constants/actionType';


const startGameHandler = ({ dispatch, state, peers, nickname }) => {
    if (typeof (dispatch) === "function"
        && typeof (state) === "object"
        && typeof (peers) === "object"
        && typeof (nickname) === "string") {
        const newState = reducerAction.START_GAME(peers);
        dispatch({ type: START_GAME, state: newState });
        sendDataToPeers(GAME, { nickname, peers, game: YUT, data: newState });
    } else {
        console.error("startGameHandler");
        console.log(typeof (dispatch) === "function"
            , typeof (state) === "object"
            , typeof (peers) === "object"
            , typeof (nickname) === "string");
        console.log(typeof (dispatch))
    }
}

const throwYutHandler = ({ dispatch, state, peers, nickname, count }) => {
    if (typeof (dispatch) === "function"
        && typeof (state) === "object"
        && typeof (peers) === "object"
        && typeof (nickname) === "string"
        && typeof (count) === "number") {
        const newState = reducerAction.THROW_YUT(state, count);
        console.log("left dispatch lastYutData :", state.lastYutData);
        dispatch({ type: THROW_YUT, state: newState });
        sendDataToPeers(GAME, { nickname, peers, game: YUT, data: newState });
    }
    else {
        console.log(count)
        console.error("throwYutHandler");
    }
}

const updateGoalHandler = ({ dispatch, state, peers, nickname }) => {
    if (typeof (dispatch) === "function"
        && typeof (state) === "object"
        && typeof (peers) === "object"
        && typeof (nickname) === "string") {
        const newState = reducerAction.UPDATE_GOAL(state);
        dispatch({ type: UPDATE_GOAL, state: newState });
        sendDataToPeers(GAME, { nickname, peers, game: YUT, data: newState });
    }
    else {
        console.error("updateGoalHandler");
    }
}

const selectHorseHandler = ({ dispatch, state, peers, index, nickname }) => {
    if (typeof (dispatch) === "function"
        && typeof (state) === "object"
        && typeof (peers) === "object"
        && typeof (nickname) === "string"
        && typeof (index) === "number") {

        const [newState, success] = reducerAction.SELECT_HORSE(state, index);
        if (success) {
            dispatch({ type: SELECT_HORSE, state: newState });
            // 말이 갈수 있는 위치를 상대에게 보내야 하는가?
            // sendDataToPeers(GAME, { nickname, peers, game: YUT, data: newState });
        }
        else {
            alert("현재 턴의 말이 아닙니다.");
        }
    }
    else {
        console.error("selectHorseHandler");
    }
}



const moveFirstHorseHandler = ({ dispatch, state, peers, nickname, index }) => {
    if (typeof (dispatch) === "function"
        && typeof (state) === "object"
        && typeof (peers) === "object"
        && typeof (nickname) === "string"
        && typeof (index) === "number") {
        const [newState, success] = reducerAction.MOVE_FIRST_HORSE(state, index);
        if (success) {
            dispatch({ type: MOVE_FIRST_HORSE, state: newState });
            sendDataToPeers(GAME, { nickname, peers, game: YUT, data: newState });
        }
        else {
            alert("본인 차례가 아닙니다.")
        }

    }
    else {
        console.error("moveFirstHorseHandler");
    }
}



const moveHorseHandler = ({ dispatch, state, peers, nickname, index }) => {
    if (typeof (dispatch) === "function"
        && typeof (state) === "object"
        && typeof (peers) === "object"
        && typeof (nickname) === "string"
        && typeof (index) === "number") {

        const [newState, success] = reducerAction.MOVE_HORSE(state, index);
        if (success) {
            dispatch({ type: MOVE_HORSE, state: newState });
            sendDataToPeers(GAME, { nickname, peers, game: YUT, data: newState });
        }
        else {
            alert("본인 차례가 아닙니다.");
        }
    }
    else {
        console.error("moveHorseHandler");
    }
}



const nextTurnHandler = ({ dispatch, state, peers, nickname }) => {
    if (typeof (dispatch) === "function"
        && typeof (state) === "object"
        && typeof (peers) === "object"
        && typeof (nickname) === "string") {
        const [newState, success] = reducerAction.NEXT_TURN(state);
        if (success) {
            dispatch({ type: NEXT_TURN, state: newState });
            sendDataToPeers(GAME, { nickname, peers, game: YUT, data: newState });
        }
        else {
            alert("본인 차례가 아닙니다.");
        }
    }
    else {
        console.error("nextTurnHandler error");

    }
}

const playAiHandler = ({ dispatch, state, peers, nickname }) => {
    console.log(dispatch, state, peers)
    if (typeof (dispatch) === "function"
        && typeof (state) === "object"
        && typeof (peers) === "object"
        && typeof (nickname) === "string") {
        const newState = reducerAction.PLAY_AI(state);
        dispatch({ type: PLAY_AI, state: newState });
        sendDataToPeers(GAME, { nickname, peers, game: YUT, data: newState });
    }
    else {
        console.error("playAiHandler");
    }
}


const InitlastYutDataHandler = ({ dispatch, state, peers, nickname }) => {
    console.log(dispatch, state, peers)
    if (typeof (dispatch) === "function"
        && typeof (state) === "object"
        && typeof (peers) === "object"
        && typeof (nickname) === "string") {
        const newState = { ...state, lastYutData: [1, 1, 1, 1] }
        dispatch({ type: INIT_LAST_YUT_DATA, state: newState });
        sendDataToPeers(GAME, { nickname, peers, game: YUT, data: newState });
    }
    else {
        console.error("playAiHandler");
    }
}

export default {
    nextTurnHandler,
    startGameHandler,
    throwYutHandler,
    updateGoalHandler,
    selectHorseHandler,
    moveFirstHorseHandler,
    moveHorseHandler,
    playAiHandler,
    InitlastYutDataHandler
}
