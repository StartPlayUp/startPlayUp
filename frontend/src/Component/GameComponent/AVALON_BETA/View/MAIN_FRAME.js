import React, {useContext} from "react";
import {GameContext, MAIN_VOTE, voteStageColor} from "../Store";
import {Circle, Frame, PublicFrame, User, VoteStageFrame} from "../Styled";
import MerlinPlayer from "../Ability/MerlinPlayer";
import PercivalPlayer from "../Ability/PercivalPlayer";

function MAIN_FRAME() {
    const game = useContext(GameContext)
    const colors = voteStageColor.slice(game.gameState.voteStage, 5);
    console.log(game.gameState)
    return (
        <>
            <div>Main</div>
            <PublicFrame>
                {
                    game.gameState.takeStage.map((stage, index) => (
                        <Frame key={index}>
                            <h3>{stage}</h3>
                        </Frame>
                    ))
                }
            </PublicFrame>
            <VoteStageFrame>
                {
                    colors.map((color, index) => (
                        <Circle color={color} key={index}/>
                    ))
                }
            </VoteStageFrame>
            <PublicFrame>
                {
                    game.gameState.usingPlayers.map((user, index) => (
                        <User key={index}>
                            <ul>
                                <li>{`nickname : ${user.nickname}`}</li>
                                <li>{`role : ${user.role}`}</li>
                                <br/>
                                {user.role === 'Merlin' ?
                                    <MerlinPlayer index={index}/> : null
                                }
                                {user.role === 'Percival' ?
                                    <PercivalPlayer index={index}/> : null
                                }
                            </ul>
                            {index === game.gameState.represent ?
                                <button onClick={() => game.setComponent(MAIN_VOTE)}>원정 인원 정하기</button>
                                : null}
                        </User>
                    ))
                }
            </PublicFrame>
        </>
    );
}

export default MAIN_FRAME