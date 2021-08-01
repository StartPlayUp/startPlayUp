import { THROW_YUT, START_GAME, boardContext } from 'Container/GameContainer/Yut/YutStore';
import React, { useContext, useState, memo, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Horses from 'Component/GameComponent/Yut/Horses'

import {
    YutContext
} from "Container/GameContainer/Yut/YutStore"

import HaltButton from './Button/HaltButton';
import ContextButton from './Button/HaltButton';

import HaltGagueButton from './Button/HaltGagueButton';

import { PeersContext } from 'Routes/peerStore';
import { GAME, YUT } from 'Constants/peerDataTypes';
import { stateContext } from 'Container/GameContainer/Yut/YutStore';
import actionHandler from 'Container/GameContainer/Yut/Action/actionHandler';

import { NUMBER_TO_YUT_TYPE } from 'Container/GameContainer/Yut/Constants/yutGameInitData';

import Gauge from './Gauge'


const HatledButtonSection = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    width: 240px;
    height:100px;
`;


const PlayerButtonSection = styled.div`
    display:flex;
    flex-direction: row;
    background-color: #FFFFF3;
    border-radius: 30px;
    width:450px;
    height: 200px;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    // 비율
    flex-grow:1;
`;

const NowPlayerNickname = styled.div`
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin:5px;
    height: 100px;
    width: 180px;
    border: solid 3px black;
    background: #C4C4C4;

`;


const StyleCenterDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow:1;
`;

const App = () => {
    const { dispatch, ...state } = useContext(YutContext);
    const { peers } = useContext(PeersContext);
    // const halted = false;
    const nickname = localStorage.getItem('nickname');

    const { halted, yutData, myThrowCount, playerData, nowTurn, timer } = state;


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


    const [count, setCount] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        return () => stopCount(); // when App is unmounted we should stop counter
    }, []);

    useEffect(() => {
        if (halted) {
            setCount(0);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }

        }
    }, [halted])

    const startCount = () => {
        if (intervalRef.current || myThrowCount === 0) return;
        intervalRef.current = setInterval(() => {
            setCount((prevCounter) => prevCounter + 10);
        }, 50);
    };

    const stopCount = () => {
        if (intervalRef.current) {
            setCount(0);
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const countHandler = () => {
        return (
            Math.floor(count / 100) % 2 === 1
                ? 100 - (count % 100)
                : count % 100
        )
    }


    return (
        <PlayerButtonSection>
            <NowPlayerNickname>
                <StyleCenterDiv>시간 초 : {timer}</StyleCenterDiv>
                <StyleCenterDiv>윷 횟수 : {myThrowCount}</StyleCenterDiv>
                <StyleCenterDiv>현재 턴 : {nowTurn.nickname}</StyleCenterDiv>
            </NowPlayerNickname>
            <HatledButtonSection>
                <div style={{ margin: '5px' }} className="App">
                    <Gauge counterHandler={countHandler} />
                </div>
                <HaltGagueButton count={count} buttonEvent={{ startCount, stopCount }} buttonStyle={hatledButtonStyle} dispatch={dispatch} state={state} peers={peers} halted={halted} handlerType={'throwYutHandler'} nickname={nickname} name={'윷 굴리기'} />
                <HaltButton buttonStyle={hatledButtonStyle} dispatch={dispatch} state={state} peers={peers} halted={halted} handlerType={'nextTurnHandler'} nickname={nickname} name={'다음 턴'} />
            </HatledButtonSection>
        </PlayerButtonSection>
    )
}
export default memo(App);