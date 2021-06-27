import { THROW_YUT, START_GAME, MOVE_HORSE_USE_YUTDATA, boardContext } from 'JSC/Container/GameContainer/Yut/YutStore';
import React, { useContext, useState, memo, useEffect } from 'react';
import styled from 'styled-components';
import Horses from 'JSC/Component/GameComponent/Yut/Horses'
import { NEXT_TURN } from 'JSC/Container/GameContainer/Yut/YutStore';
import HaltButton from './HaltButton';


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
    const { myThrowCount, yutData, playerData, halted, dispatch } = useContext(boardContext);
    // const halted = false;

    return (
        <div>
            <button onClick={() => dispatch({ type: START_GAME })}>게임 시작</button>
            <HaltButton dispatch={dispatch} type={THROW_YUT} halted={halted} name={'윷 굴리기'} />
            <button onClick={() => dispatch({ type: NEXT_TURN })}>다음 턴</button>
            <StyleDiv>말이 갈 수 있는 수 :
                {
                    yutData.map((i, index) => <button key={index} onClick={() => dispatch({ type: MOVE_HORSE_USE_YUTDATA })}> {i} </button>)
                }
            </StyleDiv>
            <div>윷 던질 수 있는 횟수 : {myThrowCount}</div>
            <PlayerSection>
                {playerData.map((i, index) => <Player key={index}>
                    <div>닉네임 : {i.nickname}</div>
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