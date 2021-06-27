import Calculate from './calculate';
let diceArray = [1, 1, 1, 2, 2]
let counter = [3, 2, 0, 0, 0,0]
let upperPoint = {
    ace: 3,
    two: 4,
    three: 0,
    four: 0,
    five: 0,
    six: 0,
    threeOfaKind: 7,
    fourOfaKind: 0,
    fullHouse: 7,
    smallStraight: 0,
    largeStraight: 0,
    choice: 7,
    yahtzee: 0
};
test('Calculate', ()=>{
    expect(Calculate(diceArray,counter)).toStrictEqual(upperPoint);
});
diceArray = [1, 2, 3, 4, 5]
counter = [1, 1, 1, 1, 1,0]
upperPoint = {
    ace: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 0,
    threeOfaKind: 0,
    fourOfaKind: 0,
    fullHouse: 0,
    smallStraight: 15,
    largeStraight: 30,
    choice: 15,
    yahtzee: 0
};
test('Calculate', () => {
    expect(Calculate(diceArray, counter)).toStrictEqual(upperPoint);
})
diceArray = [1, 3, 2, 1, 4]
counter = [2, 1, 1, 1, 0, 0]
upperPoint = {
    ace: 2,
    two: 2,
    three: 3,
    four: 4,
    five: 0,
    six: 0,
    threeOfaKind: 0,
    fourOfaKind: 0,
    fullHouse: 0,
    smallStraight: 15,
    largeStraight: 0,
    choice: 11,
    yahtzee: 0
};
test('Calculate', () => {
    expect(Calculate(diceArray, counter)).toStrictEqual(upperPoint);
})
diceArray = [4, 3, 2, 1, 4]
counter = [1, 1, 1, 2, 0, 0]
upperPoint = {
    ace: 1,
    two: 2,
    three: 3,
    four: 8,
    five: 0,
    six: 0,
    threeOfaKind: 0,
    fourOfaKind: 0,
    fullHouse: 0,
    smallStraight: 15,
    largeStraight: 0,
    choice: 14,
    yahtzee: 0
};
test('Calculate', () => {
    expect(Calculate(diceArray, counter)).toStrictEqual(upperPoint);
})
diceArray = [5, 2, 3, 4, 4]
counter = [0, 1, 1, 2, 1, 0]
upperPoint = {
    ace: 0,
    two: 2,
    three: 3,
    four: 8,
    five: 5,
    six: 0,
    threeOfaKind: 0,
    fourOfaKind: 0,
    fullHouse: 0,
    smallStraight: 15,
    largeStraight: 0,
    choice: 18,
    yahtzee: 0
};
test('Calculate', () => {
    expect(Calculate(diceArray, counter)).toStrictEqual(upperPoint);
})
diceArray = [6, 5, 3, 3, 4]
counter = [0, 0, 2, 1, 1, 1]
upperPoint = {
    ace: 0,
    two: 0,
    three: 6,
    four: 4,
    five: 5,
    six: 6,
    threeOfaKind: 0,
    fourOfaKind: 0,
    fullHouse: 0,
    smallStraight: 15,
    largeStraight: 0,
    choice: 21,
    yahtzee: 0
};
test('Calculate', () => {
    expect(Calculate(diceArray, counter)).toStrictEqual(upperPoint);
})
diceArray = [6, 6, 5, 3, 4]
counter = [0, 0, 1, 1, 1, 2]
upperPoint = {
    ace: 0,
    two: 0,
    three: 3,
    four: 4,
    five: 5,
    six: 12,
    threeOfaKind: 0,
    fourOfaKind: 0,
    fullHouse: 0,
    smallStraight: 15,
    largeStraight: 0,
    choice: 24,
    yahtzee: 0
};
test('Calculate', () => {
    expect(Calculate(diceArray, counter)).toStrictEqual(upperPoint);
})
diceArray = [6, 5, 1, 3, 4]
counter = [1, 0, 1, 1, 1, 1]
upperPoint = {
    ace: 1,
    two: 0,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    threeOfaKind: 0,
    fourOfaKind: 0,
    fullHouse: 0,
    smallStraight: 15,
    largeStraight: 0,
    choice: 19,
    yahtzee: 0
};
test('Calculate', () => {
    expect(Calculate(diceArray, counter)).toStrictEqual(upperPoint);
})
diceArray = [2, 1, 6, 3, 4]
counter = [1, 1, 1, 1, 0, 1]
upperPoint = {
    ace: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 0,
    six: 5,
    threeOfaKind: 0,
    fourOfaKind: 0,
    fullHouse: 0,
    smallStraight: 15,
    largeStraight: 0,
    choice: 16,
    yahtzee: 0
};
test('Calculate', () => {
    expect(Calculate(diceArray, counter)).toStrictEqual(upperPoint);
})
diceArray = [6, 3, 2, 1, 4]
counter = [1, 1, 1, 1, 0, 1]
upperPoint = {
    ace: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 0,
    six: 6,
    threeOfaKind: 0,
    fourOfaKind: 0,
    fullHouse: 0,
    smallStraight: 15,
    largeStraight: 0,
    choice: 16,
    yahtzee: 0
};
test('Calculate', () => {
    expect(Calculate(diceArray, counter)).toStrictEqual(upperPoint);
})
diceArray = [2, 3, 2, 1, 4]
counter = [1, 2, 1, 1, 0, 0]
upperPoint = {
    ace: 1,
    two: 4,
    three: 3,
    four: 4,
    five: 0,
    six: 0,
    threeOfaKind: 0,
    fourOfaKind: 0,
    fullHouse: 0,
    smallStraight: 15,
    largeStraight: 0,
    choice: 12,
    yahtzee: 0
};
test('Calculate', () => {
    expect(Calculate(diceArray, counter)).toStrictEqual(upperPoint);
})
diceArray = [3, 3, 2, 1, 4]
counter = [1, 1, 2, 1, 0, 0]
upperPoint = {
    ace: 1,
    two: 2,
    three: 6,
    four: 4,
    five: 0,
    six: 0,
    threeOfaKind: 0,
    fourOfaKind: 0,
    fullHouse: 0,
    smallStraight: 15,
    largeStraight: 0,
    choice: 13,
    yahtzee: 0
};
test('Calculate', () => {
    expect(Calculate(diceArray, counter)).toStrictEqual(upperPoint);
})
diceArray = [5, 5, 2, 4, 3]
counter = [0, 1, 1, 1, 2, 0]
upperPoint = {
    ace: 0,
    two: 2,
    three: 3,
    four: 4,
    five: 10,
    six: 0,
    threeOfaKind: 0,
    fourOfaKind: 0,
    fullHouse: 0,
    smallStraight: 15,
    largeStraight: 0,
    choice: 19,
    yahtzee: 0
};
test('Calculate', () => {
    expect(Calculate(diceArray, counter)).toStrictEqual(upperPoint);
})
diceArray = [6, 6, 5, 4, 3]
counter = [0, 0, 1, 1, 1, 2]
upperPoint = {
    ace: 0,
    two: 0,
    three: 3,
    four: 4,
    five: 5,
    six: 12,
    threeOfaKind: 0,
    fourOfaKind: 0,
    fullHouse: 0,
    smallStraight: 15,
    largeStraight: 0,
    choice: 24,
    yahtzee: 0
};
test('Calculate', () => {
    expect(Calculate(diceArray, counter)).toStrictEqual(upperPoint);
})
diceArray = [1, 3, 2, 1, 4]
counter = [2, 1, 1, 1, 0, 0]
upperPoint = {
    ace: 2,
    two: 2,
    three: 3,
    four: 4,
    five: 0,
    six: 0,
    threeOfaKind: 0,
    fourOfaKind: 0,
    fullHouse: 0,
    smallStraight: 15,
    largeStraight: 0,
    choice: 11,
    yahtzee: 0
};
test('Calculate', () => {
    expect(Calculate(diceArray, counter)).toStrictEqual(upperPoint);
})
diceArray = [4, 6, 5, 3, 4]
counter = [0, 0, 1, 2, 1, 1]
upperPoint = {
    ace: 0,
    two: 0,
    three: 3,
    four: 8,
    five: 5,
    six: 6,
    threeOfaKind: 0,
    fourOfaKind: 0,
    fullHouse: 0,
    smallStraight: 15,
    largeStraight: 0,
    choice: 22,
    yahtzee: 0
};
test('Calculate', () => {
    expect(Calculate(diceArray, counter)).toStrictEqual(upperPoint);
})
diceArray = [6, 6, 5, 3, 4]
counter = [0, 0, 1, 1, 1, 2]
upperPoint = {
    ace: 0,
    two: 0,
    three: 3,
    four: 4,
    five: 5,
    six: 12,
    threeOfaKind: 0,
    fourOfaKind: 0,
    fullHouse: 0,
    smallStraight: 15,
    largeStraight: 0,
    choice: 24,
    yahtzee: 0
};
test('Calculate', () => {
    expect(Calculate(diceArray, counter)).toStrictEqual(upperPoint);
})
diceArray = [2, 6, 5, 3, 4]
counter = [0, 1, 1, 1, 1, 1]
upperPoint = {
    ace: 0,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    threeOfaKind: 0,
    fourOfaKind: 0,
    fullHouse: 0,
    smallStraight: 15,
    largeStraight: 30,
    choice: 20,
    yahtzee: 0
};
test('Calculate', () => {
    expect(Calculate(diceArray, counter)).toStrictEqual(upperPoint);
})
diceArray = [2, 4, 3, 1, 5]
counter = [1, 1, 1, 1, 1, 0]
upperPoint = {
    ace: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 0,
    threeOfaKind: 0,
    fourOfaKind: 0,
    fullHouse: 0,
    smallStraight: 15,
    largeStraight: 30,
    choice: 15,
    yahtzee: 0
};
test('Calculate', () => {
    expect(Calculate(diceArray, counter)).toStrictEqual(upperPoint);
})
diceArray = [6, 1, 5, 3, 4]
counter = [1, 0, 1, 1, 1, 1]
upperPoint = {
    ace: 1,
    two: 0,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    threeOfaKind: 0,
    fourOfaKind: 0,
    fullHouse: 0,
    smallStraight: 15,
    largeStraight: 0,
    choice: 19,
    yahtzee: 0
};
test('Calculate', () => {
    expect(Calculate(diceArray, counter)).toStrictEqual(upperPoint);
})
diceArray = [3, 6, 5, 3, 4]
counter = [0, 0, 2, 1, 1, 1]
upperPoint = {
    ace: 0,
    two: 0,
    three: 6,
    four: 4,
    five: 5,
    six: 0,
    threeOfaKind: 0,
    fourOfaKind: 0,
    fullHouse: 0,
    smallStraight: 15,
    largeStraight: 0,
    choice: 21,
    yahtzee: 0
};
test('Calculate', () => {
    expect(Calculate(diceArray, counter)).toStrictEqual(upperPoint);
})
diceArray = [2, 6, 5, 3, 4]
counter = [0, 1, 1, 1, 1, 1]
upperPoint = {
    ace: 0,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    threeOfaKind: 0,
    fourOfaKind: 0,
    fullHouse: 0,
    smallStraight: 15,
    largeStraight: 30,
    choice: 20,
    yahtzee: 0
};
test('Calculate', () => {
    expect(Calculate(diceArray, counter)).toStrictEqual(upperPoint);
})
diceArray = [1, 4, 5, 6, 3]
counter = [1, 0, 1, 1, 1, 1]
upperPoint = {
    ace: 1,
    two: 0,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    threeOfaKind: 0,
    fourOfaKind: 0,
    fullHouse: 0,
    smallStraight: 15,
    largeStraight: 0,
    choice: 19,
    yahtzee: 0
};
test('Calculate', () => {
    expect(Calculate(diceArray, counter)).toStrictEqual(upperPoint);
})
diceArray = [2, 3, 5, 3, 4]
counter = [0, 1, 2, 1, 1, 0]
upperPoint = {
    ace: 0,
    two: 2,
    three: 6,
    four: 4,
    five: 5,
    six: 0,
    threeOfaKind: 0,
    fourOfaKind: 0,
    fullHouse: 0,
    smallStraight: 15,
    largeStraight: 0,
    choice: 17,
    yahtzee: 0
};
test('Calculate', () => {
    expect(Calculate(diceArray, counter)).toStrictEqual(upperPoint);
})
diceArray = [2, 4, 5, 3, 3]
counter = [0, 1, 2, 1, 1, 0]
upperPoint = {
    ace: 0,
    two: 2,
    three: 6,
    four: 4,
    five: 5,
    six: 0,
    threeOfaKind: 0,
    fourOfaKind: 0,
    fullHouse: 0,
    smallStraight: 15,
    largeStraight: 0,
    choice: 17,
    yahtzee: 0
};
test('Calculate', () => {
    expect(Calculate(diceArray, counter)).toStrictEqual(upperPoint);
})