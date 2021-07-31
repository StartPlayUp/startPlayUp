import React, {useRef, Fragment, useState, useEffect,useContext } from "react";
import {DiceStore} from 'Container/GameContainer/Yacht/YatchStore';
import styled,{ keyframes, css } from 'styled-components';
import dice1 from "./diceImage/dice1.png"
import dice2 from "./diceImage/dice2.png"
import dice3 from "./diceImage/dice3.png"
import dice4 from "./diceImage/dice4.png"
import dice5 from "./diceImage/dice5.png"
import dice6 from "./diceImage/dice6.png"
import diceMK1 from "./diceImage/diceMK1.gif"
import diceMK2 from "./diceImage/diceMK2.gif"
const ParentDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    margin-top:5%;
    flex-wrap: wrap;
`
const HoldTable = styled.div`
    border:none;
    background-color: #A94B00;
    width:600px;
    height:200px;
    text-align: right;
    color:white;
    position: relative;
    margin-top: 33%;
    margin-left: 30%;
    right:0%;
    div{
        font-size:24px
    }
`
const ButtonTable = styled.div`
    display:flex;
    flex-direction: row;
    flex-wrap: wrap;
`
const moveTo=(x1,y1,x2,y2) => keyframes`
    0%{
        transform: translate(${x1}px,${y1}px); //원래 위치
    }
    100%{
        transform: translate(${x2}px,${y2}px); //움직일 위치
    }   
`;
const moveFrom=(x1,y1,x2,y2)=> keyframes`
    from{transform:translate(${x1}px,${y1}px);}//움직인 위치
    to{transform:translate(${x2}px,${y2}px);
    }//원래 위치
    
`
const HoldButton = styled.button`
    display: flex;
    border: none;
    background: none;
    width:100px;
    :hover{
        background-color:skyblue;
    }
    :active{
        background-color: red;
    }
`
const Ani = styled.div`
    animation: ${(props)=>props.hold? moveTo(props.x1,props.y1,props.x2,props.y2):moveTo(props.x2,props.y2,props.x1,props.y1)} 0.5s linear;
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
    :hover{
        background-color:skyblue;
    }
    :active{
        background-color: #400064;
        color:#FFFFFF;
    }
`
const Dice=()=>{
    const diceState=useContext(DiceStore);
    const [second,setSecond]=useState(1);
    const [diceImage, setImage] = useState([dice1, dice1, dice1, dice1, dice1]);
    const box = useRef(null);
    const fromPosition = useRef(null);
    const [boxX, setBoxX] = useState(0);
    const [boxY, setBoxY] = useState(0);
    const [placeX, setPlaceX] = useState([0, 0, 0, 0, 0]);
    const [placeY, setPlaceY] = useState(0);

    function RollDice(){
        if(diceState.halt===true){
            diceState.RollDice()
        }
        else{
            alert("니 턴 아님")
        }
    }
    const diceHold = (e) => {
        const value = e.currentTarget.value;
        if (!diceState.hold[value]) {
            let diceX = [...placeX];
            const { x, y } = box.current.getBoundingClientRect();
            const { left, top } = fromPosition.current.getBoundingClientRect();
            setBoxX(x);
            setBoxY(y);
            diceX[value] = left + (value * 100);
            console.log(diceX);
            setPlaceX(diceX);
            setPlaceY(top);            
        }
        diceState.diceHold(value);
        /*
        if (diceState.halt === true) {
        }
        else {
            alert("니 턴 아님")
        }*/
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
//useRef 리액트 체스 찾아보기
    const lst = [0, 1, 2, 3, 4];

    return (
        <DiceStore.Consumer>
            {({ dice, rollCount,hold})=>(
                <Fragment>
                    <ParentDiv>
                            <RollButton disabled={rollCount? "":rollCount>=0} onClick={RollDice}>Roll Dice !</RollButton>
                        <button onClick={startGame}>게임 시작</button>
                        <ButtonTable>
                            {lst.map((i) => (
                                <>
                                    {hold[i] ?
                                            <Ani hold={hold[i]} x1={placeX} y1={placeY} x2={boxX} y={boxY} >
                                                <IMG src={diceImage[i]}/>
                                            </Ani>
                                        :
                                            <HoldButton onClick={diceHold} value={i} ref={fromPosition}>
                                                <IMG src={diceImage[i]}/>
                                            </HoldButton>
                                        }
                                </>
                                )
                            )}
                        </ButtonTable>
                        <HoldTable ref={box}>
                            <div>{rollCount} Left</div>
                            <ButtonTable>
                                {lst.map((i) => (
                                    <>
                                        {hold[i] ?
                                                <HoldButton onClick={diceHold} value={i} ref={fromPosition}>
                                                    <IMG src={diceImage[i]} />
                                                </HoldButton>
                                            :
                                        <Ani hold={hold[i]} x1={placeX} y1={placeY} x2={boxX} y={boxY} >
                                                    <IMG src={diceImage[i]}/>
                                                </Ani>}
                                    </>
                                    )
                                )}
                            </ButtonTable>
                        </HoldTable>
                    </ParentDiv>
                </Fragment>
            )}
        </DiceStore.Consumer>
    )
 }
export default Dice;

