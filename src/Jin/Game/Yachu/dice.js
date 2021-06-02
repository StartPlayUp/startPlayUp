import React,{ Fragment,useState} from 'react';
import SelectPoint from "./selectPoint";
const Dice = ()=>{
    const [diceRoll, setRoll] = useState({ roll: 3 });
    const [state, setState] = useState({
        dice: [0, 0, 0, 0, 0],
        hold: [false, false, false, false, false],
        count: [0, 0, 0, 0, 0, 0]
    });
    function RollDice() {
        const rollCount = diceRoll.roll;
        let diceArray = [...state.dice];
        var i = 0;
        for (i = 0; i < 5; i++) {
            if (!state.hold[i]) {
                const num = Math.floor(Math.random() * 6 + 1);
                diceArray[i] = num;
            }
        }
        console.log("주사위 굴리기" + diceArray);
        let counter = Count(diceArray);
        setRoll({
            roll: rollCount - 1
        });
        setState({
            ...state,
            dice: diceArray,
            count: counter
        });
    }
    function Count(diceArray) {
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
    const RollReset = (reset) => {
        setRoll({
            roll: reset
        });
    };
    function diceHold(e) {
        const { value } = e.target;
        let holding = state.hold;
        holding[value] = !holding[value];
        setState({
            ...state,
            hold: holding
        });

        console.log(state.hold);
    }
    return(
        <Fragment>
            <div>주사위 {state.dice}</div>
            {diceRoll.roll === 3 ? (
                ""
            ) : (
                <div>
                    홀드버튼 :
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
            )}
            <div>{state.count}</div>
            <div>남은횟수 {diceRoll.roll}</div>
            <button
                disabled={diceRoll.roll ? "" : diceRoll.roll >= 0}
                onClick={RollDice}
            >
                RollDice!
      </button>
      <div>
          <SelectPoint  value={state} RollReset={RollReset}/>
      </div>
        </Fragment>
    );
}
export default Dice;