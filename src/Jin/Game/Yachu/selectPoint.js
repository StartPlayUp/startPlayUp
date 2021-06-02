import React,{useState} from "react";
import Calculate from "./calculate";
import GetBonus from "./Bonus";
function SelectPoint(props){
    console.log(props.value);
    const [state, setState] = useState({
        selectPoint: {
            ace: [ 0, false],
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
        },
        bonus:0,
        result:0
    });
    let pointCalculate = Calculate(props.value.dice,props.value.count);
    function select(e) {
        const resultPoint = state.result
        let sel = state.selectPoint;
        const { value, name } = e.target;
        const number = parseInt(value, 10);
        setState({
            ...state,
            selectPoint: {
                ...sel,
                [name]: [value, true]
            },
        });
        bonus= GetBonus(state.selectPoint)
        console.log("보너스?",bonus);
        if(bonus[1]){
            console.log("보너스 획득!")
            setState({
                ...state,
                result : resultPoint+number+parseInt("35",10)
            })
        }
        else{
            console.log("보너스 획득 실패")
            setState({
                ...state,
                result: resultPoint + number
            })
        }
        
        props.RollReset(3);
    }
    return (
        <div>
            {Object.keys(state.selectPoint).map((i) => (
                <div>
                    {i}: {pointCalculate[i]} 획득한 점수 {state.selectPoint[i][0]}
                    {props.value === 3 ? (
                        ""
                    ) : (
                        <button
                            disabled={state.selectPoint[i][1] && "true"}
                            name={i}
                            onClick={select}
                            value={pointCalculate[i]}
                        >
                            select
                        </button>
                    )}
                </div>
            ))}
            <div>보너스 점수 : {bonus[0]} </div>
            <div>점수 총 합계: {state.result}</div>
        </div>
    );
}

export default SelectPoint;