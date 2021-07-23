import React, {useContext} from "react";
import {GameContext, MAIN_VOTE, voteStageColor} from "../Store";
import {Circle, Frame, PublicFrame, User, VoteStageFrame} from "../Styled";
import MerlinPlayer from "../Ability/MerlinPlayer";
import PercivalPlayer from "../Ability/PercivalPlayer";
import {SET_COMPONENT} from "../MVC/AVALON_Reducer";

function MAIN_FRAME() {
    const {gameState, dispatch} = useContext(GameContext)
    const nickname = localStorage.getItem('nickname')
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
                        <User key-={index}>
                            <ul>
                                <li>{`nickname : ${user.nickname}`}</li>
                            </ul>
                        </User>
                    ))
                }
            </PublicFrame>
            {
                gameState.usingPlayers.map((user, index) => (
                    user.nickname === nickname && <User key={index}>
                        <ul>
                            <li>{`nickname : ${user.nickname}`}</li>
                            <li>{`role : ${user.role}`}</li>
                            {user.role === 'Merlin' ?
                                <div>
                                    <h3>EVILS_LIST</h3>
                                    <MerlinPlayer index={index}/>
                                </div> : null
                            }
                            {user.role === 'Percival' ?
                                <div>
                                    <h3>둘 중에 멀린을 찾아 도우세요.</h3>
                                    <PercivalPlayer index={index}/>
                                </div> : null
                            }
                        </ul>
                        {index === gameState.represent ?
                            <button onClick={() => dispatch({type: SET_COMPONENT, component: MAIN_VOTE})}>원정 인원
                                정하기</button>
                            : null}
                    </User>
                ))
            }
        </>
    );
}

export default MAIN_FRAME