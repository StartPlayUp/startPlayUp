import React, { useContext, useRef, useState, memo, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import Horses from 'Component/GameComponent/Yut/ButtonComponents/Horses';
import { PeersContext } from 'Routes/peerStore';

import {
    YutContext
} from "Container/GameContainer/Yut/YutStore"

import { DESELECT_HORSE, MOVE_HORSE_ON_FIELD_SECTION, MOVE_HORSE_ON_PLAYER_SECTION } from 'Container/GameContainer/Yut/Constants/yutActionType'
import reducerAction from 'Container/GameContainer/Yut/Reducer/yutStoreReducerAction'
import { sendDataToPeers } from 'Common/peerModule/sendToPeers';
import { GAME, YUT } from 'Constants/peerDataTypes';


import arrow from '../../../image/arrow.png';
import goal from '../../../image/goal.png';
import start from '../../../image/start.png';
// import { TextModal } from 'Container/GameContainer/Yut/YutStore';
import { TextModal } from 'Container/GameContainer/Yut/YutTextViewModal';

import { GRID_TABLE, SHORTCUT_PLACE } from 'Container/GameContainer/Yut/Constants/yutGame';




const GridContainer = styled.div`
    width:inherit;
    height:inherit;
    margin:10px;
    display:grid;
    grid-gap: 2px;
    grid-template-rows:repeat(21,0.4fr);
    grid-template-columns:repeat(21,0.4fr);

`;

const GridPlace = styled.div`
    display:grid;
    grid-row:${props => (`${props.row + 1}` + " / " + `${props.row + 2}`)};
    grid-column:${props => (`${props.column + 1}` + " / " + `${props.column + 2}`)};

    justify-content: center;
    align-items:center;

    /* animation: */
    :hover { transform: scale(1.1); }
`;

const PlaceButton = styled.button`
    background-color:${props => props.color !== undefined && props.color};
    border-radius: 100%;
    height:${props => props.buttonSize !== undefined ? props.buttonSize : 40}px;
    width: ${props => props.buttonSize !== undefined ? props.buttonSize : 40}px;
    border: none;
    padding:0px;
    margin:-5px;
    ${props => props.rotateValue !== undefined && `transform: rotate(${props.rotateValue}deg)`};
    ${props => props.color !== undefined && "cursor:pointer;"};
`;

const YutDiv = styled.div`
    margin: 10px 10px 40px 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius:30px;
    width:550px;
    height:500px;
    padding:20px 40px 50px 40px;
    background:white;
`;

const StyleImg = styled.img`
    width:inherit;
    height:inherit;
    border-radius: 100%;
    background-color:${props => props.color !== undefined && props.color};
`;


const YutFiledSection = () => {
    const nickname = localStorage.getItem('nickname');
    const [horsePosition, setHorsePosition] = useState({});
    const fieldPlacePositions = useRef([]);
    const { peers } = useContext(PeersContext);
    const { dispatch, ...state } = useContext(YutContext);
    const { setTextModal } = useContext(TextModal);
    const {
        placeToMove,
        playerHorsePosition,
        selectHorse,
        playerData
    } = state;

    const commonPlaceSize = 40;
    const shortPlaceSize = 60;


    useEffect(() => {
        const result = {}
        playerHorsePosition.forEach((i, index) => {
            Object.entries(i).forEach(([key, value]) => {
                result[key] = { player: index, horses: value }
            })
        })
        setHorsePosition(result)
    }, [playerHorsePosition])


    const getColorAccordingToPlaceToMove = (index) => {
        return Object.keys(placeToMove).includes(String(index)) ? 'yellow' : 'white';
    }

    const moveHorseOnPlayerSection = ({ dispatch, state, peers, nickname, index }) => {
        if (typeof (dispatch) === "function"
            && typeof (state) === "object"
            && typeof (peers) === "object"
            && typeof (nickname) === "string"
            && typeof (index) === "number") {
            // TextModal
            const [newState, eatEnemyHorse, success] = reducerAction.MOVE_HORSE_ON_PLAYER_SECTION(state, index);
            if (success) {
                if (eatEnemyHorse) {
                    setTextModal("꺼-억");
                }
                dispatch({ type: MOVE_HORSE_ON_PLAYER_SECTION, state: newState });
                sendDataToPeers(GAME, { nickname, peers, game: YUT, data: { state: newState, reducerActionType: MOVE_HORSE_ON_PLAYER_SECTION } });
            }
            else {
                alert("본인 차례가 아닙니다.")
            }

        }
        else {
            console.error("moveHorseOnPlayerSection");
        }
    }

    const moveHorseOnFieldSection = ({ dispatch, state, peers, nickname, index }) => {
        if (typeof (dispatch) === "function"
            && typeof (state) === "object"
            && typeof (peers) === "object"
            && typeof (nickname) === "string"
            && typeof (index) === "number") {

            const [newState, eatEnemyHorse, success] = reducerAction.MOVE_HORSE_ON_FIELD_SECTION(state, index);
            if (success) {
                if (eatEnemyHorse) {
                    setTextModal("꺼-억");
                }
                dispatch({ type: MOVE_HORSE_ON_FIELD_SECTION, state: newState });
                sendDataToPeers(GAME, { nickname, peers, game: YUT, data: { state: newState, reducerActionType: MOVE_HORSE_ON_FIELD_SECTION } });
            }
            else {
                alert("본인 차례가 아닙니다.");
            }
        }
        else {
            console.error("moveHorseOnFieldSection");
        }
    }

    const moveHorseHandler = (e, index) => {
        e.preventDefault();
        if (selectHorse === 0) {
            moveHorseOnPlayerSection({ dispatch, peers, state, nickname, index })
        }
        else {
            moveHorseOnFieldSection({ dispatch, peers, state, nickname, index })
        }
    }

    const OnContextMenu = (e) => {
        e.preventDefault();
        dispatch({ type: DESELECT_HORSE })
        // sendDataToPeers(GAME, { nickname, peers, game: YUT, data: state });
    }



    return (
        <YutDiv>
            <GridContainer onContextMenu={(e) => OnContextMenu(e)} className="container">
                {
                    GRID_TABLE.map((i, index) => {
                        if (index === 0)
                            return (<div key={'GridPlace' + index}></div>);
                        else
                            return (
                                <GridPlace key={"GridPlace" + index} row={i.column} column={i.row}>
                                    <PlaceButton
                                        ref={fieldPlacePositions[index]}
                                        onClick={(e) => moveHorseHandler(e, index)}
                                        color={getColorAccordingToPlaceToMove(index)}
                                        rotateValue={i.rotateValue}
                                        buttonSize={SHORTCUT_PLACE.some((i) => index === i) ? shortPlaceSize : commonPlaceSize}>
                                        {
                                            // <StyledImg src={arrow} />
                                            index === 1 || index === 30 ?
                                                (index === 1) ?
                                                    (<StyleImg src={start} color={getColorAccordingToPlaceToMove(index)} />) :
                                                    (<StyleImg src={goal} color={getColorAccordingToPlaceToMove(index)} />)
                                                : (<StyleImg src={arrow} color={getColorAccordingToPlaceToMove(index)} />)
                                        }
                                    </PlaceButton>
                                    {
                                        horsePosition[index] !== undefined &&
                                        <Horses player={playerData[horsePosition[index]['player']]} index={index} horses={horsePosition[index]['horses']}>
                                            {index}
                                        </Horses>
                                    }
                                </GridPlace>
                            );
                    })
                }
            </GridContainer >

        </YutDiv >
    )
}
export default memo(YutFiledSection);