function Calculate(diceArray, counter) {
    let upperPoint = {
        ace: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
        six: 0,
        threeOfaKind: 0,
        fourOfaKind: 0,
        fullHouse: 0,
        smallStraight: 0,
        largeStraight: 0,
        choice: 0,
        yahtzee: 0
    };
    for (var n = 0; n < 5; n++) {
        if (diceArray[n] === 1) {
            upperPoint["ace"] += 1;
        } else if (diceArray[n] === 2) {
            upperPoint["two"] += 2;
        } else if (diceArray[n] === 3) {
            upperPoint["three"] += 3;
        } else if (diceArray[n] === 4) {
            upperPoint["four"] += 4;
        } else if (diceArray[n] === 5) {
            upperPoint["five"] += 5;
        } else if (diceArray[n] === 6) {
            upperPoint["six"] += 6;
        }
    }
    var i = 0;
    var smallOne = 0;
    var largeOne = 0;
    for (i = 0; i < 6; i++) {
        if (counter[i] === 1 || counter[i] === 2) {
            smallOne += 1;
        } else if (counter[i] === 0 && smallOne < 4) {
            smallOne = 0;
        }
        if (counter[i] === 1) {
            largeOne += 1;
        } else if (counter[i] === 0 && smallOne < 5) {
            largeOne = 0;
        }
        if (counter[i] >= 3) {
            upperPoint["threeOfaKind"] = diceArray.reduce(function add(
                sum,
                currValue
            ) {
                return sum + currValue;
            },
                0);
        }
        if (counter[i] >= 4) {
            upperPoint["fourOfaKind"] = diceArray.reduce(function add(
                sum,
                currValue
            ) {
                return sum + currValue;
            },
                0);
        }
        if (counter[i] === 5) {
            upperPoint["yahtzee"] = 50;
        }
    }
    if (counter.includes(3) && counter.includes(2)) {
        upperPoint["fullHouse"] = diceArray.reduce(function add(sum, currValue) {
            return sum + currValue;
        }, 0);
    }
    if (smallOne >= 4) {
        upperPoint["smallStraight"] = 15;
    }
    if (largeOne === 5) {
        upperPoint["largeStraight"] = 30;
    }
    upperPoint["choice"] = diceArray.reduce(function add(sum, currValue) {
        return sum + currValue;
    }, 0);

    return upperPoint;
}
//module.exports=Calculate;
export default Calculate;
