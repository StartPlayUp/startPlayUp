import React, {useContext} from "react";
import {PublicFrame, Frame} from "./Styled";
import {UserState,PlayState} from "../gameSetting";

function ExpeditionStage() {
    const gameState = useContext(PlayState);
    return (
        <PublicFrame>
            {
                gameState.takeStage.map((stage, index) => (
                    <Frame key={index}>
                        {stage}
                    </Frame>
                ))
            }
        </PublicFrame>
    )
}

export default ExpeditionStage