import React, {useContext} from "react";
import {GameContext, MAIN_VOTE, voteStageColor} from "../Store";
import {Circle, Frame, PublicFrame, User, VoteStageFrame} from "../Styled";
import MerlinPlayer from "../Ability/MerlinPlayer";
import PercivalPlayer from "../Ability/PercivalPlayer";
import {SET_COMPONENT} from "../MVC/AVALON_Reducer";

function MAIN_FRAME() {
    const {gameState, dispatch} = useContext(GameContext)
    const colors = voteStageColor.slice(gameState.voteStage, 5);
    return (
        <>
            <div>Main</div>
            <PublicFrame>
                {
                    gameState.takeStage.map((stage, index) => (
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
                    gameState.usingPlayers.map((user, index) => (
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
                            {index === gameState.represent ?
                                <button onClick={() => dispatch({type: SET_COMPONENT, component: MAIN_VOTE})}>원정 인원
                                    정하기</button>
                                : null}
                        </User>
                    ))
                }
            </PublicFrame>
        </>
    );
}

export default MAIN_FRAME