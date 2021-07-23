import React, {useContext} from "react";
import {GameContext} from "../Store";
import {VOTE_CHECK} from "../MVC/AVALON_Reducer";
import {PeersContext} from "../../../../Routes/peerStore";

function VOTE_RESULT() {
    const {gameState, dispatch} = useContext(GameContext)
    const peers = useContext(PeersContext)
    console.log(gameState)
    return (
        <div>
            {gameState.usingPlayers.map((user, index) => (
                <ul key={index}>
                    <li>{`nickname : ${user.nickname}`}</li>
                    <li>{`vote : ${user.toGo === 'agree' ? '찬성' : '반대'}`}</li>
                </ul>
            ))}
            <button onClick={() => dispatch({type: VOTE_CHECK, peers})}>다음</button>
        </div>
    )
}

export default VOTE_RESULT