import React, {useContext} from "react";
import {GameContext, VOTE_RESULT} from "../Store";
import {Title} from "../Styled";
import Vote from "./Vote";
import {SET_COMPONENT} from "../MVC/AVALON_Reducer";

function VOTE_FRAME() {
    const {gameState, dispatch} = useContext(GameContext)
    return (
        <>
            <div>VOTE</div>
            <div>
                <Title>
                    {gameState.usingPlayers.map((user, index) =>
                        <Vote key={index} index={index}/>)}
                </Title>
                <button onClick={() => dispatch({type: SET_COMPONENT,component:VOTE_RESULT})}>투표 결과</button>
            </div>
        </>
    )
}

export default VOTE_FRAME