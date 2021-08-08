import { checkPlace, checkSelectState, checkMyTurn, checkEmptySelectHorse, checkHavePlaceToMove } from '../YutFunctionModule.js';

import { YUT_INITIAL_STATE, YUT_RESULT_TYPE, YUT_PLAYER_COLOR, NUMBER_TO_MATCH_YUT_TYPE } from '../Constants/yutGame';

export const sumYutArrayToMatchType = (yutArray) => {
    let sumYutArray = NUMBER_TO_MATCH_YUT_TYPE[yutArray.reduce((a, b) => a + b)];
    // 백도가 있으면 1 말고 0 출력
    return sumYutArray === 1 && yutArray[0] === 1 ? YUT_RESULT_TYPE.BACK_DO : sumYutArray;
}

const getRandomYut = (count) => {
    const arr = [];
    for (let i = 0; i < 4; i++) {
        arr.push(Math.floor(Math.random() * 2, 1))
    }
    return arr;
}


const shuffle = (array) => {
    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    var currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}


const throwYutFunction = (myThrowCount, yutData, count) => {
    if (myThrowCount <= 0) {
        return { myThrowCount, yutData }
    }
    // const [randomYutResult, yutView] = getRandomYut(count);
    const yutView = getRandomYut(count);
    const randomYutResult = sumYutArrayToMatchType(yutView);

    yutData = [...yutData, randomYutResult];
    if (!(randomYutResult === YUT_RESULT_TYPE.YUT || randomYutResult === YUT_RESULT_TYPE.MO)) {
        myThrowCount = myThrowCount - 1;
    }

    return { myThrowCount, yutData, yutView }
}

const addPlaceToMove = (index, yutData) => {
    console.log("addPlaceToMove : ", index, yutData);
    const placeToMove = {}
    if (yutData.length === 0) {
        return placeToMove;
    }
    const sortedYutData = [...new Set(yutData)].sort().reverse();
    sortedYutData.forEach((i) => {
        checkPlace(index, i).forEach((p) => {
            placeToMove[p] = i;
        })
    });
    return placeToMove;
}

const PLAY_AI = (state, action) => {
    const nickname = localStorage.getItem('nickname');
    let myThrowCount = state.myThrowCount;
    let yutData = state.yutData;
    const nowTurnIndex = state.nowTurn.index;
    const nowTurnNickname = state.nowTurn.nickname;

    while (myThrowCount > 0) {
        const temp = throwYutFunction(myThrowCount, yutData)
        myThrowCount = temp.myThrowCount;
        yutData = temp.yutData;
    }
    console.log("PLAYER_COMPUTER");
    console.log(state.yutData);
    const placeToMoveObj = {};
    const placeToMoveObjIndex = [];
    const shortRootIndex = [];
    const shortCut = [5, 10, 23, 15, 20, 30];
    if (state.playerData[nowTurnIndex].horses > 0) {
        placeToMoveObjIndex.push(0);
        placeToMoveObj[0] = addPlaceToMove(0, yutData, state.horsePosition);
    }
    const list = []
    Object.entries(state.horsePosition).forEach(([key, value]) => {
        if (value.player === nowTurnIndex) {
            placeToMoveObjIndex.push(key);
            placeToMoveObj[key] = addPlaceToMove(key, yutData, state.horsePosition);
            console.log("placeToMoveObj[key]", placeToMoveObj[key])
            Object.entries(placeToMoveObj[key]).forEach(([k, v]) => {
                print("key : ", key, "index", k, "destination", v);
                // if (shortCut.some((i) => i === k)) {
                //     list.push({ "place": key, "add": v, "destination": k })
                // }
                list.push({ "place": key, "add": v, "destination": k })
            })
        }
    });



    console.log("list", list);
    console.log(placeToMoveObj);
    console.log(placeToMoveObjIndex);
    console.log("placeToMoveObj : ", placeToMoveObj);
    return { ...state, myThrowCount, yutData }
};

const START_GAME = (peers) => {
    console.log("peers : ", peers);
    const nickname = localStorage.getItem('nickname');

    // 나의 데이터 추가
    const playerData = [{ nickname, color: YUT_PLAYER_COLOR[0], horses: 1, goal: 3 }];
    const playerHorsePosition = [{}];

    peers.slice(0, 3).forEach((i, index) => {
        // 추가된 인원 만큼 플레이어 데이터 배열 추가
        playerData.push({ nickname: i.nickname, color: YUT_PLAYER_COLOR[index + 1], horses: 4, goal: 0 });

        // 추가된 인원 만큼 말 위치 배열 추가
        playerHorsePosition.push({});
    });
    shuffle(playerData);


    const nowTurnNickname = playerData[0].nickname; // playerData의 첫번째 닉네임
    const halted = !(nickname === playerData[0].nickname);
    const result = { ...YUT_INITIAL_STATE, nowTurn: { index: 0, nickname: nowTurnNickname }, playerData, myThrowCount: 100, playerHorsePosition };

    console.log("START GAME : ", { ...result, peers, halted });
    return { ...result, halted };
}

const THROW_YUT = (state, count) => {
    // 윷 배열에 던져 나온 수를 추가해줌.
    if (state.myThrowCount <= 0) {
        return { ...state }
    }
    const throwYut = throwYutFunction(state.myThrowCount, state.yutData, count);
    return { ...state, ...throwYut };
};

const SELECT_HORSE = (state, index) => {
    console.log("말 선택 : ", index)
    // if (state.yutData.length === 0 ||
    //     (state.horsePosition.hasOwnProperty(String(index)) && state.nowTurn.index !== state.horsePosition[index].player) ||
    //     state.halted
    // ) {
    //     // 윷 던진 것이 아무것도 없으면 선택 안함.
    //     // 본인 차례에 상대망 말 클릭하면 선택 안함.
    //     // halted 가 true 이면( 즉 내 차례가 아님 멈춘 상태일 경우)
    //     return { ...state }
    //     // dispatch({ type: START_GAME, result })

    // }

    // playerHorsesPosition일때
    const findHorseOnBoard = state.playerHorsePosition.findIndex((i) => i.hasOwnProperty(String(index)));
    console.log("dfasdf", findHorseOnBoard === state.nowTurnIndex, findHorseOnBoard, state.nowTurnIndex)
    if (
        index >= 0 && index <= 30 && // 0~30까지 선택해야하고
        findHorseOnBoard === state.nowTurn.index || // 선택한 말이 내 말인지
        index === 0) {  // 말이 0번 이라면
        console.log("말이 있음")
        const placeToMove = addPlaceToMove(index, state.yutData);
        console.log("말이 갈 수 있는 위치 : ", placeToMove);
        return [{ ...state, selectHorse: index, placeToMove }, true];
    }
    else {
        console.log("말이 없음")
        return [{}, false]
    }
}

const MOVE_HORSE_ON_PLAYER_SECTION = (state, index) => {
    // 선택한 말이 없는 상태에서 눌렸거나 해당 값이 없으면 말을 이동하지 않음.
    if (checkEmptySelectHorse(state.selectHorse) ||
        checkHavePlaceToMove(state.placeToMove, index) ||
        !checkMyTurn(state.nowTurn.nickname)) {
        return [{}, false];
    }
    else {
        // 사용할 윷 데이터가 들어오면 해당 윷 데이터를 삭제
        const yutData = [...state.yutData];
        yutData.splice(yutData.indexOf(state.placeToMove[index]), 1);
        // 말 이동 관련 코드
        // 만약에 selectHorse 가 0 이라면 (윷 판에 말이 없는 경우)
        // const horsePosition = { ...state.horsePosition };
        const nowTurnIndex = state.nowTurn.index;
        const playerData = [...state.playerData]
        let myThrowCount = state.myThrowCount;
        let eayEnemyHorse = false;

        // 내가 가지고 있는 horses -1 해주기.
        playerData[nowTurnIndex] = { ...playerData[nowTurnIndex], horses: playerData[nowTurnIndex].horses - 1 }

        // playerHorsesPosition일때
        //------------------------------------------------------------
        const playerHorsePosition = [...state.playerHorsePosition]
        const findHorsePositionIndex = state.playerHorsePosition.findIndex((i) => i.hasOwnProperty(String(index)))

        // playerHorsePosition에 말이 있는지 확인
        if (findHorsePositionIndex > -1) {
            if (nowTurnIndex === findHorsePositionIndex)
                // 내 말이 있을 때
                playerHorsePosition[findHorsePositionIndex][index] += 1;
            else {
                // 상대 말이 있을 때 
                // index 위치의 말이 죽었기에 해당하는 말을 가지고 있는 사람의 horses 값을 올려준다.
                playerData[findHorsePositionIndex] =
                {
                    ...playerData[findHorsePositionIndex],
                    horses: playerData[findHorsePositionIndex].horses + playerHorsePosition[findHorsePositionIndex][index]
                }

                // 말을 잡았기에 가지고 있는 사람의 위치의 말을 지운다.
                delete playerHorsePosition[findHorsePositionIndex][index]

                // 말을 잡았으니 던질 수 있는 횟수 + 1
                myThrowCount += 1;
                eayEnemyHorse = true;


                // 말을 이동했으니 해당 자리에 내 말을 놓는다.
                playerHorsePosition[nowTurnIndex][index] = 1
            }
        }
        else {
            // 해당 위치에 말을 놓음.
            playerHorsePosition[nowTurnIndex][index] = 1
        }
        return [{ ...state, yutData, playerData, myThrowCount, playerHorsePosition, selectHorse: -1, placeToMove: {} }, eayEnemyHorse, true];
    }
}

const MOVE_HORSE_ON_FIELD_SECTION = (state, index) => {
    // 선택한 말이 없는 상태에서 눌렸거나 
    // index(말이 이동할 위치) 값이 없으면 말을 이동하지 않음.
    // 내 턴인지 확인
    if (checkEmptySelectHorse(state.selectHorse) ||
        checkHavePlaceToMove(state.placeToMove, index) ||
        !checkMyTurn(state.nowTurn.nickname)) {
        return [{}, false];
    }
    else {
        // 사용할 윷 데이터가 들어오면 해당 윷 데이터를 삭제
        const yutData = [...state.yutData];
        yutData.splice(yutData.indexOf(state.placeToMove[index]), 1);

        // 말 이동 관련 코드
        let myThrowCount = state.myThrowCount;
        let eayEnemyHorse = false;
        const playerData = [...state.playerData];
        const nowTurnIndex = state.nowTurn.index;
        const playerHorsePosition = [...state.playerHorsePosition];
        const findHorsePositionIndex = state.playerHorsePosition.findIndex((i) => i.hasOwnProperty(String(index)));
        const selectHorse = state.selectHorse;
        const selectHorseData = state.playerHorsePosition[nowTurnIndex][selectHorse];

        // playerHorsePosition에 말이 있는지 확인
        if (findHorsePositionIndex > -1) {
            if (nowTurnIndex === findHorsePositionIndex)
                // 내 말이 있을 때
                playerHorsePosition[findHorsePositionIndex][index] += selectHorseData;
            else {
                // 상대 말이 있을 때 
                // index 위치의 말이 죽었기에 해당하는 말을 가지고 있는 사람의 horses 값을 올려준다.
                playerData[findHorsePositionIndex] =
                {
                    ...playerData[findHorsePositionIndex],
                    horses: playerData[findHorsePositionIndex].horses + playerHorsePosition[findHorsePositionIndex][index]
                };

                // 말을 잡았기에 가지고 있는 사람의 위치의 말을 지운다.
                delete playerHorsePosition[findHorsePositionIndex][index];

                // 말을 잡았으니 던질 수 있는 횟수 + 1
                myThrowCount += 1;
                eayEnemyHorse = true;

                // 말을 이동했으니 해당 자리에 내 말을 놓는다.
                playerHorsePosition[nowTurnIndex][index] = selectHorseData;
            }
        }
        else {
            // 해당 위치에 말을 놓음.
            playerHorsePosition[nowTurnIndex][index] = selectHorseData;
        }
        delete playerHorsePosition[nowTurnIndex][selectHorse];



        return [{ ...state, yutData, playerData, playerHorsePosition, myThrowCount, selectHorse: -1, placeToMove: {} }, eayEnemyHorse, true];
    }
}

const UPDATE_GOAL = (state) => {
    // 말 위치 데이터가 변경이 되었다면 골인지점 에 있는 상태인지 확인,
    // 골인지점에 있다면 점수 올리고 말 삭제

    const findHorsePositionIndex = state.playerHorsePosition.findIndex((i) => i.hasOwnProperty(String(30)));
    const playerData = [...state.playerData];
    const playerHorsePosition = [...state.playerHorsePosition];
    const winner = [...state.winner];

    // 플레이어 데이터의 goal과 현재 골인지점에 있는 말들을 더함.
    const goal = playerData[findHorsePositionIndex].goal + playerHorsePosition[findHorsePositionIndex][30];
    playerData[findHorsePositionIndex] = { ...playerData[findHorsePositionIndex], goal }

    // 골인 지점 말 삭제
    delete playerHorsePosition[findHorsePositionIndex][30];

    // 4개의 말을 모두 골인 시키면 위너에 이름을 추가함.
    if (playerData[findHorsePositionIndex].goal === 4) {
        winner.push(playerData[findHorsePositionIndex].nickname);
    }

    return { ...state, playerHorsePosition, playerData, winner };
}

const NEXT_TURN = (state) => {
    const nickname = localStorage.getItem('nickname');
    // send next user
    console.log("actionError : ", state.nowTurn.nickname, nickname)
    if (state.nowTurn.nickname === nickname) {
        console.log("들어옴")
        const nowTurnIndex = state.nowTurn.index === state.playerData.length - 1 ? 0 : state.nowTurn.index + 1;
        const nowTurnNickname = state.playerData[nowTurnIndex].nickname;
        const nowTurn = { index: nowTurnIndex, nickname: nowTurnNickname }

        // return [{ ...state, placeToMove: {}, myThrowCount: 1, yutData: [], nowTurn, timer: 0, halted: true }, true]
        return [{ ...state, placeToMove: {}, myThrowCount: 1, yutData: [], nowTurn, halted: true }, true]
    }
    else {
        return [{}, false]
    }
}

export default {
    PLAY_AI,
    START_GAME,
    THROW_YUT,
    SELECT_HORSE,
    MOVE_HORSE_ON_FIELD_SECTION,
    MOVE_HORSE_ON_PLAYER_SECTION,
    UPDATE_GOAL,
    NEXT_TURN
}