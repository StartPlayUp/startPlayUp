import React, {useContext} from "react";
import {GameContext, START_FRAME} from "../Store";
import {PeersContext} from "../../../../Routes/peerStore";

function GameStart() {
    const {dispatch, ...game} = useContext(GameContext)
    const {peers} = useContext(PeersContext)
    console.log(`dispatch : ${dispatch} , game : ${game}`)
    return (
        <div>
            <button onClick={()=>dispatch({type: START_FRAME,peers})}>게임 시작</button>
        </div>
    )
}

export default GameStart