import React, { useContext, useRef, useState, memo, useEffect, useReducer } from 'react';
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
import MoveHorseAnimation from './animation/MoveHorseAnimation';
import { isFunction, isObject, isString } from 'Container/GameContainer/Yut/YutFunctionModule';


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

const MoveHorseFrame = (startPosition, endPosition) => keyframes`
    from{
        translate: transform(${startPosition.x},${startPosition.y});
    }
    to{
        translate: transform(${endPosition.x},${endPosition.y});
    }
`;

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
    const boxPosition = useRef([]);
    const { peers } = useContext(PeersContext);
    const { dispatch, ...state } = useContext(YutContext);
    const { setTextModalHandler } = useContext(TextModal);
    const {
        placeToMove,
        playerHorsePosition,
        selectHorse,
        playerData
    } = state;

    const commonPlaceSize = 40;
    const shortPlaceSize = 60;

    const [positionOfHorseAnimation, setPositionOfHorseAnimation] = useState({
        color: '',
        numberOfHorse: 0,
        startPosition: { x: 0, y: 0 },
        endPosition: { x: 0, y: 0 }
    })

    // const [forceUpdateCount, forceUpdate] = useReducer((prev) => prev + 1, 0)

    const [forceUpdate, setForceUpdate] = useState(Array(35).fill(0));

    const forUpdateHandler = (index) => {
        setForceUpdate(prev => {
            prev[index] += 1;
            return prev
        })
    }


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
            const [newState, catchEnemyHorse, success] = reducerAction.MOVE_HORSE_ON_PLAYER_SECTION(state, index);
            if (success) {
                console.log(catchEnemyHorse)
                if (catchEnemyHorse) {
                    setTextModalHandler("꺼-억");
                }
                forUpdateHandler(index);
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

            const [newState, catchEnemyHorse, success] = reducerAction.MOVE_HORSE_ON_FIELD_SECTION(state, index);
            if (success) {
                if (catchEnemyHorse) {
                    setTextModalHandler("꺼-억");
                }
                // const testState = test(newState);
                // dispatch({ type: MOVE_HORSE_ON_FIELD_SECTION, state: testState });
                // sendDataToPeers(GAME, { nickname, peers, game: YUT, data: { state: testState, reducerActionType: MOVE_HORSE_ON_FIELD_SECTION } });
                forUpdateHandler(index);
                console.log("x y 좌표 ", state.selectHorse, index)
                const boxPos = boxPosition.current.getBoundingClientRect();
                const start = fieldPlacePositions.current[state.selectHorse].getBoundingClientRect();
                const end = fieldPlacePositions.current[index].getBoundingClientRect()
                const startCenter = {
                    x: start.left + (start.width / 2) - boxPos.left,
                    y: start.top + (start.height / 2) - boxPos.top
                }

                const endCenter = {
                    x: end.left + (end.width / 2) - boxPos.left,
                    y: end.top + (end.height / 2) - boxPos.top
                }
                console.log("x y 좌표 중앙 ", startCenter, endCenter)
                console.log(playerData, horsePosition, horsePosition[state.selectHorse]['player'])
                setPositionOfHorseAnimation({
                    color: playerData[horsePosition[state.selectHorse]['player']].color,
                    numberOfHorse: horsePosition[state.selectHorse]['horses'],
                    startPosition: startCenter,
                    endPosition: endCenter
                });

                const newNewState = updateGoalHandler(newState);
                dispatch({ type: MOVE_HORSE_ON_FIELD_SECTION, state: newNewState });
                sendDataToPeers(GAME, { nickname, peers, game: YUT, data: { state: newNewState, reducerActionType: MOVE_HORSE_ON_FIELD_SECTION } });

                // dispatch({ type: MOVE_HORSE_ON_FIELD_SECTION, state: newState });
                // sendDataToPeers(GAME, { nickname, peers, game: YUT, data: { state: newState, reducerActionType: MOVE_HORSE_ON_FIELD_SECTION } });
            }
            else {
                alert("본인 차례가 아닙니다.");
            }
        }
        else {
            console.error("moveHorseOnFieldSection");
        }
    }

    const updateGoalHandler = (state) => {
        if (state.playerHorsePosition.some((i) => i.hasOwnProperty(30))) {
            if (isFunction(dispatch)
                && isObject(state)
                && isObject(peers)
                && isString(nickname)) {
                return reducerAction.UPDATE_GOAL(state);
                // dispatch({ type: UPDATE_GOAL, state: newState });
                // sendDataToPeers(GAME, { nickname, peers, game: YUT, data: { state: newState, reducerActionType: UPDATE_GOAL } });
            }
            else {
                console.error("updateGoalHandler");
            }
        }
        else
            return state;
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
        <YutDiv ref={boxPosition}>
            <MoveHorseAnimation position={positionOfHorseAnimation}></MoveHorseAnimation>
            <GridContainer onContextMenu={(e) => OnContextMenu(e)} className="container">
                {
                    GRID_TABLE.map((i, index) => {
                        if (index === 0)
                            return (<div key={'GridPlace' + index}></div>);
                        else
                            return (
                                <GridPlace key={"GridPlace" + index} row={i.column} column={i.row}>
                                    <PlaceButton
                                        ref={el => fieldPlacePositions.current[index] = el}
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
                                        <Horses key={forceUpdate[index]} player={playerData[horsePosition[index]['player']]} index={index} horses={horsePosition[index]['horses']}>
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