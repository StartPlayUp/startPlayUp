import React, { useEffect, useState } from "react";
import Calculate from "./calculate";
import { sendDataToPeers } from 'Common/peerModule/sendToPeers/index.js';
import { PeerDataContext, PeersContext, UserContext } from 'store';
import { GAME, YACHT } from 'Constants/peerDataTypes.js';

function SelectPoint(props) {
    const [state, setState] = useState({
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
    const [bonus, setBonus] = useState([0, false]);
    let diceArray = props.value.dice;
    let counter = props.value.count;
    let pointCalculate = Calculate(diceArray, counter);
    function select(e) {
        const { value, name } = e.target;
        const number = parseInt(value, 10);
        setState({
            ...state,
            [name]: [value, true]
        });
        console.log("보너스", bonus);
        if (bonus[0] < 63 && !bonus[1]) {
            const peerTest="Select!";
            props.RollReset(number);
        } else {
            props.RollReset(number + parseInt(35, 10));
            const peerTest="Select!";
            console.log("보나리");
        }

    }
    useEffect(() => {
        let sel = Object.keys(state).map((i) => {
            return state[i][0];
        });
        let test = sel.slice(0, 6).reduce((total, num) => {
            return parseInt(total, 10) + parseInt(num, 10);
        });
        let complete = Object.keys(state).map((i) => {
            return state[i][1];
        });
        let completeTest = !complete.slice(0, 6).includes(false);
        setBonus([test, completeTest]);
    }, [state]);
    console.log(bonus);
    return (
        <div>
            {Object.keys(state).map((i, index) => (
                <div key={index}>
                    {i}: {pointCalculate[i]} 획득한 점수 {state[i][0]}
                    {props.value.roll === 3 ? (
                        ""
                    ) : (
                        <button
                            disabled={state[i][1] ? 1 : 0}
                            name={i}
                            onClick={select}
                            value={pointCalculate[i]}
                        >
                            select
                        </button>
                    )}
                </div>
            ))}
            <div>보너스: {bonus[0]}</div>
        </div>
    );
}

export default SelectPoint;