import React, { useReducer, useState, useEffect, useContext } from "react";
import Calculate from "Container/GameContainer/Yacht/calculate";
import { sendDataToPeers } from 'Common/peerModule/sendToPeers/index.js';
import { PeerDataContext, PeersContext, UserContext } from 'Routes/peerStore';
import { GAME, YACHT } from 'Constants/peerDataTypes.js';
import styled from 'styled-components';

const DiceStore=React.createContext();
const PlayerData=React.createContext();
const YachuProvider=({children})=>{
    const [diceState,setDiceState]=useState({
        dice:[0,0,0,0,0],
        hold:[false,false,false,false,false],
        rollCount:3
    })
    const [nowTurn,setTurn]=useState(0);
    let counter=[0,0,0,0,0,0];
    const nickname = localStorage.getItem('nickname');
    const [playerData,setPlayer]=useState([{
        nickname,
        selectPoint:{
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
        bonus: [0, false]}
    ])
    const RollDice=()=>{
        let diceArray=[...diceState.dice];
        for (var i = 0; i < 5; i++) {
            if (!diceState.hold[i]) {
                const num = Math.floor(Math.random() * 6 + 1);
                diceArray[i] = num;
            }
        }
        counter=Count(diceArray);
        let pointCalculate = Calculate(diceArray, counter);
        console.log(pointCalculate)
        let playerCopy=[...playerData];
        Object.keys(playerCopy[nowTurn].selectPoint).map((i) => {
            if (!playerCopy[nowTurn].selectPoint[i][1]) {
                playerCopy[nowTurn].selectPoint[i][0] = pointCalculate[i];
            }
        })
        setDiceState({
            ...diceState,
            dice: diceArray,
            rollCount: diceState.rollCount - 1
        })
        setPlayer(playerCopy);
    }
    const diceHold=(e)=>{ //e=사용자가 선택한 입력값
        const {value}=e.target;
        let holding=[...diceState.hold];
        holding[value]=!holding[value];
        setDiceState({
            ...diceState,
            hold:holding
        })
    }
    const rollReset=()=>{
        setDiceState({
            ...diceState,
            dice: [0, 0, 0, 0, 0],
            hold: [false, false, false, false, false],
            rollCount: 3
        })
        let playerArr = [...playerData]
        Object.keys(playerArr[nowTurn].selectPoint).map((i) => {
            if (!playerData[nowTurn].selectPoint[i][1]) {
                playerData[nowTurn].selectPoint[i][0] = 0;
            }
        })
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

    function selectData(e){
        const { value, name } = e.target;
        const number = parseInt(value, 10);
        let playerArr=[...playerData]
        playerArr[nowTurn].selectPoint[name]=[number,true]
        playerArr[nowTurn].result+=number;
        rollReset();
        if (!playerArr[nowTurn].bonus[1]) {
            //보나리 구하기
            let bonusTemp = Object.keys(playerArr[nowTurn].selectPoint).map((i) => {
                return playerArr[nowTurn].selectPoint[i][0];
            });
            //1~6까지 쪼개기
            var bonusTest = bonusTemp.slice(0, 6).reduce((total, num) => {
                return parseInt(total, 10) + parseInt(num, 10);
            });
            if (bonusTest < 63) {
                let complete = Object.keys(playerArr[nowTurn].selectPoint).map((i) => {
                    return playerArr[nowTurn].selectPoint[i][1];
                });
                let completeTest = !complete.slice(0, 6).includes(false);
                console.log("completeTest", completeTest);
                playerArr[nowTurn].bonus = [bonusTest, completeTest];
            }
            else if (bonusTest >= 63) {
                console.log("hihi");
                playerArr[nowTurn].bonus = [bonusTest, true];
                playerArr[nowTurn].result += 35;
                alert("보너스 획득")
            }
        }
        setPlayer(playerArr)
    }
    return (
        <PlayerData.Provider value={
            {playerData:playerData,selectData}
        }>
            <DiceStore.Provider value={
                {   diceState:diceState,
                    RollDice,
                    diceHold
                }
            }>
                {children}
            </DiceStore.Provider>
        </PlayerData.Provider>


    )
}
export {DiceStore,PlayerData,YachuProvider};