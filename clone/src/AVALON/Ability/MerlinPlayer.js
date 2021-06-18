import React, {useContext} from "react";
import {UserState,merlinSight} from "../gameSetting";


function MerlinPlayer() {
    const userState = useContext(UserState)
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