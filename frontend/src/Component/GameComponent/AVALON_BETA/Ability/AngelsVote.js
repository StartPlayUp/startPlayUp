import React, {useContext, useState} from "react";
import {GameContext} from "../Store";

function AngelsVote() {
    const game = useContext(GameContext)
    const [isClick,setIsClick] = useState(false);
    const onClick = e =>{
        console.log('성공')
        game.vote.push(e.target.value);
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