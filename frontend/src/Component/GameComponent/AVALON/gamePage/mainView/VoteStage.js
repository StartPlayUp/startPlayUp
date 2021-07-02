import React, {useContext} from "react";
import {Circle, VoteStageFrame} from "../../MainPage/Styled";
import {GameContext, voteStageColor} from "../../gameSetting";

function VoteStage() {
    const game = useContext(GameContext)
    const colors = voteStageColor.slice(game.voteStage, 5);
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

export default VoteStage