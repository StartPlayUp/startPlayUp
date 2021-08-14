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
    margin-top:20%;
    flex-wrap: wrap;
`
const HoldTable = styled.div`
    border:none;
    background-color: #A94B00;
    width:700px;
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
//false 일때 롤 다이스 아래에 주사위가 위치함->아래에서 위로 올라와야함
//true 일때 홀드 판 위치에 주사위가 위치함->위에서 아래로 내려와야함
const dice_top_to_bottom = (y) => keyframes` //위에서 아래로 내려가는 주사위 애니메이션
    0%{
        transform: translateY(-${y}px);
    }
    100%{
        transform:translateY(0px)
    }
`
const dice_bottom_to_top = (y) => keyframes` //아래에서 위로 올라가는 주사위 애니메이션
    0%{
        transform: translateY(${y}px);
    }
    100%{
        transform:translateY(0px);
    }
`
const HoldButton = styled.button`
    display: flex;
    border: none;
    background: none;
    width:100px;
    z-index:80;
    animation: ${(props)=>props.hold ? dice_top_to_bottom(props.y):dice_bottom_to_top(props.y)} 0.5s;  //true일 때 diceHolder에 위치 -> 위에서 아래로 false일 때 주사위판에 위치-> 아래에서 위로 올라가야함
    :hover{
        background-color:skyblue;
    }
    :active{
        background-color: red;
    }
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
    const [diceImage, setImage] = useState([dice1, dice1, dice1, dice1, dice1]);
    const box = useRef(null);
    const fromPosition = useRef(null);
    const [boxY, setBoxY] = useState(0);
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
        if (diceState.halt === true && diceState.rollCount<3) {
            const value = e.currentTarget.value;
            if (!diceState.hold[value]) {
                const { y } = box.current.getBoundingClientRect();
                const { top,bottom } = fromPosition.current.getBoundingClientRect();
                var height = y - bottom;
                setBoxY(height);
                console.log("y", y);
                console.log("홀드 박스 높이-주사위 높이", height);
                setPlaceY(bottom);           
            }
            diceState.diceHold(value);
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
        } else {
            setDiceRollImage();
            setTimeout(function () {
                let copy = [...diceImage]
                for (var i = 0; i < 5; i++) {
                    if (diceState.dice[i] === 1) {
                        copy[i] = dice1
                    } else if (diceState.dice[i] === 2) {
                        copy[i] = dice2
                    } else if (diceState.dice[i] === 3) {
                        copy[i] = dice3
                    } else if (diceState.dice[i] === 4) {
                        copy[i] = dice4
                    } else if (diceState.dice[i] === 5) {
                        copy[i] = dice5
                    } else if (diceState.dice[i] === 6) {
                        copy[i] = dice6
                    }
                }
                setImage(copy)
            }, 1000);
        }
    }, [diceState.rollCount])

    const setDiceRollImage = () => {
        let rollDiceImage = [...diceImage];
        for (var i = 0; i < 5; i++){
            if (!diceState.hold[i]) {
                rollDiceImage[i] = diceMK1;
            }
        }
        setImage(rollDiceImage);
    }

    const lst = [0, 1, 2, 3, 4];

    useEffect(() => {
        const { y } = box.current.getBoundingClientRect();
        const { top,bottom } = fromPosition.current.getBoundingClientRect();
        var height = y - bottom;
        setBoxY(height);
        console.log("y", y);
        console.log("홀드 박스 높이-주사위 높이", height);
        setPlaceY(bottom);
    }, [])
    
    return (
        <DiceStore.Consumer>
            {({ dice, rollCount,hold})=>(
                <Fragment>
                    <ParentDiv>
                            <RollButton disabled={rollCount? "":rollCount>=0} onClick={RollDice}>Roll Dice !</RollButton>
                        <button onClick={startGame}>게임 시작</button>
                        <ButtonTable ref={fromPosition}>
                            {lst.map((i) => (
                                <>
                                    {!hold[i] &&    //주사위를 홀드 하지 않은 경우 (주사위 굴리기 버튼 아래) 아래에서 위로 올라와야 한다.
                                        <HoldButton onClick={diceHold} value={i} hold={hold[i]} y={boxY}>
                                        <IMG src={diceImage[i]} />
                                    </HoldButton>
                                }
                                </>
                            ))}
                        </ButtonTable>
                        <HoldTable ref={box}>
                            <div>{rollCount} Left</div>
                            <ButtonTable>
                                {lst.map((i) => (
                                    <>
                                        {hold[i] && //주사위를 홀드 한 경우 (주사위 굴리기 버튼 아래) 위에서 아래로 내려와야 한다.
                                            <HoldButton onClick={diceHold} value={i} hold={hold[i]} y={placeY}>
                                                <IMG src={diceImage[i]}/>
                                            </HoldButton>
                                        }
                                    </>
                                ))}
                            </ButtonTable>
                        </HoldTable>
                    </ParentDiv>
                </Fragment>
            )}
        </DiceStore.Consumer>
    )
 }
export default Dice;