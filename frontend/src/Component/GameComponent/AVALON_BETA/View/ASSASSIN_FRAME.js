import React, {useContext} from "react";
import {GameContext} from "../Store";

function ASSASSIN_FRAME() {
    const game = useContext(GameContext)
    return (
        <>
            <h3>ASSASSIN</h3>
            {game.gameState.usingPlayers.map((user, index) => (
                <label key={index}>
                    {user.nickname}
                    <input type="radio"
                           name={'vote'}
                           value={user.role}
                           onChange={game.selectPlayer}
                    />
                    <br/>
                </label>
            ))}
            <button onClick={game.killPlayer}>kill</button>
        </>
    )
}

export default ASSASSIN_FRAME
