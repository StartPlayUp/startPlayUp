import React from "react";
import {gameStart} from '../AVALON_TEST'
function StartView() {
    return (
        <button onClick={gameStart}>게임 시작</button>
    )
}

export default StartView