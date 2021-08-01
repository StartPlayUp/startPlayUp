import React, {useContext} from "react";
import {GameContext, START_FRAME} from "../Store";

function GameStart() {
    const {dispatch, ...game} = useContext(GameContext);
    console.log(`dispatch : ${dispatch} , game : ${game}`);
    return (
        <div>
            <button onClick={() => dispatch({type: START_FRAME})}>게임 시작</button>
        </div>
    );
}

export default GameStart;
