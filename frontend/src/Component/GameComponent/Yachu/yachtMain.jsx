import React, { Fragment, useState, useEffect, useContext } from "react";
import Calculate from "./calculate";
import { sendDataToPeers } from 'Common/peerModule/sendToPeers/index.js';
import { PeerDataContext, PeersContext } from 'Routes/peerStore';
import { GAME, YACHT } from 'Constants/peerDataTypes.js';
import dice1 from './dice/dice1.png';
import styled from 'styled-components';
const Table = styled.table`
    display:flex;
    width: fit-content;
    height: fit-content;
    border: 3px solid;
    background-color: white;
    justify-content: center;
    table,th,td{
        border:1px solid;
        border-collapse : collapse;
        text-align: center;
    }
`
const Button = styled.button`
    width: 100%;
`
function YachtMain() {
    const [state, setState] = useState({
        dice: [0, 0, 0, 0, 0], //주사위
        hold: [false, false, false, false, false], //주사위 홀드
        count: [0, 0, 0, 0, 0, 0], //같은 주사위의 눈 계산
        roll: 3 //주사위 던질 수 있는 남은 횟수
    });
    const findMyTurn = (array, value) => {
        for (var i = 0; i < 2; i++) {
            if (array[i].nickname === value) {
                return i;
            }
        }
        return -1;
    }
    const [oneResult, setOneResult] = useState(0); //1P의  점수
    const [twoResult, setTwoResult] = useState(0); //2P의 점수
    const [turn, setTurn] = useState(0); //0인 경우 1P의 턴터,1인경우 2P의 턴
    const [bonus, setBonus] = useState([0, false]); //ace~six까지의 합계가 63점이 넘을 때 받을 보너스
    const [bonus2, setBonus2] = useState([0, false]); //ace~six까지의 합계가 63점이 넘을 때 받을 보너스
    const { peers } = useContext(PeersContext);
    const { peerData } = useContext(PeerDataContext);
    const nickname = localStorage.getItem('nickname');
    const [player, setPlayer] = useState({
    });
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
                alert("1P의 승리입니다.");
            } else if (oneResult === twoResult) {
                alert("무승부 입니다.")
            }
            else {
                alert("2P의 승리입니다.");
            }
        }
    }
    function startGame() {
        const playerData = [{ nickname }]
        console.log("playerData", playerData);
        peers.forEach((i) => {
            playerData.push({ nickname: i.nickname })
        });
        console.log("playerData", playerData);
        const myTurn = findMyTurn(playerData, nickname);
        console.log("마이턴", myTurn)
        setPlayer({
            ...playerData
        })
        const peerTest = "STARTGAME!"
        sendDataToPeers(GAME, { nickname, peers, game: YACHT, data: { peerTest, myTurn, playerData } })
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
    const RollReset = () => {
        //점수를 선택했을 때 주사위 관련 변수 초기화
        setState({
            ...state,
            dice: [0, 0, 0, 0, 0],
            hold: [false, false, false, false, false],
            count: [0, 0, 0, 0, 0, 0],
            roll: 3
        });
        Object.keys(selectPoint).map((i) => {
            if (!selectPoint[i][1]) {
                selectPoint[i][0] = 0;
            }
        });
        Object.keys(selectPoint2).map((i) => {
            if (!selectPoint2[i][1]) {
                selectPoint2[i][0] = 0;
            }
        });
    };
    function RollDice() {
        const testArray = player
        const isTurn = findMyTurn(testArray, nickname)
        console.log(player)
        if (isTurn === turn) {
            const rollCount = state.roll - 1;
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
            const peerTest = "ROLL!";
            sendDataToPeers(GAME, { nickname, peers, game: YACHT, data: { peerTest, diceArray, counter, rollCount } })
        }
        else {
            alert("당신의 턴이 아닙니다.");
        }
    }
    let diceArray = state.dice;
    let counter = state.count;
    let pointCalculate = Calculate(diceArray, counter); //얻을 수 있는 점수 계산
    if (turn === 0) {
        Object.keys(selectPoint).map((i) => {
            if (!selectPoint[i][1]) {
                selectPoint[i][0] = pointCalculate[i];
            }
        });
    } else if (turn === 1) {
        Object.keys(selectPoint2).map((i) => {
            if (!selectPoint2[i][1]) {
                selectPoint2[i][0] = pointCalculate[i];
            }
        });
    }
    function diceHold(e) {
        //주사위를 홀드하도록 하는 함수
        const testArray = player
        const isTurn = findMyTurn(testArray, nickname)
        console.log(player)
        if (isTurn === turn) {
            const { value } = e.target;
            let holding = state.hold;
            holding[value] = !holding[value];
            setState({
                ...state,
                hold: holding
            });
        }
        else {
            alert("당신의 턴이 아닙니다.");
        }
    }
    function select(e) {
        const testArray = player
        const isTurn = findMyTurn(testArray, nickname)
        //버튼을 눌렀을 때 실제로 먹은 점수를 계산하도록 하는 함수
        const { value, name } = e.target;
        const number = parseInt(value, 10);
        const peerTest = "Select!";
        var check = 0;
        if (turn === 0 && isTurn === turn) {
            //1P의 턴인 경우
            setSelectPoint({
                ...selectPoint,
                [name]: [value, true] //점수를 먹었으므로 false->true
            });
            check = number
            RollReset();
            setOneResult(oneResult + check);
            sendDataToPeers(GAME, { nickname, peers, game: YACHT, data: { peerTest, name, value, check, turn } })
            //1P의 점수 + 선택한 점수
            setTurn(1); //2P의 턴으로 변경

            console.log("2P의 턴입니다.");
        } else if (turn === 1 && isTurn === turn) {
            //2P인 경우
            setSelectPoint2({
                ...selectPoint2,
                [name]: [value, true]
            });
            check = number
            RollReset();
            setTwoResult(twoResult + check);
            sendDataToPeers(GAME, { nickname, peers, game: YACHT, data: { peerTest, name, value, check, turn } })
            setTurn(0);
            console.log("1P의 턴입니다.");
        }
        else {
            alert("당신의 턴이 아닙니다.");
        }
    }
    useEffect(() => {
        let sel = Object.keys(selectPoint).map((i) => {
            return selectPoint[i][0];
        });
        //ace~six까지 뽑아낸 후 합계를 구함
        let test = sel.slice(0, 6).reduce((total, num) => {
            return parseInt(total, 10) + parseInt(num, 10);
        });
        if (test < 63 && !bonus[1]) {
            let complete = Object.keys(selectPoint).map((i) => {
                return selectPoint[i][1];
            });
            let completeTest = !complete.slice(0, 6).includes(false);
            console.log("completeTest", completeTest);
            setBonus([test, completeTest]);
        }
        else if (test >= 63 && !bonus[1]) {
            console.log("hihi");
            setBonus([test, true]);
            setOneResult(oneResult + parseInt(35, 10));
        }
    }, [selectPoint]);
    useEffect(() => {
        let sel = Object.keys(selectPoint2).map((i) => {
            return selectPoint2[i][0];
        });
        let test = sel.slice(0, 6).reduce((total, num) => {
            return parseInt(total, 10) + parseInt(num, 10);
        });
        if (test < 63 && !bonus2[1]) {
            let complete = Object.keys(selectPoint2).map((i) => {
                return selectPoint2[i][1];
            });
            let completeTest = !complete.slice(0, 6).includes(false);
            console.log("completeTest", completeTest);
            setBonus2([test, completeTest]);
        }
        else if (test >= 63 && !bonus2[1]) {
            setBonus2([test, true]);
            setTwoResult(twoResult + parseInt(35, 10));
        }
    }, [selectPoint2]);
    //각 플레이어들이 점수를 먹었는지 확인한 후 먹었으면 bonus 변수를 계산함
    useEffect(() => {
        if (peerData.type === GAME && peerData.game === YACHT) {
            const data = peerData.data;
            Object.keys(data).map((i) => {
                if (data[i] === "STARTGAME!") {
                    const myTurn = findMyTurn(data.playerData, nickname);
                    console.log("마이턴", myTurn);
                    setPlayer({
                        ...data.playerData
                    })
                }
                else if (data[i] === "ROLL!") {
                    setState({
                        ...state,
                        dice: data.diceArray,
                        count: data.counter,
                        roll: data.rollCount
                    })
                }
                else if (data[i] === "Select!" && data.turn === 0) {//1P가 보낸 경우
                    setSelectPoint({
                        ...selectPoint,
                        [data.name]: [data.value, true]
                    });
                    RollReset();
                    setOneResult(oneResult + data.check);
                    setTurn(1);
                }
                else if (data[i] === "Select!" && data.turn === 1) {//2P가 보낸 경우
                    setSelectPoint2({
                        ...selectPoint2,
                        [data.name]: [data.value, true]
                    });
                    RollReset();
                    setTwoResult(twoResult + data.check);
                    setTurn(0);
                }
            });
        }
    }, [peerData]);
    GameOver();
    return (
        <Fragment>
            <Table>
                <tbody>
                    <tr><th>점수표</th><th>1P 점수표</th><th>2P 점수표</th></tr>
                    {Object.keys(selectPoint).map((i, index) => (
                        <tr key={index}>
                            <td>
                                {i}
                            </td>
                            <td>
                                {state.roll === 3 ? (
                                    <div>
                                        {selectPoint[i][0]}
                                    </div>
                                ) : turn === 0 ? (
                                    <Button
                                        disabled={selectPoint[i][1] ? 1 : 0}
                                        name={i}
                                        onClick={select}
                                        value={pointCalculate[i]}
                                    >
                                        {selectPoint[i][0]}
                                    </Button>) :
                                    <div>
                                        {selectPoint[i][0]}
                                    </div>
                                }

                            </td>
                            <td>
                                {state.roll === 3 ? (
                                    <div>
                                        {selectPoint2[i][0]}
                                    </div>
                                ) : turn === 1 ? (
                                    <Button
                                        disabled={selectPoint2[i][1] ? 1 : 0}
                                        name={i}
                                        onClick={select}
                                        value={pointCalculate[i]}
                                    >
                                        {selectPoint2[i][0]}
                                    </Button>)
                                    : <div>{selectPoint2[i][0]}</div>
                                }
                            </td>

                        </tr>
                    ))}
                    <tr>
                        <td><div>보너스</div></td>
                        <td><div>{bonus[0]}</div></td>
                        <td><div>{bonus2[0]}</div></td>
                    </tr>
                    <tr>
                        <td><div>총 합계</div></td>
                        <td><div>{oneResult}</div></td>
                        <td><div>{twoResult}</div></td>
                    </tr>
                </tbody>
            </Table>
            <div>
                <div>주사위 <img src={dice1} /></div>
                {state.roll === 3 ? (
                    ""
                ) : (
                    <div>
                        홀드버튼 :
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
                )}
            </div>
            <div>남은횟수 {state.roll}</div>
            <div>
                <button onClick={startGame}>게임시작</button>
                <button disabled={state.roll ? "" : state.roll >= 0} onClick={RollDice}>
                    RollDice!
                </button>
            </div>
        </Fragment>
    );
}


export default YachtMain;