import React, {useContext} from "react";
import {percivalSight, GameContext} from "../Store";


function PercivalPlayer() {
    const game = useContext(GameContext)
    return (
        <div>
            {
                game.gameState.usingPlayers.map((user, index) => (
                    <div key={index}>
                        {percivalSight.includes(user.role) ? user.nickname : null}
                    </div>
                ))
            }
        </div>
    )
}

export default PercivalPlayer