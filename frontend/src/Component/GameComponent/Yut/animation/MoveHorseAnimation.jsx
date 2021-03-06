import React, { useContext, useRef, useState, memo, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// import Horses from 'Component/GameComponent/Yut/ButtonComponents/Horses';
// import { PeersContext } from 'Routes/peerStore';

// import {
//     YutContext
// } from "Container/GameContainer/Yut/YutStore"

// import { DESELECT_HORSE, MOVE_HORSE_ON_FIELD_SECTION, MOVE_HORSE_ON_PLAYER_SECTION } from 'Container/GameContainer/Yut/Constants/yutActionType'
// import reducerAction from 'Container/GameContainer/Yut/Reducer/yutStoreReducerAction'
// import { sendDataToPeers } from 'Common/peerModule/sendToPeers';
// import { GAME, YUT } from 'Constants/peerDataTypes';


// import arrow from '../../../image/arrow.png';
// import goal from '../../../image/goal.png';
// import start from '../../../image/start.png';
// // import { TextModal } from 'Container/GameContainer/Yut/YutStore';
// import { TextModal } from 'Container/GameContainer/Yut/YutTextViewModal';

// import { GRID_TABLE, SHORTCUT_PLACE } from 'Container/GameContainer/Yut/Constants/yutGame';



const Horse = styled.div`
        display:flex;
        flex-direction: row;
        width:25px;
        height:25px;
        background-color:${props => props.color !== undefined && props.color};
        /* background-color:red; */

        border-radius: 100%;
        border: solid 1px black;
        left:0;
        right:0;
        position:absolute;
        transform: ${props => props.translate !== undefined && "translateX(" + props.translate + "px)"};
        /* transform: ${props => props.translate !== undefined && "translateX(" + props.translate + "px)"}; */

        /* animation: ${props => props.position !== undefined && MoveHorseFrame(props.position)} 0.5s;
        animation-fill-mode: forwards; */
`;

const AnimationDiv = styled.div`
    animation: ${props => props.position !== undefined && MoveHorseFrame(props.position)} 0.5s;
    animation-fill-mode: forwards;
`;

const MoveHorseFrame = ({ startPosition, endPosition }) => keyframes`
    0%{
        opacity: 0;
        z-index:100;
        transform: translate(${startPosition.x}px,${startPosition.y}px)
    }
    20%{
        opacity: 1;
        z-index:100;
        transform: translate(${startPosition.x}px,${startPosition.y}px);
    }
    80%{
        opacity: 1;
        z-index:100;
        transform: translate(${endPosition.x}px,${endPosition.y}px);
    }
    100%{
        opacity: 0;
        z-index:0;
        transform: translate(${endPosition.x}px,${endPosition.y}px);
    }
`;

const MoveHorseAnimation = ({ position }) => {
    console.log("position : ", position)
    const translate = [-45, -30, -15, 0];
    return (
        <AnimationDiv position={{
            startPosition: {
                x: position.startPosition.x + translate[0],
                y: position.startPosition.y
            },
            endPosition: {
                x: position.endPosition.x + translate[0],
                y: position.endPosition.y,
            }
        }}>
            {[...Array(position.numberOfHorse)].map((i, index) =>
                <Horse key={index} translate={translate[index]} color={position.color} ></Horse>
            )}
        </AnimationDiv>
    )
}
export default memo(MoveHorseAnimation);