import React, { useContext, useState, memo, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import Horses from 'Component/GameComponent/Yut/ButtonComponents/Horses';
import {
    YutContext
} from "Container/GameContainer/Yut/YutStore"
import { useLocation } from 'react-router-dom';
import { PeersContext } from 'Routes/peerStore';
import { GAME, YUT } from 'Constants/peerDataTypes';
import { DEFAULT_TIME_VALUE, NUMBER_TO_MATCH_KOREA_YUT_TYPE } from 'Container/GameContainer/Yut/Constants/yutGame';
import { START_GAME } from 'Container/GameContainer/Yut/Constants/yutActionType';
import reducerAction from 'Container/GameContainer/Yut/Reducer/yutStoreReducerAction'
import { sendDataToPeers } from 'Common/peerModule/sendToPeers';
import { TimerContext } from 'Container/GameContainer/Yut/YutStore';
// import { TextModal } from 'Container/GameContainer/Yut/YutStore';
import { TextModal } from 'Container/GameContainer/Yut/YutTextViewModal';


import { isString, isFunction, isObject } from 'Container/GameContainer/Yut/YutFunctionModule';




const StylePlayerWithYutData = styled.div`
    display:flex;
    flex-direction: column;
    flex-grow:1;
    width:630px;
    height: 220px;
    flex-basis:460px;
`;

const StyleDiv = styled.div`
    display:flex;
    height:30px;
    flex-direction: row;
    margin:10px;

    background-color: #FFFFF3;
    border-radius: 30px;
    align-items: center;
    justify-content: space-evenly;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    flex-grow: 70;
`;

const PlayerSection = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: space-around;
    padding:10px;
    background-color: #FFFFF3;
    border-radius: 30px;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
const Player = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding:10px;
    /* background-color:${props => props.player.color !== undefined ? props.player.color : '#C4C4C4'}; */
    background-color:white;
    background:${props => props.player !== undefined ? props.player.color + '80' : '#C4C4C4'};
    border:solid 2px ${props => props.player.color !== undefined ? props.player.color : '#C4C4C4'};
    border-radius: 30px;
    box-shadow: 0px 3px 0px 3px ${props => props.player.color !== undefined ? props.player.color : '#C4C4C4'};
    margin:0px 5px 0px 5px;
`;

const YutPlayerSection = () => {
    const { dispatch, ...state } = useContext(YutContext);
    const { peers } = useContext(PeersContext);
    // const halted = false;
    const location = useLocation();
    const hostname = location.state.hostname;
    const nickname = localStorage.getItem('nickname');
    const { setTime } = useContext(TimerContext);
    const { setTextModalHandler } = useContext(TextModal);
    const { yutData, playerData, } = state;

    const yutResultList = () => {
        const yutList = [0, 0, 0, 0, 0, 0];
        yutData.forEach((i) => {
            yutList[i] += 1;
        })
        return yutList
    }

    const startGameHandler = () => {
        if (isFunction(dispatch)
            && isObject(state)
            && isObject(peers)
            && isString(nickname)) {
            const newState = reducerAction.START_GAME(peers);
            dispatch({ type: START_GAME, state: newState });
            setTime(DEFAULT_TIME_VALUE);
            setTextModalHandler("게임 시작")
            sendDataToPeers(GAME, { nickname, peers, game: YUT, data: { state: newState, reducerActionType: START_GAME } });
        } else {
            console.error("startGameHandler");
            console.log(isFunction(dispatch)
                && isObject(state)
                && isObject(peers)
                && isString(nickname));
            console.log(typeof (dispatch))
        }
    }
    useEffect(() => {
        console.log(hostname, localStorage.getItem('nickname'))
        if (hostname === localStorage.getItem('nickname')) {
            setTimeout(startGameHandler(), 5000);
        }
    }, [])


    return (
        <StylePlayerWithYutData>
            {/* <button onClick={startGameHandler}>게임 시작</button> */}
            <StyleDiv>
                {yutResultList().map((i, index) => (<div key={"yutResultList" + index}>{NUMBER_TO_MATCH_KOREA_YUT_TYPE[index]} : {i}</div>))}
            </StyleDiv>
            {playerData.length > 0 && <PlayerSection>
                {playerData.map((i, index) => <Player key={index} player={i}>
                    player{index + 1}<div>{i.nickname.split(' ')[0]}</div>
                    <div style={{ "height": "60px" }} >
                        <Horses player={i} index={0} horses={i.horses} />
                    </div>
                    <div>얻은 점수 : {i.goal}</div>
                    <p />
                </Player>)}
            </PlayerSection>}
        </StylePlayerWithYutData>
    )
}
export default memo(YutPlayerSection);