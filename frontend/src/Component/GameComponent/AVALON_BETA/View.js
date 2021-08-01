import React, {useContext} from "react";
import {
    GameContext,
    START_FRAME,
    FRAME_MAIN,
    MAIN_VOTE,
    VOTE_FRAME,
    VOTE_RESULT,
    EXPEDITION_RESULT,
    EXPEDITION_FRAME,
    ASSASSIN_FRAME,
    END_GAME_FRAME,
    WAITINGVIEW
} from "./Store";

import GameStart from "./View/GameStart";
import MAIN from "./View/MAIN_FRAME";
import RESULT_MAIN from "./View/MAIN_VOTE";
import VOTE from "./View/VOTE_FRAME";
import RESULT_VOTE from "./View/VOTE_RESULT";
import EXPEDITION from "./View/EXPEDITION_FRAME";
import RESULT_EXPEDITION from "./View/EXPEDITION_RESULT";
import ASSASSIN from "./View/ASSASSIN_FRAME";
import END_GAME from "./View/END_GAME_FRAME";
import WaitingView from "./View/animation/WaitingView";

function View() {
    const {gameState} = useContext(GameContext)
    return (
        <>
            {gameState.component === START_FRAME && <GameStart/>}
            {gameState.component === FRAME_MAIN && <MAIN/>}
            {gameState.component === MAIN_VOTE && <RESULT_MAIN/>}
            {gameState.component === VOTE_FRAME && <VOTE/>}
            {gameState.component === VOTE_RESULT && <RESULT_VOTE/>}
            {gameState.component === EXPEDITION_FRAME && <EXPEDITION/>}
            {gameState.component === EXPEDITION_RESULT && <RESULT_EXPEDITION/>}
            {gameState.component === ASSASSIN_FRAME && <ASSASSIN/>}
            {gameState.component === END_GAME_FRAME && <END_GAME/>}
            {gameState.component === WAITINGVIEW && <WaitingView/>}
        </>
    )
}

export default View