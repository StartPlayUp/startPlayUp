import React, {useContext, useState} from "react";
import {GameContext} from "../Store";

function EvilsVote() {
    const game = useContext(GameContext)
    const [isClick, setIsClick] = useState(false);
    const onClick = e => {
        console.log(`${e.target.value}`)
        game.vote.push(e.target.value);
        setIsClick(true);
    }
    return (
        <div>
            <button onClick={onClick} value={'success'} disabled={isClick}>
                성공
            </button>
            <button onClick={onClick} value={'fail'} disabled={isClick}>
                실패
            </button>
        </div>
    )
}

export default (EvilsVote);