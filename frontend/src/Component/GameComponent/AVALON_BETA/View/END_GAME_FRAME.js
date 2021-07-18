import React, {useContext} from "react";
import {GameContext} from "../Store";

function END_GAME_FRAME() {
    const game = useContext(GameContext)
    return (
        <>
            <h1>{game.gameState.winner}</h1>
            <h3>ENDGAME</h3>
            <hr/>
            {game.gameState.map((player, index) => (
                <ul key={index}>
                    <p>player_nickname : <b>{player.nickname}</b></p>
                    <p>role : <b>{player.role}</b></p>
                    <hr/>
                </ul>
            ))}
        </>
    )
}

export default END_GAME_FRAME