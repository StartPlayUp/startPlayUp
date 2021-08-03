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
    position: relative;
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
    position: absolute;
    bottom: 15%;
    right:1%;
    div{
        font-size:24px
    }
`
const ButtonTable = styled.div`
    display:flex;
    flex-direction: row;
    flex-wrap: wrap;
`
const boxToDiceTable=(x,y) => keyframes`
    0%{
        transform: translate(0px,0px); //원래 위치
    }
    100%{
        transform: translate(-${x}px,-${y}px); //움직일 위치
    }   
`;
const diceTableToBox = (x, y) => keyframes`
    0%{
        transform: translate(0px,0px); //원래 위치
    }
    100%{
        transform: translate(${x}px,${y}px); //움직일 위치
    } 
`
const HoldButton = styled.button`
    display: flex;
    border: none;
    background: none;
    width:100px;
    z-index:99;
    animation: ${(props) => { props.hold ? boxToDiceTable(props.x1, props.y1) : diceTableToBox(props.x2, props.y2) }} 0.5s linear;
    ${(props)=>{console.log("애니메이션 테스트",props)}}
    :hover{
        background-color:skyblue;
    }
    :active{
        background-color: red;
    }
`

const IMG = styled.img`
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
            var test1 = x - left;
            var test2 = y - top;
            setBoxX(test1);
            setBoxY(test2);
            console.log("x", x);
            console.log("y", y);
            console.log("test1", test1);
            console.log("test2", test2);
            diceX[value] = left + (value * 100);
            console.log(diceX);
            setPlaceX(diceX);
            setPlaceY(top);            
        }
        diceState.diceHold(value);
        /*
        ${(props)=>console.log("props.hold:",props.hold,"props.x",props.x1,props.x2,props.y1,props.y2)}
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
                        <ButtonTable ref={fromPosition}>
                            <>
                                <HoldButton onClick={diceHold} value={0}  hold={hold[0]} x1={boxX} y1={boxY} x2={placeX[0]} y2={placeY}>
                                    <IMG src={diceImage[0]}/>
                                </HoldButton>                                
                                <HoldButton onClick={diceHold} value={1} hold={hold[1]} x1={boxX+100} y1={boxY} x2={placeX[1]} y2={placeY}>
                                    <IMG src={diceImage[1]}/>
                                </HoldButton>
                                <HoldButton onClick={diceHold} value={2} hold={hold[2]} x1={boxX+200} y1={boxY} x2={placeX[2]} y2={placeY}>
                                    <IMG src={diceImage[2]}/>
                                </HoldButton>
                                <HoldButton onClick={diceHold} value={3} hold={hold[3]} x1={boxX+300} y1={boxY} x2={placeX[3]} y2={placeY}>
                                    <IMG src={diceImage[3]}/>
                                </HoldButton>
                                <HoldButton onClick={diceHold} value={4} hold={hold[4]} x1={boxX+400} y1={boxY} x2={placeX[4]} y2={placeY}>
                                    <IMG src={diceImage[4]}/>
                                </HoldButton>
                            </>
                        </ButtonTable>
                        <HoldTable>
                            <div>{rollCount} Left</div>
                            <ButtonTable ref={box}>
                            </ButtonTable>
                        </HoldTable>
                    </ParentDiv>
                </Fragment>
            )}
        </DiceStore.Consumer>
    )
 }
export default Dice;

/*
                                <>
                                    {hold[0] ?
                                        <HoldBox onClick={diceHold} value={0}  hold={hold[0]} x={placeX[0]} y={placeY} src={diceImage[0]}>
                                            <IMG src={diceImage[0]}/>
                                        </HoldBox>
                                    :
                                        ""
                                        
                                    }
                                    {hold[1] ?
                                        <HoldBox onClick={diceHold} value={1} hold={hold[1]} x={placeX[1]} y={placeY} src={diceImage[1]}>
                                            <IMG src={diceImage[1]}/>
                                        </HoldBox>
                                    :
                                        ""
                                    }
                                    {hold[2] ?
                                        <HoldBox onClick={diceHold} value={2} hold={hold[2]} x={placeX[2]} y={placeY} src={diceImage[2]}>
                                            <IMG src={diceImage[2]}/>
                                        </HoldBox>
                                    :
                                        ""
                                    }
                                    {hold[3] ?
                                        <HoldBox onClick={diceHold} value={3} hold={hold[3]} x={placeX[3]} y={placeY} src={diceImage[3]}>
                                            <IMG src={diceImage[3]}/>
                                        </HoldBox>
                                    :
                                        ""
                                    }
                                    {hold[4] ?
                                        <HoldBox onClick={diceHold} value={4} hold={hold[4]} x={placeX[4]} y={placeY} src={diceImage[4]}>
                                            <IMG src={diceImage[4]}/>
                                        </HoldBox>
                                    :
                                        ""
                                    }
                                </>
*/