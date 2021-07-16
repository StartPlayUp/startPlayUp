import React, {useContext} from "react";
import {GameContext} from "../Store";

function GameStart() {
    const game = useContext(GameContext)
    return (
        <button onClick={game.gameStart}>게임 시작</button>
    )

}

export default GameStart