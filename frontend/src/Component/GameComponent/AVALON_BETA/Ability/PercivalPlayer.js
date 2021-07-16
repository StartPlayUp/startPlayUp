import React, {useContext} from "react";
import {PlayerContext, percivalSight} from "../Store";


function PercivalPlayer() {
    const player = useContext(PlayerContext)
    return (
        <div>
            {
                player.playerState.map((user, index) => (
                    <div key={index}>
                        {percivalSight.includes(user.role) ? user.nickname : null}
                    </div>
                ))
            }
        </div>
    )
}

export default PercivalPlayer