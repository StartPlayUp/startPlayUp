import React, {useContext} from "react";
import {merlinSight, PlayerContext} from "../Store";
function MerlinPlayer() {
    const player = useContext(PlayerContext)
    return(
        <div>
            {
                player.playerState.map((user,index)=>(
                    <div key={index}>
                        {merlinSight.includes(user.role) ? user.nickname : null}
                    </div>
                ))
            }
        </div>
    )
}

export default MerlinPlayer;