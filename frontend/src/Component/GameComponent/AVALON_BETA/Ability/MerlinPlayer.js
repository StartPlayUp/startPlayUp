import React, {useContext} from "react";
import {GameContext, merlinSight} from "../Store";

function MerlinPlayer() {
    const game = useContext(GameContext)
    return (
        <div>
            {
                game.gameState.usingPlayers.map((user, index) => (
                    <div key={index}>
                        {merlinSight.includes(user.role) ? user.nickname : null}
                    </div>
                ))
            }
        </div>
    )
}

export default MerlinPlayer;