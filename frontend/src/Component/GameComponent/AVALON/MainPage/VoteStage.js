import React, {useContext} from "react";
import {VoteStageFrame, Circle} from "./Styled";
import {GameContext,PlayerContext,voteStageColor} from "../Store";
function VoteStage() {
    const gameState = useContext(GameContext)
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