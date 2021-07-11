import { initialState } from "./YutStore";
import { GAME, YUT } from 'Constants/peerDataTypes.js';
import { checkPlace, checkSelectState, checkEmptySelectHorse, checkHavePlaceToMove, YUT_RESULT_TYPE } from './YutFunctionModule.js'
import { sendDataToPeers } from 'Common/peerModule/sendToPeers/index.js';
import { GET_DATA_FROM_PEER } from './yutReducerType';

const randomYut = () => {
    const yutMatchTable = {
        0: YUT_RESULT_TYPE.MO, // 모
        1: YUT_RESULT_TYPE.DO, // 도
        2: YUT_RESULT_TYPE.GAE, // 개
        3: YUT_RESULT_TYPE.GIRL, // 걸
        4: YUT_RESULT_TYPE.YUT  // 윷
        // 0 : 백도
    }
    const arr = [];
    for (let i = 0; i < 4; i++) {
        arr.push(Math.floor(Math.random() * 2, 1))
    }
    let result = yutMatchTable[arr.reduce((a, b) => a + b)];
    // 백도가 있으면 1 말고 0 출력
    return result === 1 && arr[0] === 1 ? YUT_RESULT_TYPE.BACK_DO : result;
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


const throwYutFunction = (myThrowCount, yutData) => {
    if (myThrowCount <= 0) {
        return { myThrowCount, yutData }
    }
    const randomYutResult = randomYut();
    yutData = [...yutData, randomYutResult];
    if (!(randomYutResult === YUT_RESULT_TYPE.YUT || randomYutResult === YUT_RESULT_TYPE.MO)) {
        myThrowCount = myThrowCount - 1;
    }

    return { myThrowCount, yutData }
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
    if (state.playerData[state.nowTurnIndex].horses > 0) {
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
    console.log("asdf", peers);
    const nickname = localStorage.getItem('nickname');
    const colorList = ['orange', 'blue', 'green']
    const playerData = [{ nickname, color: 'red', horses: 4, goal: 0 }];
    peers.slice(0, 3).forEach((i, index) => {
        playerData.push({ nickname: i.nickname, color: colorList[index], horses: 4, goal: 0 });
    });
    shuffle(playerData);

    const nowTurnNickname = playerData[0].nickname; // playerData의 첫번째 닉네임
    const halted = !(nickname === playerData[0].nickname);
    const result = { ...initialState, nowTurnNickname, playerData, myThrowCount: 10 };

    // sendDataToPeers(GAME, { game: YUT, nickname, peers, data: result });
    console.log("START GAME : ", { ...result, peers, halted })
    return { ...result, peers, halted };
    // dispatch({ type: START_GAME, result })
}

const THROW_YUT = (state) => {
    // 윷 배열에 던져 나온 수를 추가해줌.
    if (state.myThrowCount <= 0) {
        return { ...state }
    }
    const throwYut = throwYutFunction(state.myThrowCount, state.yutData);
    // sendDataToPeers(GAME, { nickname, peers, game: YUT, data: { ...sendState, ...throwYut } })
    return { ...state, ...throwYut };
    // dispatch({ type: START_GAME, result })
    // sendDataToPeers(GAME, { nickname, peers, game: YUT, data: { ...sendState, ...throwYut } })
};

const SELECT_HORSE = (state, index) => {
    console.log("말 선택 : ", index)
    if (state.yutData.length === 0 ||
        (state.horsePosition.hasOwnProperty(String(index)) && state.nowTurnIndex !== state.horsePosition[index].player) ||
        state.halted
    ) {
        // 윷 던진 것이 아무것도 없으면 선택 안함.
        // 본인 차례에 상대망 말 클릭하면 선택 안함.
        // halted 가 true 이면( 즉 내 차례가 아님 멈춘 상태일 경우)
        return { ...state }
        // dispatch({ type: START_GAME, result })

    }
    // 선택한 말 기준으로 
    const placeToMove = addPlaceToMove(index, state.yutData);
    console.log("말이 갈 수 있는 위치 : ", placeToMove);

    // // sendDataToPeers(GAME, { nickname, peers, game: YUT, data: { ...state, selectHorse: index, placeToMove } });

    return { ...state, selectHorse: index, placeToMove };
    // dispatch({ type: START_GAME, result })

}
const MOVE_FIRST_HORSE = (state, index) => {
    // 선택한 말이 없는 상태에서 눌렸거나 해당 값이 없으면 말을 이동하지 않음.
    if (checkEmptySelectHorse(state.selectHorse) ||
        checkHavePlaceToMove(state.placeToMove, index)) {
        return { ...state };
    }

    // 사용할 윷 데이터가 들어오면 해당 윷 데이터를 삭제
    const yutData = [...state.yutData];
    yutData.splice(yutData.indexOf(state.placeToMove[index]), 1);
    // 말 이동 관련 코드
    // 만약에 selectHorse 가 0 이라면 (윷 판에 말이 없는 경우)
    const horsePosition = { ...state.horsePosition };
    // let nowTurn = horsePosition[index]['player']
    const nowTurnIndex = state.nowTurnIndex;
    const playerData = [...state.playerData]
    let myThrowCount = state.myThrowCount;

    // 내가 가지고 있는 horses -1 해주기.
    playerData[nowTurnIndex] = { ...playerData[nowTurnIndex], horses: playerData[nowTurnIndex].horses - 1 }
    if (state.horsePosition.hasOwnProperty(String(index))) {
        if (nowTurnIndex === state.horsePosition[index].player)
            // 내 말이 있을 때
            horsePosition[index] = {
                ...state.horsePosition[index],
                'horses': state.horsePosition[index].horses + 1
            };
        else {
            // 상대 말이 있을 때
            let deadHorseOwner = horsePosition[index].player;
            playerData[deadHorseOwner] = { ...playerData[deadHorseOwner], horses: playerData[deadHorseOwner].horses + horsePosition[index].horses }

            myThrowCount += 1;

            horsePosition[index] = { player: nowTurnIndex, horses: 1, placeList: [0] }
        }
    }
    else {
        // 아무것도 없었을 때
        horsePosition[index] = { player: nowTurnIndex, horses: 1, placeList: [0] }
    }

    // 만약에 먹으면 먹힌 사람 말 갯수 올려주고 
    // 내거라면 위치에 + 1 해주고

    // sendDataToPeers(GAME, { nickname, peers, game: YUT, data: { ...sendState, yutData, playerData, myThrowCount, horsePosition, selectHorse: undefined, placeToMove: {} } });

    return { ...state, yutData, playerData, myThrowCount, horsePosition, selectHorse: undefined, placeToMove: {} };
    // dispatch({ type: MOVE_FIRST_HORSE, result })

}

const MOVE_HORSE = (state, index) => {
    // 선택한 말이 없는 상태에서 눌렸거나 해당 값이 없으면 말을 이동하지 않음.
    // if (checkSelectState(state.selectHorse, state.placeToMove, index)) return { ...state };

    if (checkEmptySelectHorse(state.selectHorse) ||
        checkHavePlaceToMove(state.placeToMove, index)) {
        return { ...state };
    }

    // 사용할 윷 데이터가 들어오면 해당 윷 데이터를 삭제
    const yutData = [...state.yutData];
    yutData.splice(yutData.indexOf(state.placeToMove[index]), 1);


    // 말 이동 관련 코드
    const horsePosition = { ...state.horsePosition };
    const nowTurnIndex = state.nowTurnIndex;
    let myThrowCount = state.myThrowCount;
    const playerData = [...state.playerData]

    const placeList = [...state.horsePosition[state.selectHorse].placeList];
    if (state.placeToMove[index] !== YUT_RESULT_TYPE.BACK_DO) {
        // 백도일 때 추가 하지 않음.
        placeList.push(state.selectHorse);
        console.log('placeList 추가');
    }
    const selectHorseData = state.horsePosition[state.selectHorse];
    if (state.horsePosition.hasOwnProperty(String(index))) {
        const actionIndexHorseData = state.horsePosition[index];
        if (selectHorseData.player === actionIndexHorseData.player)
            // 내 말이 있을 때
            horsePosition[index] = {
                ...actionIndexHorseData,
                'horses': actionIndexHorseData.horses + selectHorseData.horses
            };
        else {
            // 상대 말이 있을 때
            let deadHorseOwner = actionIndexHorseData.player;
            playerData[deadHorseOwner] = { ...playerData[deadHorseOwner], horses: playerData[deadHorseOwner].horses + actionIndexHorseData.horses }
            myThrowCount += 1;

            horsePosition[index] = { ...selectHorseData, placeList }
        }
    }
    else {
        // 아무것도 없었을 때
        horsePosition[index] = { ...selectHorseData, placeList };
    }
    delete horsePosition[state.selectHorse]

    // sendDataToPeers(GAME, { nickname, peers, game: YUT, data: { ...sendState, yutData, playerData, horsePosition, myThrowCount, selectHorse: undefined, placeToMove: {} } });

    return { ...state, yutData, playerData, horsePosition, myThrowCount, selectHorse: undefined, placeToMove: {} };
    action.dispatch({ type })
}

const UPDATE_GOAL = (state) => {
    // 말 위치 데이터가 변경이 되었다면 골인지점 에 있는 상태인지 확인,
    // 골인지점에 있다면 점수 올리고 말 삭제
    const playerData = [...state.playerData]
    const horsePosition = { ...state.horsePosition };
    const player = horsePosition[30].player;
    let winner = [...state.winner];
    const goal = playerData[player].goal // 플레이어 데이터의 goal과 
        + horsePosition[30].horses // 현재 골인지점에 있는 말들을 더함.
    delete horsePosition[30]; // 골인 지점 말 삭제
    playerData[player] = { ...playerData[player], goal }
    if (playerData[player].goal >= 4) {
        winner.push(playerData[player].nickname);
    }

    // sendDataToPeers(GAME, { nickname, peers, game: YUT, data: { ...sendState, horsePosition, playerData, winner } });

    return { ...state, horsePosition, playerData, winner };
    // dispatch({ type: UPDATE_GOAL, result });
    // sendDataToPeers(GAME, { nickname, peers, game: YUT, data: result });
}
const NEXT_TURN = (state) => {
    const nickname = localStorage.getItem('nickname');
    // send next user
    if (state.nowTurnNickname === nickname) {
        console.log("들어옴")
        const nowTurnIndex = state.nowTurnIndex === state.playerData.length - 1 ? 0 : state.nowTurnIndex + 1;
        const nowTurnNickname = state.playerData[nowTurnIndex].nickname;
        // sendDataToPeers(GAME, { nickname, peers, game: YUT, data: { ...sendState, placeToMove: {}, myThrowCount: 1, yutData: [], nowTurnIndex, nowTurnNickname, timer: 0 } });
        return { ...state, placeToMove: {}, myThrowCount: 1, yutData: [], nowTurnIndex, timer: 0, nowTurnNickname, halted: true };
    }
}

export default { PLAY_AI, START_GAME, THROW_YUT, SELECT_HORSE, MOVE_FIRST_HORSE, MOVE_HORSE, UPDATE_GOAL, NEXT_TURN }