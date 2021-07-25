import React, { useContext, useState, memo, useEffect } from 'react';
import styled from 'styled-components';

import Horses from 'Component/GameComponent/Yut/Horses'
import { sendDataToPeers } from 'Common/peerModule/sendToPeers/index.js';
import { GAME, YUT } from 'Constants/peerDataTypes';
import { PeersContext } from 'Routes/peerStore';

import { MOVE_HORSE, MOVE_FIRST_HORSE, UPDATE_GOAL, boardContext } from 'Container/GameContainer/Yut/YutStore';

import {
    YutContext
} from "Container/GameContainer/Yut/YutStore"

import { DESELECT_HORSE } from 'Container/GameContainer/Yut/Constants/actionType'
import actionHandler from 'Container/GameContainer/Yut/Action/actionHandler';


const GridContainer = styled.div`
    /* width:300px;
    height:300px; */
    margin:10px;
    display:grid;
    grid-gap: 2px;
    grid-template-rows:repeat(21,0.4fr);
    grid-template-columns:repeat(21,0.4fr);
`;

const GridPlace = styled.div`
    display:grid;
    grid-row:${props => String(props.row + 1) + " / " + String(props.row + 2)};
    grid-column:${props => String(props.column + 1) + " / " + String(props.column + 2)};
`;

const PlaceButton = styled.button`
    background-color:${props => props.color !== undefined && props.color};
    border-radius: 100%;
    height:40px;
    width: 40px;
    border: solid 1px black;
    padding:0px;
    margin:-5px;
    ${props => props.color !== undefined && "cursor:pointer;"};
    /* top: 40px;
    left: 40px; */
`;

const HorseButton = styled.button`
    background-color:${props => props.color !== undefined && props.color};
    border-radius: 100%;
    border: solid 1px black;
    padding:10px;
    cursor:pointer;
    /* top: 40px;
    left: 40px; */
`;

const YutDiv = styled.div`
    margin: 10px 10px 40px 10px;
`;


const App = () => {
    const nickname = localStorage.getItem('nickname');
    const { peers } = useContext(PeersContext);
    const gridTable = [
        { index: 0, row: 20, column: 20 },
        { index: 1, row: 20, column: 16 },
        { index: 2, row: 20, column: 12 },
        { index: 3, row: 20, column: 8 },
        { index: 4, row: 20, column: 4 },
        { index: 5, row: 20, column: 0 },
        { index: 6, row: 16, column: 0 },
        { index: 7, row: 12, column: 0 },
        { index: 8, row: 8, column: 0 },
        { index: 9, row: 4, column: 0 },
        { index: 10, row: 0, column: 0 },
        { index: 11, row: 0, column: 4 },
        { index: 12, row: 0, column: 8 },
        { index: 13, row: 0, column: 12 },
        { index: 14, row: 0, column: 16 },
        { index: 15, row: 0, column: 20 },
        { index: 16, row: 4, column: 20 },
        { index: 17, row: 8, column: 20 },
        { index: 18, row: 12, column: 20 },
        { index: 19, row: 16, column: 20 },
        { index: 20, row: 20, column: 20 },
        { index: 21, row: 16, column: 4 },
        { index: 22, row: 13, column: 7 },
        { index: 23, row: 10, column: 10 },
        { index: 24, row: 7, column: 13 },
        { index: 25, row: 4, column: 16 },
        { index: 26, row: 4, column: 4 },
        { index: 27, row: 7, column: 7 },
        { index: 28, row: 13, column: 13 },
        { index: 29, row: 16, column: 16 },
        { index: 30, row: 16, column: 10 },
    ]


    const [horsePosition, setHorsePosition] = useState({});

    const { dispatch, ...state } = useContext(YutContext);
    const {
        placeToMove,
        playerHorsePosition,
        selectHorse,
        playerData
    } = state;

    useEffect(() => {
        const result = {}
        playerHorsePosition.forEach((i, index) => {
            Object.entries(i).forEach(([key, value]) => {
                result[key] = { player: index, horses: value }
            })
        })
        setHorsePosition(result)
    }, [playerHorsePosition])


    const changeItemColorHandler = (index) => {
        return Object.keys(placeToMove).includes(String(index)) ? 'yellow' : 'white'

    }
    const moveHorse = (e, index, player) => {
        e.preventDefault();
        if (selectHorse === 0) {
            // dispatch({ type: MOVE_FIRST_HORSE, index })
            actionHandler.moveFirstHorseHandler({ dispatch, peers, state, nickname, index })
            // sendDataToPeers(GAME, { nickname, peers, game: YUT, data: state });
        }
        else {
            // dispatch({ type: MOVE_HORSE, index });
            actionHandler.moveHorseHandler({ dispatch, peers, state, nickname, index })

            // sendDataToPeers(GAME, { nickname, peers, game: YUT, data: state });
        }
    }

    const OnContextMenu = (e) => {
        e.preventDefault();
        dispatch({ type: DESELECT_HORSE })
        // await sendDataToPeers(GAME, { nickname, peers, game: YUT, data: state });
    }

    const shortList = [5, 10, 15, 23, 20]

    return (
        <YutDiv>
            <GridContainer onContextMenu={(e) => OnContextMenu(e)} className="container">
                {gridTable.map((i, index) =>
                    <GridPlace key={index} index={index} row={i.column} column={i.row}>
                        {/* <PlaceButton key={index} onClick={(e) => moveHorse(e, index)} color={changeItemColorHandler(index)}>{'O'}</PlaceButton> */}
                        <PlaceButton key={index} onClick={(e) => moveHorse(e, index)} color={changeItemColorHandler(index)}>{ }</PlaceButton>
                        {horsePosition[index] !== undefined &&
                            <Horses player={playerData[horsePosition[index]['player']]} index={index} horses={horsePosition[index]['horses']}>
                                {index}
                            </Horses>}
                    </GridPlace>)
                }
            </GridContainer >
        </YutDiv >
    )
}
export default memo(App);