import React, { useContext, useState, memo, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Horses from 'Component/GameComponent/Yut/Horses'
import {
    YutContext
} from "Container/GameContainer/Yut/YutStore"
import { PeersContext } from 'Routes/peerStore';
import { GAME, YUT } from 'Constants/peerDataTypes';
import { NUMBER_TO_YUT_TYPE } from 'Container/GameContainer/Yut/Constants/yutGameInitData';
import { START_GAME } from 'Container/GameContainer/Yut/Constants/yutActionType';
import reducerAction from 'Container/GameContainer/Yut/Reducer/yutStoreReducerAction'
import { sendDataToPeers } from 'Common/peerModule/sendToPeers';




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
    border:solid 2px ${props => props.player.color !== undefined ? props.player.color : '#C4C4C4'};
    border-radius: 30px;
    box-shadow: 0px 3px 0px 3px ${props => props.player.color !== undefined ? props.player.color : '#C4C4C4'};
    margin:0px 5px 0px 5px;
`;

const App = () => {
    const { dispatch, ...state } = useContext(YutContext);
    const { peers } = useContext(PeersContext);
    // const halted = false;
    const nickname = localStorage.getItem('nickname');

    const { yutData, playerData, } = state;

    const [yutResultList, setYutresultList] = useState([0, 0, 0, 0, 0, 0])

    useEffect(() => {
        const yutList = [0, 0, 0, 0, 0, 0];
        yutData.forEach((i) => {
            yutList[i] += 1;
        })
        setYutresultList(yutList);
    }, [yutData])

    const startGameHandler = () => {
        if (typeof (dispatch) === "function"
            && typeof (state) === "object"
            && typeof (peers) === "object"
            && typeof (nickname) === "string") {
            const newState = reducerAction.START_GAME(peers);
            dispatch({ type: START_GAME, state: newState });
            sendDataToPeers(GAME, { nickname, peers, game: YUT, data: { state: newState, reducerActionType: START_GAME } });
        } else {
            console.error("startGameHandler");
            console.log(typeof (dispatch) === "function"
                , typeof (state) === "object"
                , typeof (peers) === "object"
                , typeof (nickname) === "string");
            console.log(typeof (dispatch))
        }
    }


    return (
        <StylePlayerWithYutData>
            <button onClick={startGameHandler}>게임 시작</button>
            <StyleDiv>
                {yutResultList.map((i, index) => (<div key={"yutResultList" + index}>{NUMBER_TO_YUT_TYPE[index]} : {i}</div>))}
            </StyleDiv>
            {/* {console.log('playerData : ^^^', playerData)} */}
            {playerData.length > 0 && <PlayerSection>
                {playerData.map((i, index) => <Player key={index} player={i}>
                    player{index + 1}<div>{i.nickname}</div>
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
export default memo(App);