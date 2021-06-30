import React, {useContext} from "react";
import {VoteStageFrame, Circle} from "./Styled";
import {UserState,PlayState,voteStageColor} from "../gameSetting";

function VoteStage() {
    const gameState = useContext(PlayState)
    const colors = voteStageColor.slice(gameState.voteStage, 5);
    return (
        <VoteStageFrame>
            {
                colors.map((color, index) => (
                    <Circle color={color} key={index}/>
                ))
            }
        </VoteStageFrame>
    )
}

export default VoteStage;