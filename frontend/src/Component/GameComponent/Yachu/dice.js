import React, { Fragment, useState, useEffect,useContext } from "react";
import {DiceStore} from 'Container/GameContainer/Yacht/YatchStore';
import { sendDataToPeers } from 'Common/peerModule/sendToPeers/index.js';

 const Dice=()=>{
    const diceState=useContext(DiceStore);
    console.log(diceState)
    function RollDice(){
        diceState.RollDice()
    }
    const diceHold = (e)=>{
        diceState.diceHold(e)
    }
    return (
        <DiceStore.Consumer>
            {({diceState})=>(
                <Fragment>
                    <div>
                        <div>주사위
                            <div>{diceState.dice}</div>
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
                            <div>{diceState.rollCount}</div>
                        </div>
                        <div>
                            <button disabled={diceState.rollCount? "":diceState.rollCount>=0} onClick={RollDice}>주사위 굴리기</button>
                        </div>
                    </div>
                </Fragment>
            )}
        </DiceStore.Consumer>
    )
 }
export default Dice;

