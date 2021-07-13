import React, { Fragment, useState, useEffect, useContext,useReducer,memo } from "react";
import Calculate from "./calculate";
import { sendDataToPeers } from 'Common/peerModule/sendToPeers/index.js';
import { PeerDataContext, PeersContext, UserContext } from 'Routes/peerStore';
import { GAME, YACHT } from 'Constants/peerDataTypes.js';


const nickname = localStorage.getItem('nickname');
const ROLLDICE="RollDice";
const SELECT="SELECT";
const StartGame="StartGame";
const GET_DATA_FROM_PEER = 'GET_DATA_FROM_PEER';
const DICEHOLD='DICEHOLD';
const ROLLRESET='ROLLRESET';
const UPDATE_PEERS="UPDATE_PEERS"
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
    nowTurn:0,
    halt:false
}
const init = ({ initialState, peers }) => {
    console.log("in init : ", peers)
    return { ...initialState, peers }
}
const reducer=(state,action)=>{
    switch(action.type){
        case UPDATE_PEERS:{
            return {...state,peers:action.peers}
        }
        case GET_DATA_FROM_PEER:{
            return {...state,...action.data}
        }
        case StartGame:{
            return { ...state, playerData: action.playerData, nowTurnNickname: action.nowTurnNickname,halt:true};
        }
        case ROLLDICE:{
            return { ...state, dice: action.diceArray, count: action.counter, playerData: action.player,rollCount:state.rollCount-1}
        }
        case ROLLRESET:{
            return { ...state, dice: [0, 0, 0, 0, 0], count: [0, 0, 0, 0, 0, 0], rollCount: 3, hold:[false, false, false, false, false]}
        }
        case DICEHOLD:{
            const value= action.value;
            let holding= [...state.hold]
            holding[value] = !holding[value];
            return {...state,hold:holding}
        }
        case SELECT:{
            return { ...state, playerData: action.player, nowTurn: action.nowTurn, nowTurnNickname: action.nowTurnNickname,halt:false }
        }
        default:{
            return {...state}
        }
    }
}
const Rolldice=(state)=>{
    let diceArray=[...state.dice];
    for(var i=0;i<5;i++){
        if(!state.hold[i]){
            const num = Math.floor(Math.random() * 6 + 1);
            diceArray[i] = num;
        }
    }
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
    console.assert(!(counter===[0,0,0,0,0,0]),"count 계산 되지 않음");
    return counter;
}
function YachtReduce(){
    const { peers } = useContext(PeersContext);
    const [state,dispatch]=useReducer(reducer,initialState);
    const { peerData } = useContext(PeerDataContext);
    function RollDice(){
        let diceArray = [0, 0, 0, 0, 0];
        let counter = [...state.count]
        let pointCalculate = []
        diceArray = Rolldice(state);
        let test = diceArray.filter((i) => { if (typeof (i) === "number" && (i > 0 && i < 7)) { return i } })//주사위 검사 1~6까지의 숫자만 있는지 확인
        if (test.length === 5 && diceArray.length === 5) {//5개를 굴리므로 5길이가 5인지 검사함
            counter = Count(diceArray);
            let test = counter.map((j) => { if (typeof (j) === "number" && (j >= 0 && j < 6)) { return j } })//주사위 개수의 검사 0개부터 5개까지만 있는지 검사
            if (test.length === 6 && counter.length === 6) {//1~6까지이므로 길이가 6인지 검사함
                pointCalculate = Calculate(diceArray, counter);
                const nowTurn = state.nowTurn;
                const player = [...state.playerData]
                Object.keys(player[nowTurn].selectPoint).map((i) => {
                    if (!player[nowTurn].selectPoint[i][1]) {
                        player[nowTurn].selectPoint[i][0] = pointCalculate[i];
                    }
                })
                const verification= ROLLDICE;
                sendDataToPeers(GAME, { game: YACHT, nickname, peers, data: {verification, playerData: player, dice: diceArray, count: counter } });
                dispatch({ type: ROLLDICE, player, diceArray, counter })
                
            }
            else {
                console.assert(test.length === 6 && counter.length === 6, "주사위 개수가 범위를 벗어났습니다.")
                alert("주사위 계산 오류")
            }
        }
        else {
            console.assert(test === 5 && diceArray.length === 5, "주사위가 돌지 않았습니다.")
            alert("주사위 던지기 오류")
        }
    }
    function select(e){
        const {name,value}=e.target;
        const player = [...state.playerData]
        player[state.nowTurn].selectPoint[name] = [value, true];
        player[state.nowTurn].result += parseInt(value,10);
        //선택 후 값 리셋하기
        Object.keys(player[state.nowTurn].selectPoint).map((i)=>{
            if (!player[state.nowTurn].selectPoint[i][1]){
                player[state.nowTurn].selectPoint[i][0]=0;
            }
        })
        console.log(player);
        //result 구하기
        dispatch({type:ROLLRESET});
        if(!player[state.nowTurn].bonus[1]){
            //보나리 구하기
            let bonusTemp = Object.keys(player[state.nowTurn].selectPoint).map((i) => {
                return player[state.nowTurn].selectPoint[i][0];
            });
            //1~6까지 쪼개기
            var bonusTest = bonusTemp.slice(0, 6).reduce((total, num) => {
                return parseInt(total, 10) + parseInt(num, 10);
            });
            console.log(typeof(bonusTest))
            if (bonusTest < 63) {
                let complete = Object.keys(player[state.nowTurn].selectPoint).map((i) => {
                    return player[state.nowTurn].selectPoint[i][1];
                });
                let completeTest = !complete.slice(0, 6).includes(false);
                console.log("completeTest", completeTest);
                player[state.nowTurn].bonus = [bonusTest,completeTest];
            }
            else if (bonusTest >= 63) {
                console.log("hihi");
                player[state.nowTurn].bonus = [bonusTest, true];
                player[state.nowTurn].result+=35;
                alert("보너스 획득")
            }
        }
        console.log("--------NEXT_TURN-----------")
        console.log(nickname);
        console.log(state.nowTurnNickname);
        console.log(state.nowTurnNickname === nickname)
        if (state.nowTurnNickname === nickname) {
            console.log("턴 확인 결과 True");
            const nowTurn = state.nowTurn === state.playerData.length - 1 ? 0 : state.nowTurn + 1;
            //현재 턴이 마지막 사람이면 1p의 턴으로 만들고 아니라면 다음 사람으로 만든다
            const nowTurnNickname = state.playerData[nowTurn].nickname
            //const selectResult = { ...sendstate, playerData: player }
            //sendDataToPeers(GAME, { game: YACHT, nickname, peers, data: { ...selectResult, nowTurn, nowTurnNickname } })
            const verification=SELECT;
            sendDataToPeers(GAME, { game: YACHT, nickname, peers, data: {verification, playerData: player, nowTurn: nowTurn, nowTurnNickname: nowTurnNickname,halt:true } })
            dispatch({ type: SELECT,player, nowTurn, nowTurnNickname})
        }
        else{
            console.log("턴 확인 결과 false");
            alert("당신의 턴이 아닙니다?");
        }
    }
    function dispatchHandler(){
        //const peers = action.peers
        const nickname = localStorage.getItem('nickname');
        const playerData = [...state.playerData];
        peers.forEach((i) => {
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
        const halt=true;
        const nowTurnNickname = playerData[0].nickname;
        const result = { ...initialState, nowTurnNickname, playerData };
        sendDataToPeers(GAME, { game: YACHT, nickname, peers, data: result });
        dispatch({ type: StartGame, playerData, nowTurnNickname })
        //dispatch({ type: StartGame, peers })
    }
    useEffect(()=>{
        dispatch({type:UPDATE_PEERS,peers})
    },[peers])
    useEffect(() => {
        if (peerData.type === GAME && peerData.game === YACHT) {
            const data = peerData.data;
            if(data.verification===ROLLDICE){
                console.log("ROLLDICE!")
                if(data.dice){
                    let test = data.dice.filter((i) => { if (typeof (i) === "number" && (i > 0 && i < 7)) { return i } })
                    if (test.length === 5) {
                        let test = Object.keys(data.count).map((j) => { if (typeof (data.count[j]) === "number" && (data.count[j] >= 0 && data.count[j] < 6)) { return data.count[j] } })
                        if (test.length === 6) {
                            dispatch({ type: GET_DATA_FROM_PEER, data })
                        }
                        else{
                            alert("데이터 수신 실패")
                        }
                    }
                    else{
                        alert("데이터 수신 실패")
                    }
                }
            }
            else if(data.verification===SELECT){
                if(Object.keys(data.playerData).map((i)=>{
                    if(typeof(data.playerData[i][0])==="number"){
                        return true
                    }
                })){
                    dispatch({ type: GET_DATA_FROM_PEER, data })
                }
                else{
                    alert("데이터 수신 실패?")
                }
                console.log("SELECT!!")
            }
            else {
                dispatch({ type: GET_DATA_FROM_PEER, data })
            }
        }
        
    }, [peerData])
    return (
        <Fragment>
            <div>
                {Object.keys(state.playerData).map((i,index)=>(
                    <div keys={index}>
                        <div>플레이어 {i} 점수판</div>
                        <div>
                            {Object.keys(state.playerData[i].selectPoint).map((j, index) => (
                                <div keys={index}>
                                    {j}
                                    {(!state.halt)&&state.rollCount<3 ? state.playerData[i].selectPoint[j][0] :
                                    <button
                                        disabled={state.playerData[i].selectPoint[j][1]}
                                        name={j}
                                        onClick={select}
                                        value={state.playerData[i].selectPoint[j][0]}
                                        >{state.playerData[i].selectPoint[j][0]}
                                        </button>}
                                </div>
                            ))}
                        </div>
                        <div>보너스 : {state.playerData[i].bonus}</div>
                        <div>점수 : {state.playerData[i].result}</div>
                    </div>
                ))}
            </div>
            <div>
                <div>
                    <button onClick={dispatchHandler}>게임 시작</button>
                    <button disabled={state.rollCount ? "" : state.rollCount >= 0} onClick={RollDice}>ROLLDICE!</button>
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