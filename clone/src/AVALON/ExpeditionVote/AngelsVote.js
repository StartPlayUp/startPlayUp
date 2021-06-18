import React, {useContext, useState} from "react";
import {UserState,PlayState} from "../gameSetting";

function AngelsVote() {
    const gameState = useContext(PlayState)
    const [isClick,setIsClick] = useState(false);
    const onClick = e =>{
        gameState.vote.push(e.target.value);
        setIsClick(true);
    }
    return(
        <div>
            <button onClick={onClick} value={'success'} disabled={isClick}>
                성공
            </button>
        </div>
    )
}

export default AngelsVote;