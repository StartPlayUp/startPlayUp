import { SELECT_HORSE } from 'Container/GameContainer/Yut/Constants/yutActionType';
import React, { useContext, useState, memo, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { sendDataToPeers } from 'Common/peerModule/sendToPeers/index.js';
import { GAME, YUT } from 'Constants/peerDataTypes';
import reducerAction from 'Container/GameContainer/Yut/Reducer/yutStoreReducerAction'


import {
    YutContext
} from "Container/GameContainer/Yut/YutStore"

import { PeersContext } from 'Routes/peerStore';
import actionHandler from 'Container/GameContainer/Yut/Backup/actionHandler'



const Horse = styled.div`
        display:flex;
        flex-direction: row;
        width:25px;
        height:25px;
        background-color:${props => props.color !== undefined && props.color};
        border-radius: 100%;
        border: solid 1px black;
        cursor:pointer;
        margin:10px;
        z-index:${props => props.horseIndex !== undefined && props.horseIndex};
        position:absolute;
        transform: ${props => props.translate !== undefined && "translateX(" + props.translate + "px)"};

`;

const bounceIn = keyframes`
    from {
        transform: scale(0.1);
        opacity: 0;
    }
    60 % {
        transform: scale(1.2);
        opacity: 1;
    }
    to {
        transform: scale(1);
    }
`;

const StyleDiv = styled.div`
    animation: ${bounceIn} 0.1s;
`;



const App = ({ horses, player, index }) => {
    const { peers } = useContext(PeersContext);
    const nickname = localStorage.getItem('nickname');

    const { dispatch, ...state } = useContext(YutContext);

    const translate = [-45, -30, -15, 0];



    const selectHorseHandler = async (e, index) => {
        e.preventDefault();
        // await dispatch({ type: SELECT_HORSE, index })
        // sendDataToPeers(GAME, { nickname, peers, game: YUT, data: state });
        // actionHandler.selectHorseHandler({ dispatch, peers, state, nickname, index })
        if (typeof (dispatch) === "function"
            && typeof (state) === "object"
            && typeof (peers) === "object"
            && typeof (nickname) === "string"
            && typeof (index) === "number") {

            const [newState, success] = reducerAction.SELECT_HORSE(state, index);
            if (success) {
                dispatch({ type: SELECT_HORSE, state: newState });
                // 말이 갈수 있는 위치를 상대에게 보내야 하는가?
                // sendDataToPeers(GAME, { nickname, peers, game: YUT, data: newState });
            }
            else {
                alert("본인 말이 아니거나 본인 차례가 아닙니다.");
            }
        }
        else {
            console.error("selectHorseHandler");
        }
    }
    return (
        <StyleDiv onClick={(e) => selectHorseHandler(e, index, player.nickname)} >
            {[...Array(horses)].map((tp, index) =>
                <Horse key={index} color={player.color} horseIndex={index} translate={translate[index]} />
            )}
        </StyleDiv>
    )
}
export default memo(App);