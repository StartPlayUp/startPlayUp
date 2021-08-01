import React, {useContext} from "react";
import {GameContext, START_FRAME, WAITINGVIEW} from "../Store";
import {PeersContext} from "../../../../Routes/peerStore";
import {SET_COMPONENT} from "../MVC/AVALON_Reducer";

function GameStart() {
    const {dispatch, ...game} = useContext(GameContext)
    const {peers} = useContext(PeersContext)
    const component = WAITINGVIEW
    console.log(`dispatch : ${dispatch} , game : ${game}`)
    return (
        <div>
            <button onClick={() => dispatch({type: START_FRAME, peers})}>게임 시작</button>
            <button onClick={() => dispatch({type: SET_COMPONENT, peers, component})}>Click</button>
        </div>
    )
}

export default GameStart