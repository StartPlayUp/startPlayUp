import React, {useContext} from "react";
import {GameContext} from "../Store";
import {Pages} from "../MVC/AVALON_Reducer";

function EXPEDITION_RESULT() {
    const game = useContext(GameContext)
    const page = Pages.MAIN_FRAME
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
            <button onClick={()=>game.nextPage(page)}>다음</button>
        </div>
    )
}

export default EXPEDITION_RESULT