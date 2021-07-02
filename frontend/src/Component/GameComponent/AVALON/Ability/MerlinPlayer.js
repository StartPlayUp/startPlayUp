import React, {useContext} from "react";
import {GameContext,PlayerContext,merlinSight} from "../gameSetting";

function MerlinPlayer() {
    const userState = useContext(PlayerContext)
    return(
        <div>
            {
                userState.map((user,index)=>(
                    <div key={index}>
                        {merlinSight.includes(user.role) ? user.nickname : null}
                    </div>
                ))
            }
        </div>
    )
}

export default MerlinPlayer;