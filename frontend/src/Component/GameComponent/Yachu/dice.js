import React, { Fragment, useState, useEffect,useContext } from "react";
import {DiceStore} from 'Container/GameContainer/Yacht/YatchStore';

 const Dice=()=>{
    const diceState=useContext(DiceStore);
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
            diceState.diceHold(e)
        }
        else {
            alert("니 턴 아님")
        }
    }
    const startGame=()=>{
        diceState.StartGame()
    }
    return (
        <DiceStore.Consumer>
            {({ dice, rollCount})=>(
                <Fragment>
                    <div>
                        <div>주사위
                            <div>{dice}</div>
                            <div>
                                <button onClick={diceHold} value={0}>
                                    1
                                </button>
                                <button onClick={diceHold} value={1}>
                                    2
                                </button>
                                <button onClick={diceHold} value={2}>
                                    3
                                </button>
                                <button onClick={diceHold} value={3}>
                                    4
                                </button>
                                <button onClick={diceHold} value={4}>
                                    5
                                </button>
                            </div>
                        </div>
                        <div>남은횟수
                            <div>{rollCount}</div>
                        </div>
                        <div>
                            <button disabled={rollCount? "":rollCount>=0} onClick={RollDice}>주사위 굴리기</button>
                            <button onClick={startGame}>게임 시작</button>
                        </div>
                    </div>
                </Fragment>
            )}
        </DiceStore.Consumer>
    )
 }
export default Dice;

