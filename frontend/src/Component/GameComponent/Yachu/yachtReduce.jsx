import React, { Fragment, useState, useEffect, useContext,useReducer } from "react";
import Calculate from "./calculate";
import { sendDataToPeers } from 'JSC/Common/peerModule/sendToPeers/index.js';
import { PeerDataContext, PeersContext, UserContext } from 'JSC/store';
import { GAME, YACHT } from 'JSC/Constants/peerDataTypes.js';
import dice1 from './dice/dice1.png';
import styled from 'styled-components';
import { UPDATE_PEERS } from "JSC/Container/GameContainer/Yut/YutStore";


const ROLLDICE="RollDice";
const SelectPoint="SelectPoint";
const StartGame="StartGame";
const GET_DATA_FROM_PEER = 'GET_DATA_FROM_PEER';
const DICEHOLD='DICEHOLD';
const initialState={
    dice:[0,0,0,0,0],
    count:[0,0,0,0,0,0],
    hold:[false,false,false,false,false],
    rollCount:3,
    playerData:[],
    nowTurn:0
}
const reducer=(state,action)=>{
    const nickname = localStorage.getItem('nickname');
    switch(action.type){
        case UPDATE_PEERS:{
            return {...state,...action.peers}
        }
        case GET_DATA_FROM_PEER:{
            return {...state,...action.data}
        }
        case StartGame:{
            const peers = action.peers
            const nickname=localStorage.getItem('nickname');
            const player = [{
                nickname,
                selectPoint: {
                    ace: [0, false], //true 획득한 점수 , false 아직 획득 하지 않은 점수
                    two: [0, false],
                    three: [0, false],
                    four: [0, false],
                    five: [0, false],
                    six: [0, false],
                    threeOfaKind: [0, false],
                    fourOfaKind: [0, false],
                    fullHouse: [0, false],
                    smallStraight: [0, false],
                    largeStraight: [0, false],
                    choice: [0, false],
                    yahtzee: [0, false]
                }
            }];
            peers.forEach((i)=>{
                player.push({
                    nickname: i.nickname,
                    selectPoint: {
                        ace: [0, false], //true 획득한 점수 , false 아직 획득 하지 않은 점수
                        two: [0, false],
                        three: [0, false],
                        four: [0, false],
                        five: [0, false],
                        six: [0, false],
                        threeOfaKind: [0, false],
                        fourOfaKind: [0, false],
                        fullHouse: [0, false],
                        smallStraight: [0, false],
                        largeStraight: [0, false],
                        choice: [0, false],
                        yahtzee: [0, false]
                    }
                });
            })
            const nowTurnNickname = player[0].nickname;
            const result = { ...state, nowTurnNickname, player };
            sendDataToPeers(GAME,{game:YACHT,nickname,peers,data:result});
            return {...result,peers};
        }
        case ROLLDICE:
            const peers = action.peers
            let diceArray=[...state.dice];
            diceArray=Rolldice(state);
            let counter=Count(diceArray);
            const result = { ...state, dice:diceArray, count:counter };
            sendDataToPeers(GAME, { game: YACHT, nickname, peers, data: result });
            return { ...state, dice: diceArray, count: counter }
        case DICEHOLD:
            const value= action.value;
            let holding= [...state.hold]
            holding[value] = !holding[value];
            console.log("holdTest",holding);
            return {...state,hold:holding}
        default:{
            return {...state}
        }
    }
}
const Rolldice=(state)=>{
    let diceArray=[...state.dice];
    console.log(state.hold);
    for(var i=0;i<5;i++){
        if(!state.hold[i]){
            const num = Math.floor(Math.random() * 6 + 1);
            diceArray[i] = num;
        }
    }
    console.log(diceArray);
    return diceArray;
}
function Count(diceArray) {
    //같은 눈의 주사위 계산하는 함수
    let counter = [0, 0, 0, 0, 0, 0];
    for (var i = 0; i < 5; i++) {
        if (diceArray[i] === 1) {
            counter[0] += 1;
        } else if (diceArray[i] === 2) {
            counter[1] += 1;
        } else if (diceArray[i] === 3) {
            counter[2] += 1;
        } else if (diceArray[i] === 4) {
            counter[3] += 1;
        } else if (diceArray[i] === 5) {
            counter[4] += 1;
        } else if (diceArray[i] === 6) {
            counter[5] += 1;
        }
    }
    return counter;
}
function YachtReduce(){
    const [state,dispatch]=useReducer(reducer,initialState);
    const {peers} =useContext(PeersContext);
    const { peerData } = useContext(PeerDataContext);
    function dispatchHandler(){
        dispatch({ type: StartGame, peers })
    }
    useEffect(()=>{
        dispatch({type:UPDATE_PEERS,peers})
    },[peers])
    useEffect(() => {
        if (peerData.type === GAME && peerData.game === YACHT) {
            const data = peerData.data;
            dispatch({type:GET_DATA_FROM_PEER,data})
        }
    }, [peerData])

    return (
        <Fragment>
            <div>
            <div>
            <button onClick={dispatchHandler}>게임 시작</button>
            <button onClick={()=>dispatch({type:ROLLDICE,peers})}>ROLLDICE!</button>
            </div>
            <div>
            <button onClick={() => dispatch({ type: DICEHOLD, value: 0})}>1</button>
            <button onClick={() => dispatch({ type: DICEHOLD, value: 1 })}>2</button>
            <button onClick={() => dispatch({ type: DICEHOLD, value: 2 })}>3</button>
            <button onClick={() => dispatch({ type: DICEHOLD, value: 3 })}>4</button>
            <button onClick={() => dispatch({ type: DICEHOLD, value: 4 })}>5</button>
            </div>
            <div>주사위테스트 {state.dice}</div>
            </div>
        </Fragment>
    );
}

export default YachtReduce;