import React, {useContext} from "react";
import {GameContext, FRAME_MAIN} from "../Store";

function EXPEDITION_RESULT() {
    const game = useContext(GameContext)
    return (
        <div>
            <div>
                {
                    game.gameState.expeditionStage === 4 && game.gameState.usingPlayers.length >= 7 ?
                        <div>
                            {game.gameState.vote.filter(element => 'fail' === element).length >= 2 ? '원정 실패' : '원정 성공'}
                            <div>성공 개수 : {game.gameState.vote.filter(element => 'success' === element).length}</div>
                            <div>실패 개수 :{game.gameState.vote.filter(element => 'fail' === element).length}</div>
                        </div> :
                        <div>
                            {game.gameState.vote.includes('fail') ? '원정 실패' : '원정 성공'}
                            <div>성공 개수 : {game.gameState.vote.filter(element => 'success' === element).length}</div>
                            <div>실패 개수 :{game.gameState.vote.filter(element => 'fail' === element).length}</div>
                        </div>
                }
            </div>
            <button onClick={() => game.setComponent(FRAME_MAIN)}>다음</button>
        </div>
    )
}

export default EXPEDITION_RESULT