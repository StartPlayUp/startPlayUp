import React, { useRef, useState, useEffect, useContext,useReducer } from "react";
import Calculate from "Container/GameContainer/Yacht/calculate";
import { sendDataToPeers } from 'Common/peerModule/sendToPeers/index.js';
import { PeerDataContext, PeersContext, UserContext } from 'Routes/peerStore';
import { GAME, YACHT } from 'Constants/peerDataTypes.js';
import { map } from "lodash";
import axios from "axios";


const ROLLDICE = "RollDice";
const SELECT = "SELECT";
const STARTGAME = "StartGame";
const GET_DATA_FROM_PEER = 'GET_DATA_FROM_PEER';
const DICEHOLD = 'DICEHOLD';
const ROLLRESET = 'ROLLRESET';
const UPDATE_PEERS = "UPDATE_PEERS"
const DiceStore=React.createContext();
const PlayerData=React.createContext();
const TimerData = React.createContext();
const PlayerNickName = React.createContext();


const initialState={
    dice: [0, 0, 0, 0, 0],
    count: [0, 0, 0, 0, 0, 0],
    hold: [false, false, false, false, false],
    rollCount: 3,
    playerData: [ {
        nickname: "",
        fullNickname:"",
        selectPoint: {
            highRanking:{
                ace: [0, false], //true 획득한 점수 , false 아직 획득 하지 않은 점수
                two: [0, false],
                three: [0, false],
                four: [0, false],
                five: [0, false],
                six: [0, false]
            },
            lowerRanking: {
                threeOfaKind: [0, false],
                fourOfaKind: [0, false],
                fullHouse: [0, false],
                smallStraight: [0, false],
                largeStraight: [0, false],
                choice: [0, false],
                yahtzee: [0, false]
            }
        },
        result: 0,
        bonus: [0, false]
        },
        {
            nickname: "",
            fullNickname:"",
            selectPoint: {
                highRanking:{
                    ace: [0, false], //true 획득한 점수 , false 아직 획득 하지 않은 점수
                    two: [0, false],
                    three: [0, false],
                    four: [0, false],
                    five: [0, false],
                    six: [0, false]
                },
                lowerRanking: {
                    threeOfaKind: [0, false],
                    fourOfaKind: [0, false],
                    fullHouse: [0, false],
                    smallStraight: [0, false],
                    largeStraight: [0, false],
                    choice: [0, false],
                    yahtzee: [0, false]
                }
        },
            result: 0,
            bonus: [0, false]
        } ]
}
const reducer=(state,action)=>{
    switch (action.type) {
        case UPDATE_PEERS: {
            return { ...state, peers: action.peers }
        }
        case GET_DATA_FROM_PEER: {
            return { ...state, ...action.data }
        }
        case STARTGAME: {
            return { ...state, playerData: action.playerData };
        }
        case ROLLDICE: {
            return { ...state, dice: action.diceArray, count: action.counter, playerData: action.player, rollCount: state.rollCount - 1 }
        }
        case ROLLRESET: {
            return { ...state, dice: [0, 0, 0, 0, 0], count: [0, 0, 0, 0, 0, 0], rollCount: 3, hold: [false, false, false, false, false] }
        }
        case DICEHOLD: {
            return { ...state, hold:action.holding }
        }
        case SELECT: {
            return { ...state, playerData: action.player }
        }
        default: {
            return { ...state }
        }
    }
}
const Roll = (state) => {
    let diceArray = [...state.dice];
    for (var i = 0; i < 5; i++) {
        if (!state.hold[i]) {
            const num = Math.floor(Math.random() * 6 + 1);
            diceArray[i] = num;
        }
    }
    return diceArray;
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
    console.assert(!(counter === [0, 0, 0, 0, 0, 0]), "count 계산 되지 않음");
    return counter;
}
const YachuProvider = ({ children }) => {
    const nicknameString = localStorage.getItem('nickname');
    let nicknameArray = nicknameString.split(" ")
    const nickname = nicknameArray[0]
    const {peers} = useContext(PeersContext);
    const {peerData}=useContext(PeerDataContext);
    const [state,dispatch]=useReducer(reducer,initialState);
    const [nowTurn, setTurn] = useState(0);
    const [halt,setHalt]=useState(false);
    const [nowTurnNickname, setTurnName] = useState(nickname); // 누구의 턴인지 저장하는 state
    const [endGame,setGame]=useState(false);
    const [resultScore, setResultScore] = useState({
        
    })
    function RollDice() {
        let diceArray = [0, 0, 0, 0, 0];
        let counter = [...state.count]
        //let pointCalculate = []
        diceArray = Roll(state);
        let test = diceArray.filter((i) => { if (typeof (i) === "number" && (i > 0 && i < 7)) { return i } })//주사위 검사 1~6까지의 숫자만 있는지 확인
        if (test.length === 5 && diceArray.length === 5) {//5개를 굴리므로 5길이가 5인지 검사함
            counter = Count(diceArray);
            let test = counter.map((j) => { if (typeof (j) === "number" && (j >= 0 && j < 6)) { return j } })//주사위 개수의 검사 0개부터 5개까지만 있는지 검사
            if (test.length === 6 && counter.length === 6) {//1~6까지이므로 길이가 6인지 검사함
                //pointCalculate = Calculate(diceArray, counter);
                const { upperPoint, lowerPoint} = Calculate(diceArray, counter);
                console.log(upperPoint, lowerPoint);
                const player = [...state.playerData]
                Object.keys(upperPoint).map((i) => {
                    if (!player[nowTurn].selectPoint.highRanking[i][1]) {
                        player[nowTurn].selectPoint.highRanking[i][0] = upperPoint[i];
                    }
                })
                Object.keys(lowerPoint).map((i) => {
                    if (!player[nowTurn].selectPoint.lowerRanking[i][1]) {
                        player[nowTurn].selectPoint.lowerRanking[i][0] = lowerPoint[i];
                    }
                })
                const verification = ROLLDICE;
                sendDataToPeers(GAME, { game: YACHT, nickname, peers, data: { verification, playerData: player, dice: diceArray, count: counter,rollCount:state.rollCount - 1 } });
                dispatch({ type: ROLLDICE, player, diceArray, counter })

            }
            else {
                console.assert(test.length === 6 && counter.length === 6, "주사위 개수가 범위를 벗어났습니다.")
                alert("주사위 계산 오류")
            }
        }
        else {
            console.assert(test === 5 && diceArray.length === 5, "주사위가 돌지 않았습니다.")
            alert("주사위 던지기 오류")
        }
    }
    function diceHold(value) {
        let holding = [...state.hold]
        holding[value] = !holding[value];
        sendDataToPeers(GAME, { game: YACHT, nickname, peers, data: { hold:holding} });
        dispatch({ type: DICEHOLD, holding })
        console.log(state.playerData[0].fullNickname)
    }
    function selectData(name,value) {
        const player = [...state.playerData]
        const highRankings = ['ace', 'two', 'three', 'four', 'five', 'six'];
        if (highRankings.includes(name)) {
            player[nowTurn].selectPoint.highRanking[name] = [value, true];
        }
        else {
            player[nowTurn].selectPoint.lowerRanking[name] = [value, true];
        }
        player[nowTurn].result += parseInt(value, 10);
        //선택 후 값 리셋하기
        Object.keys(player[nowTurn].selectPoint.highRanking).map((i) => {
            if (!player[nowTurn].selectPoint.highRanking[i][1]) {
                player[nowTurn].selectPoint.highRanking[i][0] = 0;
            }
        })
        Object.keys(player[nowTurn].selectPoint.lowerRanking).map((i) => {
            if (!player[nowTurn].selectPoint.lowerRanking[i][1]) {
                player[nowTurn].selectPoint.lowerRanking[i][0] = 0;
            }
        })
        //result 구하기
        dispatch({ type: ROLLRESET });
        if (!player[nowTurn].bonus[1]) {
            //보나리 구하기
            let bonusTemp = Object.keys(player[nowTurn].selectPoint.highRanking).map((i) => {
                return player[nowTurn].selectPoint.highRanking[i][0];
            });
            //1~6까지 쪼개기
            var bonusTest = bonusTemp.reduce((total, num) => {
                return parseInt(total, 10) + parseInt(num, 10);
            });
            /*
            if (bonusTest < 63) {
                let complete = Object.keys(player[nowTurn].selectPoint.highRanking).map((i) => {
                    return player[nowTurn].selectPoint.highRanking[i][1];
                });
                let completeTest = !complete.includes(false);
                console.log("completeTest", completeTest);
                player[nowTurn].bonus = [bonusTest, completeTest];
            }*/
            if (bonusTest >= 63) {
                player[nowTurn].bonus = [bonusTest, true];
                player[nowTurn].result += 35;
            }
        }
        gameOver();
        if (nowTurn === player.length - 1){
            setTurn(0)
            setHalt(false)
            setTurnName(player[0].nickname)
            const verification = SELECT;
            sendDataToPeers(GAME, { game: YACHT, nickname, peers, data: { verification, playerData: player, nowTurn: 0, nowTurnNickname: nowTurnNickname, halt: true } })
            //sendDataToPeers(GAME, { game: YACHT, nickname, peers, data: { verification, playerData: player, nowTurn: 0, halt: true } })
            dispatch({ type: SELECT, player})
        }
        else{
            setTurn(1)
            setHalt(false)
            setTurnName(player[1].nickname)
            const verification = SELECT;
            sendDataToPeers(GAME, { game: YACHT, nickname, peers, data: { verification, playerData: player, nowTurn: 1, nowTurnNickname: nowTurnNickname, halt: true  } })
            //sendDataToPeers(GAME, { game: YACHT, nickname, peers, data: { verification, playerData: player, nowTurn: 1, halt: true  } })
            dispatch({ type: SELECT, player })
        }
    }
    function gameOver() {
        const player = [...state.playerData]
        //선택 후 값 리셋하기
        let completeHighRanking = Object.keys(player[1].selectPoint.highRanking).map((i) => {
            return (player[1].selectPoint.highRanking[i][1])
        })
        let completeLowerRanking = Object.keys(player[1].selectPoint.lowerRanking).map((i) => {
            return (player[1].selectPoint.lowerRanking[i][1])
        })
        //만약 2P가 먹지 못한 점수가 있는지 확인
        let completeTestHighRanking = !completeHighRanking.includes(false);
        let completeTestLowerRanking = !completeLowerRanking.includes(false);
        if (completeTestHighRanking && completeTestLowerRanking) {
            setGame(true);
            const verification="ENDGAME"
            sendDataToPeers(GAME, { game: YACHT, nickname, peers, data: { verification,endGame:true } })
        }
    }
    function gameResultUpload(history) {
        const player = [...state.playerData]
        if (player[0].result > player[1].result && player[0].fullNickname===nicknameString) {
                const winnerLoserList=[{
                    nickname: player[0].fullNickname,
                    winner:true
                }, {
                    nickname: player[1].fullNickname,
                    winner:false
                }]
            const resultUpload = {
                method: 'post',
                url: 'http://localhost:4000/api/user/updateGameResult',
                data:{
                    userList: winnerLoserList
                }
            }
            console.log(resultUpload)
                axios(resultUpload)
                    .then(function (response) {
                        console.log(response)
                        if (response.data.success) {
                            console.log("데이터 업로드 성공")
                            history.push('/main')
                        } else {
                            alert("데이터 업로드에 실패했습니다. 대기방으로 돌아갑니다.")
                            setTimeout(function () {
                                history.push('/main')
                            }, 2000);
                        }
                    })
            } else if(player[0].result < player[1].result && player[1].fullNickname===nicknameString) {
                const winnerLoserList=[{
                    nickname: player[1].fullNickname,
                    winner:true
                }, {
                    nickname: player[0].fullNickname,
                    winner:false
                }]
                const resultUpload = {
                    method: 'post',
                    url: 'http://localhost:4000/api/user/updateGameResult',
                    data:{
                    userList: winnerLoserList
                }
                }
                axios(resultUpload)
                    .then(function (response) {
                        if (response.data.success) {
                            console.log("데이터 업로드 성공")
                            history.push('/main')
                        } else {
                            alert("데이터 업로드에 실패했습니다. 대기방으로 돌아갑니다.")
                            setTimeout(function () {
                                history.push('/main')
                            }, 2000);
                        }
                })
        }
        else {
            history.push('/main')
        }
    }
    function StartGame() {
        let playerData = [...state.playerData];
        console.log(peers)
        const peersNicknameString = peers[0].nickname;
        let peersNicknameArray = peersNicknameString.split(" ")
        const peersNickname = peersNicknameArray[0]
        console.log(nickname)
        playerData= [{
            nickname: nickname,
            fullNickname:nicknameString,
            selectPoint: {
                highRanking:{
                    ace: [0, false], //true 획득한 점수 , false 아직 획득 하지 않은 점수
                    two: [0, false],
                    three: [0, false],
                    four: [0, false],
                    five: [0, false],
                    six: [0, false]
                },
                lowerRanking: {
                    threeOfaKind: [0, false],
                    fourOfaKind: [0, false],
                    fullHouse: [0, false],
                    smallStraight: [0, false],
                    largeStraight: [0, false],
                    choice: [0, false],
                    yahtzee: [0, false]
                }
            },
            result: 0,
            bonus: [0, false]
            },
            {
                nickname: peersNickname,
                fullNickname:peersNicknameString,
                selectPoint: {
                    highRanking:{
                        ace: [0, false], //true 획득한 점수 , false 아직 획득 하지 않은 점수
                        two: [0, false],
                        three: [0, false],
                        four: [0, false],
                        five: [0, false],
                        six: [0, false]
                    },
                    lowerRanking: {
                        threeOfaKind: [0, false],
                        fourOfaKind: [0, false],
                        fullHouse: [0, false],
                        smallStraight: [0, false],
                        largeStraight: [0, false],
                        choice: [0, false],
                        yahtzee: [0, false]
                    }
            },
                result: 0,
                bonus: [0, false]
            } ]
        const nowTurnNickname = playerData[0].nickname;
        const result = { ...initialState, nowTurnNickname, playerData };
        //const result = { ...initialState,playerData };
        sendDataToPeers(GAME, { game: YACHT, nickname, peers, data: result });
        dispatch({ type: STARTGAME, playerData, nowTurnNickname })
        //dispatch({ type: STARTGAME, playerData})
        setHalt(true)
        //dispatch({ type: StartGame, peers })
    }
    function timeOver(){
        if (halt === true) {
            let upperNameList = ["ace", "two", "three", "four", "five", "six"]
            let lowerNameList = ["threeOfaKind", "fourOfaKind", "fullHouse", "smallStraight", "largeStraight", "choice", "yahtzee"]
            const dice = [...state.dice]
            let completeHighRanking = Object.keys(state.playerData[nowTurn].selectPoint.highRanking).map((i) => {
                return (state.playerData[nowTurn].selectPoint.highRanking[i][1])
            })
            let completeLowerRanking = Object.keys(state.playerData[nowTurn].selectPoint.lowerRanking).map((i) => {
                return (state.playerData[nowTurn].selectPoint.lowerRanking[i][1])
            })
            let completeTestHighRanking = completeHighRanking.includes(false);
            let completeTestLowerRanking = completeLowerRanking.includes(false);
            if (dice.some((i) => i === 0) ) {
                RollDice()
                if (completeTestHighRanking) {
                    for (var i = 0; i < upperNameList; i++) {
                        if (!state.playerData[nowTurn].selectPoint.highRanking[upperNameList[i]][1]) {
                            selectData(nameList[i], state.playerData[nowTurn].selectPoint[upperNameList[i]][0])
                        break;
                        }
                    }
                }
                else if (completeTestLowerRanking) {
                    for (var i = 0; i < lowerNameList; i++) {
                        if (!state.playerData[nowTurn].selectPoint.highRanking[lowerNameList[i]][1]) {
                            selectData(nameList[i], state.playerData[nowTurn].selectPoint[lowerNameList[i]][0])
                        break;
                        }
                    }
                }
            }else{
                if (completeTestHighRanking) {
                    for (var i = 0; i < upperNameList; i++) {
                        if (!state.playerData[nowTurn].selectPoint.highRanking[upperNameList[i]][1]) {
                            selectData(nameList[i], state.playerData[nowTurn].selectPoint[upperNameList[i]][0])
                        break;
                        }
                    }
                }
                else if (completeTestLowerRanking) {
                    for (var i = 0; i < lowerNameList; i++) {
                        if (!state.playerData[nowTurn].selectPoint.highRanking[lowerNameList[i]][1]) {
                            selectData(nameList[i], state.playerData[nowTurn].selectPoint[lowerNameList[i]][0])
                        break;
                        }
                    }
                }
            }
        }
    }
    useEffect(() => {
        dispatch({ type: UPDATE_PEERS, peers })
    }, [peers])
    useEffect(() => {
        if (peerData.type === GAME && peerData.game === YACHT) {
            const data = peerData.data;
            if (data.verification === ROLLDICE) {
                console.log("ROLLDICE!")
                if (data.dice) {
                    let test = data.dice.filter((i) => { if (typeof (i) === "number" && (i > 0 && i < 7)) { return i } })
                    if (test.length === 5) {
                        let test = Object.keys(data.count).map((j) => { if (typeof (data.count[j]) === "number" && (data.count[j] >= 0 && data.count[j] < 6)) { return data.count[j] } })
                        if (test.length === 6) {
                            dispatch({ type: GET_DATA_FROM_PEER, data })
                        }
                        else {
                            alert("데이터 수신 실패")
                        }
                    }
                    else {
                        alert("데이터 수신 실패")
                    }
                }
            }
            else if (data.verification === SELECT) {
                if (Object.keys(data.playerData).map((i) => {
                    if (typeof (data.playerData[i][0]) === "number") {
                        return true
                    }
                })) {
                    dispatch({ type: GET_DATA_FROM_PEER, data })
                    dispatch({type:ROLLRESET});
                    setHalt(data.halt)
                    setTurn(data.nowTurn)
                }
                else {
                    alert("데이터 수신 실패?")
                }
                console.log("SELECT!!")
            }
            else if (data.verification === "ENDGAME") {
                if(data.endGame===true ||data.endGame===false){
                    setGame(data.endGame)
                }
            }
            else {
                dispatch({ type: GET_DATA_FROM_PEER, data })
            }
        }

    }, [peerData])

    return (
        <DiceStore.Provider value={{
                dice:state.dice,hold:state.hold,rollCount:state.rollCount,halt:halt,StartGame,RollDice,diceHold}}>
            <PlayerData.Provider value={//게임 데이터를 표시
                {playerData:state.playerData,halt:halt,nowTurn:nowTurn,endGame:endGame,rollCount:state.rollCount,selectData,gameResultUpload }}>
                <PlayerNickName.Provider value={{playerOne:state.playerData[0].nickname,playerTwo:state.playerData[1].nickname,nowTurn:nowTurn}}>
                    <TimerData.Provider value={{
                        nowTurn:nowTurn,timeOver}}>
                        {children}
                        </TimerData.Provider>
                </PlayerNickName.Provider>
            </PlayerData.Provider>
        </DiceStore.Provider>
    )
}
export {TimerData,DiceStore,PlayerData,PlayerNickName,YachuProvider};