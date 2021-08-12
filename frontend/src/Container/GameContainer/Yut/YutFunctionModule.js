import { YUT_RESULT_TYPE } from './Constants/yutGame'

const table = {
    5: [[5], 21, 22, 23, 24, 25, 15, 16, 17, 18, 19],
    10: [[9], 26, 27, 23, 28, 29, 20, 30, 30, 30, 30],
    23: [[22, 27], 28, 29, 20, 30, 30, 30, 30],
    15: [[14, 25]],
    20: [[19, 29]],
};

const findDataInObject = (table, index) => {
    let keys = Object.keys(table);
    for (let i = 0; i < keys.length - 1; i++) {
        let result = table[keys[i]].indexOf(index);
        if (result !== -1) {
            return { key: keys[i], indexOf: result }
        }
    }
    return { key: -1, indexOf: -1 }
}

const findPlace = (index, add) => {
    let result = 0;
    if (index === 5 || index === 10 || index === 23) {
        result = table[index][add]
    }
    else if (index <= 20) {
        result = (index + add) < 21 ? index + add : 30;
    }
    else {
        const { key, indexOf } = findDataInObject(table, index);
        console.log("table : ", table, key, add, indexOf, index)
        result = table[key][add + indexOf]
    }
    // return result;
    return [result];
}

const findBackdoPlace = (index) => {
    let result = [];
    if ([23, 15, 20].includes(index)) {
        // 양쪽 길 모두 갈 수 있는 경우
        result = table[index][0];
    }
    else if (index <= 20) {
        // result = (index - 1) === 0 ? 20 : index - 1;
        result.push((index - 1) === 0 ? 20 : index - 1);
    }
    else {
        const { key, indexOf } = findDataInObject(table, index);
        if (indexOf - 1 === 0) {
            // result = key;
            result.push(key);
        }
        else {
            // result = table[key][indexOf - 1];
            result.push(table[key][indexOf - 1]);
        }
    }
    return [result];
}

export const checkPlace = (index, add) => {
    // console.log("checkPlace");
    if (add !== YUT_RESULT_TYPE.BACK_DO) {
        return findPlace(index, add);
    }
    else {
        return findBackdoPlace(index);
    }
}

export const checkSelectState = (selectHorse, placeToMove, index) => {
    if (selectHorse === -1 || !placeToMove.hasOwnProperty(String(index))) {
        return true;
    }
    return false;
}

export const checkEmptySelectHorse = (selectHorse) => {
    if (selectHorse === -1) {
        // console.log("checkEmptySelectHorse true");
        return true;
    }
    return false;
}

export const checkHavePlaceToMove = (placeToMove, index) => {
    if (!placeToMove.hasOwnProperty(String(index))) {
        // console.log("checkHavePlaceToMove true");
        return true;
    }
    return false;
}

export const checkMyTurn = (nickname) => {
    if (nickname === localStorage.getItem('nickname')) {
        // console.log("checkMyTurn true");
        return true;
    }
    return false;
}



export const isFunction = (func) => {
    return typeof (func) === "function";
}

export const isObject = (obj) => {
    return typeof (obj) === "object";
}

export const isString = (str) => {
    return typeof (str) === "string";
}

export const isNumber = (num) => {
    return typeof (num) === "number";
}


export const isArray = (props_Array) => {
    return Array.isArray(props_Array);
}

export const notNull = (props_null) => {
    return typeof (props_null) !== "null";
}

export const notUndefined = (props_undefined) => {
    return typeof (props_undefined) !== "undefined";
}

export const checkGetDataFromPeers = (state) => {
    const result = (
        isArray(state.playerData) &&
        isObject(state.nowTurn) &&
        isArray(state.playerHorsePosition) && state.playerHorsePosition.length <= 4 && state.playerHorsePosition.length >= 0 &&
        isArray(state.yutData) &&
        isObject(state.placeToMove) && Object.keys(state.placeToMove).length <= 4 && Object.keys(state.placeToMove).length >= 0 &&
        isNumber(state.selectHorse) && state.selectHorse >= -1 && state.selectHorse <= 30 &&
        isNumber(state.myThrowCount) && state.myThrowCount > -1 &&
        isArray(state.winner)
    )
    return result;
}

export const getDataFromPeersError = () => {
    console.error("getDataError");
    alert("네트워크 오류");
}