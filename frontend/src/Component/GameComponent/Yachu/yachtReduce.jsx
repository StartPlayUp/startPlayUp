import React, { Fragment, useState, useEffect, useContext,useReducer } from "react";
import Calculate from "./calculate";
import { sendDataToPeers } from 'Common/peerModule/sendToPeers/index.js';
import { PeerDataContext, PeersContext, UserContext } from 'store';
import { GAME, YACHT } from 'Constants/peerDataTypes.js';
import dice1 from './dice/dice1.png';
import styled from 'styled-components';
import { UPDATE_PEERS } from "Container/GameContainer/Yut/YutStore";

const nickname = localStorage.getItem('nickname');
const ROLLDICE="RollDice";
const SELECT="SELECT";
const StartGame="StartGame";
const GET_DATA_FROM_PEER = 'GET_DATA_FROM_PEER';
const DICEHOLD='DICEHOLD';
const initialState={
    dice:[0,0,0,0,0],
    count:[0,0,0,0,0,0],
    hold:[false,false,false,false,false],
    rollCount:3,
    playerData: [{
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
        },
        result: 0,
        bonus: [0, false]
            }],
    nowTurn:0
}
const init = ({ initialState, peers }) => {
    console.log("in init : ", peers)
    return { ...initialState, peers }
}
const reducer=({peers,...sendstate},action)=>{
    const state={...sendstate,peers}
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
            const playerData = [...state.playerData];
            peers.forEach((i)=>{
                playerData.push({
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
                    },
                    result: 0,
                    bonus: [0, false]
                });
            })
            
            const nowTurnNickname = playerData[0].nickname;
            const result = { ...state, nowTurnNickname, playerData };
            sendDataToPeers(GAME,{game:YACHT,nickname,peers,data:result});
            return { ...state, nowTurnNickname, playerData ,peers};
        }
        case ROLLDICE:
            let diceArray=[...state.dice];
            diceArray=Rolldice(state);
            let counter=Count(diceArray);
            let pointCalculate = Calculate(diceArray, counter);
            const nowTurn=state.nowTurn;
            const selectPoint=state.playerData[nowTurn].selectPoint
            Object.keys(selectPoint).map((i)=>{
                if (!selectPoint[i][1]) {
                    selectPoint[i][0] = pointCalculate[i];
                }
            })
            state.playerData[nowTurn].selectPoint=selectPoint
            console.log(state.playerData[nowTurn])
            const result = { ...state, dice:diceArray, count:counter };
            sendDataToPeers(GAME, { game: YACHT, nickname, peers, data: result });
            return { ...state, dice: diceArray, count: counter }
        case DICEHOLD:
            const value= action.value;
            let holding= [...state.hold]
            holding[value] = !holding[value];
            console.log("holdTest",holding);
            return {...state,hold:holding}
        case SELECT:
            const selectName= action.name;
            const selectValue = action.value;
            const playerData = state.playerData[state.nowTurn]
            playerData.selectPoint[selectName]=[selectValue,true];
            state.playerData[state.nowTurn]=playerData
            const selectResult={...state}
            sendDataToPeers(GAME,{game:YACHT,nickname,peers,data:selectResult})
            return {...state}
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
    const { peers } = useContext(PeersContext);
    const [state,dispatch]=useReducer(reducer,{initialState,peers},init);
    const { peerData } = useContext(PeerDataContext);
    function select(e){
        const {name,value}=e.target;
        dispatch({type:SELECT,name,value})
    }
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
                {state.playerData.map((i,index)=>(
                    <div keys={index}>
                        <div>ace{i.selectPoint['ace'][0]}
                        <button disabled={i.selectPoint['ace'][1] ? 1 : 0}
                            name={'ace'}
                            onClick={select}
                            value={i.selectPoint['ace'][0]}>ace</button>
                        </div>
                        <div>two{i.selectPoint['two'][0]}</div>
                        <div>three{i.selectPoint['three'][0]}</div>
                        <div>four{i.selectPoint['four'][0]}</div>
                        <div>five{i.selectPoint['five'][0]}</div>
                        <div>six{i.selectPoint['six'][0]}</div>
                        <div>bonus{i.bonus[0]}</div>
                        <div>아래는 특수 족보입니다.</div>
                        <div>choice{i.selectPoint['choice'][0]}</div>
                        <div>threeOfaKind{i.selectPoint['threeOfaKind'][0]}</div>
                        <div>fourOfaKind{i.selectPoint['fourOfaKind'][0]}</div>
                        <div>fullHouse{i.selectPoint['fullHouse'][0]}</div>
                        <div>smallStraight{i.selectPoint['smallStraight'][0]}</div>
                        <div>largeStraight{i.selectPoint['largeStraight'][0]}</div>
                        <div>yahtzee{i.selectPoint['yahtzee'][0]}</div>
                        <div>result{i.result}</div>
                    </div>
                ))}
                
            </div>
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