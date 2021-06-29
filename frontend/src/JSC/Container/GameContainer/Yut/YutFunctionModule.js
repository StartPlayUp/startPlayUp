const YUT_RESULT_TYPE = {
    BACK_DO: 0,
    DO: 1,
    GAE: 2,
    GIRL: 3,
    YUT: 4,
    MO: 5,
}

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
        result = table[key][add + indexOf]
    }
    // return result;
    return [result];
}

const findBackdoPlace = (placeList, index) => {
    let result = [];
    if ([23, 15, 20].includes(index)) {
        // console.log("placeList : ", placeList)
        // const lastPlace = placeList[placeList.length - 1];
        // const lastPlace = placeList.filter((i) => ![15, 23, 24, 25, 28, 29, 20].includes(i)).pop();
        // switch (index) {
        //     case 23:
        //         console.log(lastPlace)
        //         result.push(table[index][0][lastPlace <= 5 || lastPlace === 21 || lastPlace === 22 ? 0 : 1]);
        //         break;
        //     case 15:
        //         result.push(table[index][0][lastPlace < 15 ? 0 : 1]);
        //         break;
        //     case 20:
        //         result.push(table[index][0][lastPlace < 20 ? 0 : 1]);
        //         break;
        //     default:
        //         break;
        // }

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
    return result;
}

export const checkPlace = (placeList, index, add) => {
    // console.log("checkPlace");
    if (add !== YUT_RESULT_TYPE.BACK_DO) {
        return findPlace(index, add);
    }
    else {
        return findBackdoPlace(placeList, index);
    }
}

export const checkSelectState = (selectHorse, placeToMove, index) => {
    if (selectHorse === undefined || !placeToMove.hasOwnProperty(String(index))) {
        // console.log("out of MOVE_HORSE");
        return true;
    }
    return false;
}

export const checkEmptySelectHorse = (selectHorse) => {
    if (selectHorse === undefined) {
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

export const checkMyTurn = (player, turn) => {
    if (player === turn) {
        // console.log("checkMyTurn true");
        return true;
    }
    return false;
}

