import React, {useContext} from "react";
import {GameContext,PlayerContext,percivalSight} from "../Store";


function PercivalPlayer() {
    const userState = useContext(PlayerContext)
    return (
        <div>
            {
                userState.map((user, index) => (
                    <div key={index}>
                        {percivalSight.includes(user.role) ? user.nickname : null}
                    </div>
                ))
            }
        </div>
    )
}

export default PercivalPlayer