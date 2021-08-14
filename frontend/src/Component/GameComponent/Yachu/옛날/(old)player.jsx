const turn = dataState.nowTurn
const copyData = [...dataState.playerData]
let lower = Object.keys(copyData[turn].selectPoint).map((i) => {
    return copyData[turn].selectPoint[i][0]
})
let getPoint = Object.keys(copyData[turn].selectPoint).map((i) => {
    return copyData[turn].selectPoint[i][1]
})
lower.splice(11, 1)
getPoint.splice(11, 1)
let copyLower = lower.slice(6, 12).reverse();
let copyGet = getPoint.slice(6, 12).reverse();
let lst = [0, 1, 2, 3, 4, 5]
if (!lowerState && lst.findIndex((i) => !copyGet[i] && copyLower[i] !== 0) > 0) {
    setWord(lowerWord[lst.findIndex((i) => !copyGet[i] && copyLower[i] !== 0)]);
    setLower(true);
}
console.log(wordState);
    /*
let copyLower = lower.slice(6, 11);
copyLower.push(lower[12]);
let copyGet = getPoint.slice(6, 11);
copyGet.push(getPoint[12]);
*/
/*
for (var i = 5; i >= 0; i--) {
    if (copyGet[i]) {
        continue;
    }
    if (copyLower[i] !== 0) {
        setWord(lowerWord[i]);
        setLower(true);
        break;
    }
    else if (copyLower[i] === 0) {
        setWord('')
    }
}
*/
