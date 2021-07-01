import React, { Fragment, useState, useEffect,useContext } from "react";
import Calculate from "./calculate";
import { sendDataToPeers } from 'Common/peerModule/sendToPeers/index.js';
import { PeerDataContext, PeersContext, UserContext } from 'store';
import {GAME,YACHT} from 'Constants/peerDataTypes.js';
const Dice = () => {
    const [state, setState] = useState({
        dice: [0, 0, 0, 0, 0], //주사위
        hold: [false, false, false, false, false], //주사위 홀드
        count: [0, 0, 0, 0, 0, 0], //같은 주사위의 눈 계산
        roll: 3 //주사위 던질 수 있는 남은 횟수
    });
    const [oneResult, setOneResult] = useState(0); //1P의  점수
    const [twoResult, setTwoResult] = useState(0); //2P의 점수
    const [turn, setTurn] = useState(0); //0인 경우 1P의 턴터,1인경우 2P의 턴
    const [bonus, setBonus] = useState([0, false]); //ace~six까지의 합계가 63점이 넘을 때 받을 보너스
    const [bonus2, setBonus2] = useState([0, false]); //ace~six까지의 합계가 63점이 넘을 때 받을 보너스
    
    const [selectPoint, setSelectPoint] = useState({
        //1P 점수
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
    });
    const [selectPoint2, setSelectPoint2] = useState({
        //2P 점수
        ace: [0, false],
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
    });
    //게임이 끝났는지 확인 하는 점수
    function GameOver() {
        let complete = Object.keys(selectPoint2).map((i) => {
            return selectPoint2[i][1];
        });
        //만약 2P가 먹지 못한 점수가 있는지 확인
        let completeTest = !complete.includes(false);
        console.log("끝났는가?", completeTest);
        if (completeTest) {
            if (oneResult > twoResult) {
                console.log("1P의 승리입니다.");
            } else {
                console.log("2P의 승리입니다.");
            }
        }
    }
    //주사위를 굴리는 함수
    function RollDice() {
        const rollCount = state.roll-1;
        let diceArray = [...state.dice];
        var i = 0;
        for (i = 0; i < 5; i++) {
            if (!state.hold[i]) {
                //홀드하지 않았다면
                const num = Math.floor(Math.random() * 6 + 1);
                diceArray[i] = num;
            }
        }
        let counter = Count(diceArray);
        setState({
            ...state,
            dice: diceArray,
            count: counter,
            roll: rollCount
        });
        
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
    const RollReset = (test) => {
        //점수를 선택했을 때 주사위 관련 변수 초기화
        setState({
            ...state,
            dice: [0, 0, 0, 0, 0],
            hold: [false, false, false, false, false],
            count: [0, 0, 0, 0, 0, 0],
            roll: 3
        });
        if (turn === 0) {
            //1P의 턴이면
            setOneResult(oneResult + test); //1P의 점수 + 선택한 점수
        } else {
            //2P의 턴이면
            setTwoResult(twoResult + test); //2P의 점수 + 선택한 점수
        }
    };
    function diceHold(e) {
        //주사위를 홀드하도록 하는 함수
        const { value } = e.target;
        let holding = state.hold;
        holding[value] = !holding[value];
        setState({
            ...state,
            hold: holding
        });
    }
    let diceArray = state.dice;
    let counter = state.count;
    let pointCalculate = Calculate(diceArray, counter); //얻을 수 있는 점수 계산
    function select(e) {
        //버튼을 눌렀을 때 실제로 먹은 점수를 계산하도록 하는 함수
        const { value, name } = e.target;
        const number = parseInt(value, 10);
        if (turn === 0) {
            //1P의 턴인 경우
            setSelectPoint({
                ...selectPoint,
                [name]: [value, true] //점수를 먹었으므로 false->true
            });
            console.log("bonus", bonus);
            if (bonus[0] > 63 && !bonus[1]) {
                //보너스 기준 만족하는지 확인
                RollReset(number + parseInt(35, 10));
                console.log("1P의 bonus 획득!");
            } else {
                RollReset(number);
            }
            setTurn(1); //2P의 턴으로 변경
            sendDataToPeers(GAME,{nickname,peers,game:YACHT,data:{...selectPoint,name:[value,true]}})
            console.log("2P의 턴입니다.");
        } else {
            //2P인 경우
            setSelectPoint2({
                ...selectPoint2,
                [name]: [value, true]
            });
            if (bonus2[0] > 63 && !bonus2[1]) {
                RollReset(number + parseInt(35, 10));
                console.log("2P의 bonus 획득!");
            } else {
                RollReset(number);
            }
            setTurn(0);
            console.log("1P의 턴입니다.");
        }
    }
    //각 플레이어들이 점수를 먹었는지 확인한 후 먹었으면 bonus 변수를 계산함
    useEffect(() => {
        let sel = Object.keys(selectPoint).map((i) => {
            return selectPoint[i][0];
        });
        //ace~six까지 뽑아낸 후 합계를 구함
        let test = sel.slice(0, 6).reduce((total, num) => {
            return parseInt(total, 10) + parseInt(num, 10);
        });
        let complete = Object.keys(selectPoint).map((i) => {
            return selectPoint[i][1];
        });
        let completeTest = !complete.slice(0, 6).includes(false);
        console.log("completeTest", completeTest);
        setBonus([test, completeTest]);
    }, [selectPoint]);
    useEffect(() => {
        let sel = Object.keys(selectPoint2).map((i) => {
            return selectPoint2[i][0];
        });
        let test = sel.slice(0, 6).reduce((total, num) => {
            return parseInt(total, 10) + parseInt(num, 10);
        });
        let complete = Object.keys(selectPoint2).map((i) => {
            return selectPoint2[i][1];
        });
        let completeTest = !complete.slice(0, 6).includes(false);
        setBonus2([test, completeTest]);
    }, [selectPoint2]);
    GameOver();
    return (
        <Fragment>
            <div>주사위 {state.dice}</div>
            {state.roll === 3 ? (
                ""
            ) : (
                <div>
                    홀드버튼 :
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
            )}
            <div>{state.count}</div>
            <div>남은횟수 {state.roll}</div>
            <button disabled={state.roll ? "" : state.roll >= 0} onClick={RollDice}>
                RollDice!
      </button>
            <div>
                {Object.keys(selectPoint).map((i, index) => (
                    <div key={index}>
                        {i}: {pointCalculate[i]} 1P의 점수 {selectPoint[i][0]} 2P의 점수{" "}
                        {selectPoint2[i][0]}
                        {state.roll === 3 ? (
                            ""
                        ) : turn === 0 ? (
                            <button
                                disabled={selectPoint[i][1] ? 1 : 0}
                                name={i}
                                onClick={select}
                                value={pointCalculate[i]}
                            >
                                1P 점수 select
                            </button>
                        ) : (
                            <button
                                disabled={selectPoint2[i][1] ? 1 : 0}
                                name={i}
                                onClick={select}
                                value={pointCalculate[i]}
                            >
                                2P 점수 select
                            </button>
                        )}
                    </div>
                ))}
                <div>1P 보너스 : {bonus[0]}</div>
                <div>2P 보너스 : {bonus2[0]}</div>
                <div>1P 점수 : {oneResult}</div>
                <div>2P 점수 : {twoResult}</div>
            </div>
        </Fragment>
    );
};
export default Dice;

