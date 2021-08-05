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
//false 일때 롤 다이스 아래에 주사위가 위치함->아래에서 위로 올라와야함
//true 일때 홀드 판 위치에 주사위가 위치함->위에서 아래로 내려와야함
const moveTo=(x1,y1,x2) => keyframes`
    0%{
        transform: translate(${x1}px,${y1}px); //원래 위치
    }
    100%{
        transform: translateX(${x2}px,0); //움직일 위치
    }   
`;
const moveFrom=(x2,y2)=> keyframes`
    from{transform:translate(-${x2}px,-${y2}px);}//움직인 위치
    to{transform:translate(0px,0px);
    }//원래 위치
    
`
//위에서 아래로 내려가는 주사위 애니메이션이 2개까지만 정상적으로 나오고 3개부턴 나오지 않음
//콘솔로그로 확인해본 결과 3번째 주사위부터 좌표값이 음수로 나오기 때문에 if 문을 통해서 음수인 경우 양수로 들어가게끔 시도
const Test=(x2,y2)=> keyframes`   //테스트로 임의 함수 생성 테스트 끝나면 반드시 함수 이름 제대로 지정할것
    from{transform:translate(${x2}px,-${y2}px);}//움직인 위치
    to{transform:translate(0px,0px);
    }//원래 위치
    
`
const StopAnimation=(x,y) => keyframes`
    to{transform:translate(-${x}px)}
`
//moveTo(props.x1,props.y1,props.x2,props.y2)
//props.hold ? (props.x1>0 ? (console.log("양수임"),  moveFrom(props.x1, props.y1)): (console.log("음수임"), Test(props.x1, props.y1))) : (console.log("moveTo 함수 작동"), moveTo(props.x1,props.y1,props.x2))
const Fade = keyframes`
    0%{
        opacity:0;
    }
    100%{
        opacity:1;
    }
`
const HoldButton = styled.button`
    display: flex;
    border: none;
    background: none;
    width:100px;
    z-index:95;
    animation: ${(props)=>props.hold===2 ? (StopAnimation(props.x2,props.y1)):(props.hold===0?(moveFrom(props.x1,props.y1)):moveTo(props.x1,props.y1,props.x2))} 0.5s;
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
    const [second,setSecond]=useState(1);
    const [diceImage, setImage] = useState([dice1, dice1, dice1, dice1, dice1]);
    const box = useRef(null);
    const fromPosition = useRef(null);
    const [boxX, setBoxX] = useState(0);
    const [boxY, setBoxY] = useState(0);
    const [placeX, setPlaceX] = useState([0, 0, 0, 0, 0]);
    const [placeY, setPlaceY] = useState(0);
    const [localHold, setLocal] = useState([2, 2, 2, 2, 2]) //store에서 받아온 hold를 기준으로 지역 state생성 0이면 true 1이면 false 아무것도 아닌 상태 2
    const [trigger, setTrigger] = useState(false); //store쪽의 hold에 변화가 생길 경우 localHold값을 2로 만들어 애니메이션이 동작하지 않도록 막아주는 trigger
    const [copyStoreHold, setStoreHold] = useState([diceState.hold])
    
    function RollDice(){
        if(diceState.halt===true){
            diceState.RollDice()
        }
        else{
            alert("니 턴 아님")
        }
    }
    const diceHold = (e) => {
        setStoreHold(diceState.hold)
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
            diceX[value] = left ;
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
    useEffect(() => {
        const copyLocalHold = [...localHold];
        for (var i = 0; i < 5; i++){
            if (copyStoreHold[i]!==diceState.hold[i]) {
                if (diceState.hold[i]) {
                    copyLocalHold[i] = 0;
                }
                else if (!diceState.hold[i]) {
                    copyLocalHold[i] = 1;
                }
            }
        }
        setLocal(copyLocalHold);
        console.log(copyLocalHold)
        setTrigger(prev=>!prev)
    }, diceState.hold)
    useEffect(() => {
        console.log("setLocal")
        setLocal([2, 2, 2, 2, 2]);
    },[trigger])
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
    const lst = [0, 1, 2, 3, 4];

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
                                    {!hold[i] &&
                                        <HoldButton onClick={diceHold} value={i} hold={localHold[i]} x1={boxX} y1={boxY} x2={placeX[i]}>
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
                                        {hold[i] &&
                                            <HoldButton onClick={diceHold} value={i} hold={localHold[i]} x1={boxX} y1={boxY}>
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