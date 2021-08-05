import React, {useContext, useState} from "react";
import {GameContext} from "../Store";
import {SuccessImage} from "../Styled";

function AngelsVote() {
    const game = useContext(GameContext);
    const [isClick, setIsClick] = useState(false);
    const onClick = (e) => {
        console.log("성공");
        game.gameState.vote.push(e.target.value);
        setIsClick(true);
    };
    return (
        !isClick ?
            <SuccessImage onClick={onClick} value={"success"} disabled={isClick}/>
            : <h1>투표 완료 !</h1>
    );
}

export default AngelsVote;
