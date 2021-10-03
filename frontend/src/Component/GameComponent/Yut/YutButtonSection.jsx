import React, { useContext, useState, memo, useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
    YutContext
} from "Container/GameContainer/Yut/YutStore"

import { PeersContext } from 'Routes/peerStore';
import { GAME, YUT } from 'Constants/peerDataTypes';

import Gauge from './ButtonComponents/Gauge'
import { TimerContext, YutViewContext } from 'Container/GameContainer/Yut/YutStore';

import { THROW_YUT, NEXT_TURN } from 'Container/GameContainer/Yut/Constants/yutActionType';
import reducerAction, { sumYutArrayToMatchTypeIndex } from 'Container/GameContainer/Yut/Reducer/yutStoreReducerAction'
import { sendDataToPeers } from 'Common/peerModule/sendToPeers';
import { isString, isFunction, isObject, isNumber } from 'Container/GameContainer/Yut/YutFunctionModule';
// import { TextModal } from 'Container/GameContainer/Yut/YutStore';
import { TextModal } from 'Container/GameContainer/Yut/YutTextViewModal';
import { NUMBER_TO_MATCH_KOREA_YUT_TYPE } from 'Container/GameContainer/Yut/Constants/yutGame';


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
    height: 220px;
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
    
    background:${props => props.player !== undefined ? props.player.color + '80' : '#C4C4C4'};
    
    border:solid 3px ${props => props.player !== undefined ? props.player.color : '#C4C4C4'};

`;

const StyledHaltedButton = styled.button`
    border-radius: 30px;
    font-size: 1.25em;
    border-color: black;
    color: white;
    background-color: brown;
    height: 50px;
    width: 240px;
    border: solid 3px black;
    flex-grow: 1;
`;


const StyleCenterDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow:1;
`;

const YutButtonSection = () => {
    const { dispatch, ...state } = useContext(YutContext);
    const { peers } = useContext(PeersContext);
    const { setYutView } = useContext(YutViewContext);
    const { setTextModalHandler } = useContext(TextModal);
    // const halted = false;
    const nickname = localStorage.getItem('nickname');

    const { halted, myThrowCount, nowTurn, playerData } = state;
    const { time } = useContext(TimerContext);

    const [count, setCount] = useState(0);
    const intervalRef = useRef(null);

    // useEffect(() => {
    //     return () => stopCount();
    // }, []);

    useEffect(() => {
        if (halted) {
            stopCount()
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

    const throwYutHandler = () => {
        if (myThrowCount <= 0) {
            alert("윷을 던질 수 있는 기회가 없습니다.");
            return;
        }
        if (isFunction(dispatch)
            && isObject(state)
            && isObject(peers)
            && isString(nickname)
            && isNumber(count)) {
            const { yutView, ...newState } = reducerAction.THROW_YUT(state, count);
            dispatch({ type: THROW_YUT, state: newState });
            setYutView([...yutView]);
            const yutTypeIndex = sumYutArrayToMatchTypeIndex(yutView);
            setTextModalHandler(NUMBER_TO_MATCH_KOREA_YUT_TYPE[yutTypeIndex])
            sendDataToPeers(GAME, { nickname, peers, game: YUT, data: { state: newState, yutView, reducerActionType: THROW_YUT } });
        }
        else {
            console.error("throwYutHandler");
        }
    }

    const nextTurnHandler = () => {
        if (isFunction(dispatch)
            && isObject(state)
            && isObject(peers)
            && isString(nickname)) {
            const [newState, success] = reducerAction.NEXT_TURN(state);
            if (success) {
                dispatch({ type: NEXT_TURN, state: newState });
                sendDataToPeers(GAME, { nickname, peers, game: YUT, data: { state: newState, reducerActionType: NEXT_TURN } });
            }
            else {
                alert("현재 위치에 본인 말이 있거나, 본인 차례가 아닙니다.");
            }
        }
        else {
            console.error("nextTurnHandler error");
        }
    }


    return (
        <PlayerButtonSection>
            <NowPlayerNickname player={playerData[nowTurn.index]}>
                <StyleCenterDiv>시간 초 : {time}</StyleCenterDiv>
                <StyleCenterDiv>윷 횟수 : {myThrowCount}</StyleCenterDiv>
                <StyleCenterDiv>현재 턴 : {nowTurn.nickname.split(' ')[0]}</StyleCenterDiv>
            </NowPlayerNickname>
            <HatledButtonSection>
                <div style={{ margin: '5px' }} className="App">
                    <Gauge counterHandler={countHandler} />
                </div>
                <StyledHaltedButton
                    onMouseDown={startCount}
                    onMouseUp={stopCount}
                    onMouseLeave={stopCount}
                    disabled={halted !== undefined && halted}
                    onClick={throwYutHandler}>
                    {'윷 굴리기'}
                </StyledHaltedButton >
                <StyledHaltedButton onClick={nextTurnHandler}>
                    {'다음 턴'}
                </StyledHaltedButton>
            </HatledButtonSection>
        </PlayerButtonSection>
    )
}
export default memo(YutButtonSection);