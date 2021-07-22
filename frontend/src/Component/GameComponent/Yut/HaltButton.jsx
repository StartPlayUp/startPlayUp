import { boardContext } from 'Container/GameContainer/Yut/YutStore';
import React, { useContext, useState, memo, useEffect } from 'react';
import { sendDataToPeers } from 'Common/peerModule/sendToPeers/index.js';
import { GAME, YUT } from 'Constants/peerDataTypes';
import { stateContext } from 'Container/GameContainer/Yut/YutStore';
import { PeersContext } from 'Routes/peerStore';
import actionHandler from 'Container/GameContainer/Yut/Action/actionHandler'


const App = ({ handlerType, nickname, dispatch, state, peers, halted, name, action }) => {
    const dispatchFunction = () => {
        handlerType !== undefined && actionHandler[handlerType]({ dispatch, state, peers, nickname, action });
    }
    return (
        <button disabled={halted === true && true} onClick={() => dispatchFunction()}>
            {name}
        </button >
    )
}
export default memo(App);