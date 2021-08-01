import React, {useContext} from "react";
import {GameContext, FRAME_MAIN} from "../Store";
import {SET_COMPONENT} from "../MVC/AVALON_Reducer";

function EXPEDITION_RESULT() {
    const {gameState, dispatch} = useContext(GameContext);
    return (
        <div>
            <div>
                {gameState.expeditionStage === 4 &&
                gameState.usingPlayers.length >= 7 ? (
                    <div>
                        {gameState.vote.filter((element) => "fail" === element).length >= 2
                            ? "원정 실패"
                            : "원정 성공"}
                        <div>
                            성공 개수 :{" "}
                            {gameState.vote.filter((element) => "success" === element).length}
                        </div>
                        <div>
                            실패 개수 :
                            {gameState.vote.filter((element) => "fail" === element).length}
                        </div>
                    </div>
                ) : (
                    <div>
                        {gameState.vote.includes("fail") ? "원정 실패" : "원정 성공"}
                        <div>
                            성공 개수 :{" "}
                            {gameState.vote.filter((element) => "success" === element).length}
                        </div>
                        <div>
                            실패 개수 :
                            {gameState.vote.filter((element) => "fail" === element).length}
                        </div>
                    </div>
                )}
            </div>
            <button
                onClick={() => dispatch({type: SET_COMPONENT, component: FRAME_MAIN})}
            >
                다음
            </button>

        </div>
    );
}

export default EXPEDITION_RESULT;
