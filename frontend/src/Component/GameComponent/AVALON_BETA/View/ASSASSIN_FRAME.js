import React, {useContext} from "react";
import {GameContext, PlayerContext} from "../Store";

function ASSASSIN_FRAME() {
    const player = useContext(PlayerContext)
    const game = useContext(GameContext)
    return (
        <>
            <h3>ASSASSIN</h3>
            {player.playerState.map((user, index) => (
                <label key={index}>
                    {user.nickname}
                    <input type="radio"
                           name={'vote'}
                           value={user.role}
                           onChange={() => game.selectPlayer}
                    />
                    <br/>
                </label>
            ))}
            <button onClick={() => game.killPlayer}>kill</button>
        </>
    )
}

export default ASSASSIN_FRAME
