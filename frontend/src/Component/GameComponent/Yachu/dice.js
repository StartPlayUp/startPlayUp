import React, { Fragment, useState, useEffect,useContext } from "react";
import {DiceStore} from 'Container/GameContainer/Yacht/YatchStore';
import styled from 'styled-components';
import dice1 from "./diceImage/dice1.png"
import dice2 from "./diceImage/dice2.png"
import dice3 from "./diceImage/dice3.png"
import dice4 from "./diceImage/dice4.png"
import dice5 from "./diceImage/dice5.png"
import dice6 from "./diceImage/dice6.png"
import diceMK1 from "./diceImage/diceMK1.gif"
import diceMK2 from "./diceImage/diceMK2.gif"
const HoldTable=styled.div`
    border:none;
    background-color: #A94B00;
    width:500px;
    height:200px;
    text-align: right;
    color:white;
    div{
        font-size:24px
    }
`
const HoldButton = styled.button`
    border: none;
    background: none;
    width:15%;
`
const IMG=styled.img`
    width:100%;
`
const RollButton=styled.button`
    border:none;
    background-color: #A593E0;
    width:225px;
    height:40px;
    font-size: 24px;
    color:#FFFFFF;
`
const Dice=()=>{
    const diceState=useContext(DiceStore);
    const [second,setSecond]=useState(1);
    const [diceImage,setImage]=useState([dice1,dice1,dice1,dice1,dice1]);
    function RollDice(){
        if(diceState.halt===true){
            diceState.RollDice()

        }
        else{
            alert("니 턴 아님")
        }
    }
    const diceHold = (e)=>{
        if (diceState.halt === true) {
            const {value}=e.target;
            console.log(value);
            diceState.diceHold(value)
        }
        else {
            alert("니 턴 아님")
        }
    }
    const startGame=()=>{
        diceState.StartGame()
    }
    useEffect(()=>{
        if(diceState.rollCount===3){
            setImage([dice1,dice1,dice1,dice1,dice1]);
        }else{
            let copy=[...diceImage]
            for(var i=0;i<5;i++){
                if(diceState.dice[i]===1){
                    copy[i]=dice1
                }else if(diceState.dice[i]===2){
                    copy[i]=dice2
                }else if(diceState.dice[i]===3){
                    copy[i]=dice3
                }else if(diceState.dice[i]===4){
                    copy[i]=dice4
                }else if(diceState.dice[i]===5){
                    copy[i]=dice5
                }else if(diceState.dice[i]===6){
                    copy[i]=dice6
                }
            }
            setImage(copy)
        }
    },[diceState.rollCount])
    return (
        <DiceStore.Consumer>
            {({ dice, rollCount})=>(
                <Fragment>
                    <div>
                        <div>
                            <RollButton disabled={rollCount? "":rollCount>=0} onClick={RollDice}>Roll Dice !</RollButton>
                            <button onClick={startGame}>게임 시작</button>
                        </div>
                        <div>
                            <div>{dice}</div>
                            <div>
                                <HoldButton onClick={diceHold} value={0}>
                                    <IMG src={diceImage[0]}/>
                                </HoldButton>
                                <HoldButton onClick={diceHold} value={1}>
                                    <IMG src={diceImage[1]}/>
                                </HoldButton>
                                <HoldButton onClick={diceHold} value={2}>
                                    <IMG src={diceImage[2]}/>
                                </HoldButton>
                                <HoldButton onClick={diceHold} value={3}>
                                    <IMG src={diceImage[3]}/>
                                </HoldButton>
                                <HoldButton onClick={diceHold} value={4}>
                                    <IMG src={diceImage[4]}/>
                                </HoldButton>
                            </div>
                        </div>
                        <HoldTable>
                            <div>{rollCount} Left</div>
                        </HoldTable>
                    </div>
                </Fragment>
            )}
        </DiceStore.Consumer>
    )
 }
export default Dice;

