import React, {useContext} from "react";
import {GameContext} from "../Store";

function GameStart() {
    const {dispatch, ...game} = useContext(GameContext)
    console.log(`dispatch : ${dispatch} , game : ${game}`)
    return (
        <div>
            <button onClick={game.gameStart}>게임 시작</button>
        </div>
    )
}

export default GameStart