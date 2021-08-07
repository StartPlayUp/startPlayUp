import {
    GET_DATA_FROM_PEER,
    THROW_YUT,
    START_GAME,
    UPDATE_GOAL,
    SELECT_HORSE,
    MOVE_FIRST_HORSE,
    MOVE_HORSE,
    NEXT_TURN,
    PLAY_AI,
    DESELECT_HORSE
} from 'Container/GameContainer/Yut/Constants/yutActionType';

export const reducer = (state, { type, ...action }) => {
    const nickname = localStorage.getItem('nickname');
    switch (type) {
        case GET_DATA_FROM_PEER: {
            let halted = true;
            if (action.state.nowTurn.nickname === nickname) {
                halted = false;
            }
            return { ...state, ...action.state, halted };
        };
        case THROW_YUT: {
            console.log("THROW_YUT : ", action.state)
            return { ...action.state };
        }
        case START_GAME:
        case UPDATE_GOAL:
        case SELECT_HORSE:
        case MOVE_FIRST_HORSE:
        case MOVE_HORSE:
        case NEXT_TURN:
        case PLAY_AI: {
            return { ...action.state };
        }
        // case UPDATE_TIMER:
        //     return { ...state, timer: state.timer + 1 };
        // case STOP_TIMER:
        //     return { ...state, halted: true };
        case DESELECT_HORSE: {
            return { ...state, selectHorse: -1, placeToMove: {} };
        }
        // case INIT_LAST_YUT_DATA: {
        //     console.log("INIT_LAST_YUT_DATA")
        //     return { ...state, lastYutData: [20, 20, 20, 20] };
        // }
        // case UPDATE_STATE:
        //     return { ...state, ...action.state }
        default:
            return state;
    }
}