import { boardContext } from 'Container/GameContainer/Yut/YutStore';
import React, { useContext, useState, memo, useEffect } from 'react';
import { sendDataToPeers } from 'Common/peerModule/sendToPeers/index.js';
import { GAME, YUT } from 'Constants/peerDataTypes';
import { stateContext } from 'Container/GameContainer/Yut/YutStore';
import { PeersContext } from 'Routes/peerStore';
import reducerActionHandler from 'Container/GameContainer/Yut/reducerActionHandler'


const App = ({ handlerType, dispatch, state, peers, halted, name, action }) => {
    const dispatchFunction = () => {
        handlerType !== undefined && reducerActionHandler[handlerType]({ dispatch, state, peers, action });

    }
    return (
        <button disabled={halted === true && true} onClick={() => dispatchFunction()}>
            {name}
        </button >
    )
}
export default memo(App);