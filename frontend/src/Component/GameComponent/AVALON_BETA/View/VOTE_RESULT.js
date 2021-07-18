import React, {useContext} from "react";
import {GameContext} from "../Store";
import {Pages} from "../MVC/AVALON_Reducer";
function VOTE_RESULT() {
    const game = useContext(GameContext)
    return (
        <div>
            {game.gameState.usingPlayers.map((user, index) => (
                <ul key={index}>
                    <li>{`nickname : ${user.nickname}`}</li>
                    <li>{`vote : ${user.toGo === 'agree' ? '찬성' : '반대'}`}</li>
                </ul>
            ))}
            <button onClick={()=>game.votePage(Pages.EXPEDITION_FRAME)}>다음</button>
        </div>
    )
}

export default VOTE_RESULT