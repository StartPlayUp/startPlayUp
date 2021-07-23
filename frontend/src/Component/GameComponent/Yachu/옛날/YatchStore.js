import React, { useRef, useState, useEffect, useContext } from "react";
import Calculate from "Container/GameContainer/Yacht/calculate";
import { sendDataToPeers } from 'Common/peerModule/sendToPeers/index.js';
import { PeerDataContext, PeersContext, UserContext } from 'Routes/peerStore';
import { GAME, YACHT } from 'Constants/peerDataTypes.js';

const DiceStore=React.createContext();
const PlayerData=React.createContext();
const YachuProvider=({children})=>{
    const {peers} = useContext(PeersContext);
    const {peerData}=useContext(PeerDataContext);
    const [diceState,setDiceState]=useState({ //주사위 관련된 state
        dice:[0,0,0,0,0],
        hold:[false,false,false,false,false],
        rollCount:3
    })

    const [nowTurn,setTurn]=useState(0); //현재 턴을 나타내는 state
    let counter=[0,0,0,0,0,0]; //주사위 같은 눈의 개수를 저장하는 배열
    const nickname = localStorage.getItem('nickname');
    const [halt,setHalt]=useState(false); //사용자의 턴인지 (true),아닌지(false)나타내는 state
    const [nowTurnNickname, setTurnName] = useState(nickname); // 누구의 턴인지 저장하는 state
    const [playerData,setPlayer]=useState([{//게임의 데이터
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
        bonus: [0, false],
        myTurn:0}
    ])
    const startGame=()=>{//게임에 접속한 사람들의 정보를 저장 후 뿌려줌
        const nickname = localStorage.getItem('nickname');
        const playerArr = [...playerData];
        const nextTurn=parseInt((playerArr[playerArr.length-1].myTurn)+1,10)
        peers.forEach((i) => {
            playerArr.push({
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
                bonus: [0, false],
                myTurn:nextTurn
            });
        })
        sendDataToPeers(GAME, { game: YACHT, nickname, peers, data: { dice:diceState.dice,rollCount:3, playerArr, nowTurnNickname, halt:false,nowTurn:0 } });
        setPlayer(playerArr);
        setHalt(true);
    }
    const RollDice=()=>{//주사위 굴리는 함수
        let diceArray=[...diceState.dice];
        for (var i = 0; i < 5; i++) {
            if (!diceState.hold[i]) {
                const num = Math.floor(Math.random() * 6 + 1);
                diceArray[i] = num;
            }
        }
        let test = diceArray.filter((i) => { if (typeof (i) === "number" && (i > 0 && i < 7)) { return i } })//주사위 검사 1~6까지의 숫자만 있는지 확인
        if (test.length === 5 && diceArray.length === 5) {//5개를 굴리므로 5길이가 5인지 검사함
            counter=Count(diceArray);// 주사위 같은 눈을 계산
            let test = counter.map((j) => { if (typeof (j) === "number" && (j >= 0 && j < 6)) { return j } })//주사위 개수의 검사 0개부터 5개까지만 있는지 검사
            if (test.length === 6 && counter.length === 6) {//1~6까지이므로 길이가 6인지 검사함
                let pointCalculate = Calculate(diceArray, counter);//얻을 수 있는 점수 계산
                let playerArr=[...playerData];
                Object.keys(playerArr[nowTurn].selectPoint).map((i) => {
                    if (!playerArr[nowTurn].selectPoint[i][1]) {
                        playerArr[nowTurn].selectPoint[i][0] = pointCalculate[i];
                    }
                })
                setDiceState({
                    ...diceState,
                    dice: diceArray,
                    rollCount: diceState.rollCount - 1
                })
                setPlayer(playerArr);
                sendDataToPeers(GAME, { game: YACHT, nickname, peers, data: { dice: diceArray, rollCount: diceState.rollCount - 1, playerArr, halt:false, nowTurnNickname,...nowTurn } });
            }
            else{
                alert("주사위 계산에 오류가 생겼습니다. 다시 주사위를 굴려주세요.")
                setDiceState({
                    ...diceState
                })
            }
        }else{
            alert("주사위를 굴리는 도중 오류가 생겼습니다. 다시 주사위를 굴려주세요.")
            setDiceState({
                ...diceState
            })
        }
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
    const rollReset=()=>{//선택 후 초기화
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

    function selectData(e){ //계산한 점수를 얻는 함수
        const { value, name } = e.target;
        const number = parseInt(value, 10);
        let playerArr=[...playerData]
        playerArr[nowTurn].selectPoint[name]=[number,true]
        playerArr[nowTurn].result+=number;
        rollReset();
        if(diceState.dice!==[0,0,0,0,0] ||diceState.hold!==[false,false,false,false,false]||diceState.rollCount!==3){
            rollReset();
        }
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
        if(nowTurn === playerData.length - 1){//다음 턴을 계산
            setTurn(0)
            setHalt(false)
            setTurnName(playerData[0].nickname)
            sendDataToPeers(GAME, { game: YACHT, nickname, peers, data: { dice: [0, 0, 0, 0, 0], rollCount: 3, playerArr, halt:true, nowTurnNickname: playerData[0].nickname,nowTurn:0  } });
        }
        else{
            setHalt(false)
            setTurn(1)
            setTurnName(playerData[1].nickname)
            sendDataToPeers(GAME, { game: YACHT, nickname, peers, data: { dice: [0, 0, 0, 0, 0], rollCount: 3, playerArr, halt:true, nowTurnNickname: playerData[0].nickname,nowTurn:1 } });
        }
    }
    useEffect(()=>{//다른 사용자가 데이터를 보낸 경우 처리
        if (peerData.type === GAME && peerData.game === YACHT){ //만약 도착한 데이터가 잘못 된 데이터인 경우 다시 요청 하기? 어떻게?
            const data = peerData.data;
            console.log(data)
            setDiceState({
                ...diceState,
                dice:data.dice,
                rollCount:data.rollCount
            })
            setHalt(data.halt)
            setTurn(data.nowTurn)
            setPlayer([...data.playerArr])
            setTurnName(data.nowTurnNickname);
        }
    },[peerData])

    return (
        <PlayerData.Provider value={//게임 데이터를 표시
            { playerData: playerData,nowTurn:nowTurn, nowTurnNickname:nowTurnNickname,selectData,halt:halt}
        }>
            <DiceStore.Provider value={//주사위 데이터를 표시
                {   diceState:diceState,
                    halt: halt,
                    RollDice,
                    diceHold,
                    startGame
                }
            }>
                {children}
            </DiceStore.Provider>
        </PlayerData.Provider>
    )
}
export {DiceStore,PlayerData,YachuProvider};