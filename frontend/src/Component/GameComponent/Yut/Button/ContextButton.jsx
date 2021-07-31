import { boardContext } from 'Container/GameContainer/Yut/YutStore';
import React, { useContext, useState, memo, useEffect } from 'react';
import { sendDataToPeers } from 'Common/peerModule/sendToPeers/index.js';
import { GAME, YUT } from 'Constants/peerDataTypes';
import { stateContext } from 'Container/GameContainer/Yut/YutStore';
import { PeersContext } from 'Routes/peerStore';
import actionHandler from 'Container/GameContainer/Yut/Action/actionHandler'


const App = ({ handlerType, nickname, dispatch, state, peers, halted, name, action, buttonStyle }) => {
    const dispatchFunction = () => {
        dispatch({ type: INIT_LAST_YUT_DATA })
        handlerType !== undefined && actionHandler[handlerType]({ dispatch, state, peers, nickname, action });
    }
    const hatledButtonStyle = {
        'borderRadius': '30px',
        'fontSize': '1.25em',
        'borderColor': 'black',
        'color': 'white',
        'backgroundColor': 'brown',
        'height': '50px',
        'width': '240px',
        'border': 'solid 3px black',
        'flexGrow': '1',
    };
    return (
        <button style={hatledButtonStyle} disabled={halted === true && true} onClick={() => dispatchFunction()}>
            {name}
        </button >
    )
}
export default memo(App);