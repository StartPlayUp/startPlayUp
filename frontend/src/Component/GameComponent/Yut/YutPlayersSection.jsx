import { THROW_YUT, START_GAME, boardContext } from 'Container/GameContainer/Yut/YutStore';
import React, { useContext, useState, memo, useEffect } from 'react';
import styled from 'styled-components';
import Horses from 'Component/GameComponent/Yut/Horses'

import {
    YutContext
} from "Container/GameContainer/Yut/YutStore"

import HaltButton from './HaltButton';
import { PeersContext } from 'Routes/peerStore';
import { GAME, YUT } from 'Constants/peerDataTypes';
import { stateContext } from 'Container/GameContainer/Yut/YutStore';
import actionHandler from 'Container/GameContainer/Yut/Action/actionHandler';

import { NUMBER_TO_YUT_TYPE } from 'Container/GameContainer/Yut/Constants/yutGame';





const StyleDiv = styled.div`
    display:flex;
    height:30px;
    flex-direction: row;
    margin:10px;
`;

const PlayerSection = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: space-around;
    width:500px;
    margin:20px;

`;

const Player = styled.div`
    padding:10px;
    margin:0px;
`;

const App = () => {
    const { dispatch, ...state } = useContext(YutContext);
    const { peers } = useContext(PeersContext);
    // const halted = false;
    const nickname = localStorage.getItem('nickname');

    const { halted, yutData, myThrowCount, playerData } = state;
    // const [sendRequest, setSendRequest] = useState(false);
    // const state = useContext(stateContext);

    // const { playerData, playerDataDispatch } = useContext(playerDataContextValue)
    // // const player = useContext(playerDataContextValue)

    return (
        <div>
            <button onClick={() => actionHandler.startGameHandler({ dispatch, state, peers, nickname })}>게임 시작</button>
            <HaltButton dispatch={dispatch} state={state} peers={peers} halted={halted} handlerType={'throwYutHandler'} nickname={nickname} name={'윷 굴리기'} />
            <HaltButton dispatch={dispatch} state={state} peers={peers} halted={halted} handlerType={'nextTurnHandler'} nickname={nickname} name={'다음 턴'} />
            <StyleDiv>말이 갈 수 있는 수 :
                {
                    yutData.map((i, index) => <button key={index}>{NUMBER_TO_YUT_TYPE[i]} </button>)
                }
            </StyleDiv>
            <div>윷 던질 수 있는 횟수 : {myThrowCount}</div>
            <PlayerSection>
                {playerData.map((i, index) => <Player key={index}>
                    <div>닉네임 : {
                        <div>{i.nickname}</div>
                    }</div>
                    <div style={{ "height": "60px" }} >
                        말의 갯수 :
                        <Horses player={i} index={0} horses={i.horses} />
                    </div>
                    <div>얻은 점수 : {i.goal}</div>
                    <p />
                </Player>)}
            </PlayerSection>
        </div >
    )
}
export default memo(App);