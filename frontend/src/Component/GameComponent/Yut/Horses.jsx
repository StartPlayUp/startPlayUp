import { THROW_YUT, boardContext, SELECT_HORSE } from 'Container/GameContainer/Yut/YutStore';
import React, { useContext, useState, memo, useEffect } from 'react';
import styled from 'styled-components';
import { sendDataToPeers } from 'Common/peerModule/sendToPeers/index.js';
import { GAME, YUT } from 'Constants/peerDataTypes';

import {
    YutContext
} from "Container/GameContainer/Yut/YutStore"

import { PeersContext } from 'Routes/peerStore';
import actionHandler from 'Container/GameContainer/Yut/Action/actionHandler'



const Horse = styled.div`
        display:flex;
        flex-direction: row;
        width:20px;
        height:20px;
        background-color:${props => props.color !== undefined && props.color};
        border-radius: 100%;
        border: solid 1px black;
        cursor:pointer;
        margin:10px;
        z-index:${props => props.index};
        position:absolute;
        transform: ${props => "translateX(" + props.index * 10 + "px)"};
         
    `;

const StyledButton = styled.button`
    border:0;
    outline:0;
`;



const App = ({ horses, player, index }) => {
    const { peers } = useContext(PeersContext);
    const nickname = localStorage.getItem('nickname');

    const { dispatch, ...state } = useContext(YutContext);




    const clickHorseHandler = async (e, index) => {
        e.preventDefault();
        // await dispatch({ type: SELECT_HORSE, index })
        // sendDataToPeers(GAME, { nickname, peers, game: YUT, data: state });
        actionHandler.selectHorseHandler({ dispatch, peers, state, nickname, index })
    }
    return (
        <div onClick={(e) => clickHorseHandler(e, index, player.nickname)} >
            {[...Array(horses)].map((tp, index) =>
                <Horse key={index} color={player.color} index={index} />
            )}
        </div>
    )
}
export default memo(App);