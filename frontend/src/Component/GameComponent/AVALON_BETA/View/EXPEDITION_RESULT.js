import React, {useContext} from "react";
import {GAME} from "../../../../Constants/peerDataTypes";
import {GameContext, PlayerContext} from "../Store";

function EXPEDITION_RESULT() {
    const game = useContext(GameContext)
    const player = useContext(PlayerContext)
    return (
        <div>
            <div>
                {
                    game.expeditionStage === 4 && player.playerState.length >= 7 ?
                        <div>
                            {game.vote.filter(element => 'fail' === element).length >= 2 ? '원정 실패' : '원정 성공'}
                            <div>성공 개수 : {game.vote.filter(element => 'success' === element).length}</div>
                            <div>실패 개수 :{game.vote.filter(element => 'fail' === element).length}</div>
                        </div> :
                        <div>
                            {game.vote.includes('fail') ? '원정 실패' : '원정 성공'}
                            <div>성공 개수 : {game.vote.filter(element => 'success' === element).length}</div>
                            <div>실패 개수 :{game.vote.filter(element => 'fail' === element).length}</div>
                        </div>
                }
            </div>
            <button onClick={() => game.nextPage}>다음</button>
        </div>
    )
}

export default EXPEDITION_RESULT