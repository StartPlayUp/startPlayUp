import React,{ Fragment,useState} from 'react';
const Dice = ()=>{
    const [state,setState]=useState({
        dice: [0, 0, 0, 0, 0],
        count: [0,0,0,0,0,0],
        upperPoint:{
            ace:0,
            two:0,
            three:0,
            four:0,
            five:0,
            six:0},
        selectUpper:{
            ace: 0,
            two: 0,
            three: 0,
            four: 0,
            five: 0,
            six: 0
        }
    })
    let diceArray=state.dice;
    let sel = state.selectUpper;
    const rollDice=()=>{ //주사위 굴리기
        var i=0;
        let diceCount = [0,0,0,0,0,0];
        let upperCal = {
            ace: 0,
            two: 0,
            three: 0,
            four: 0,
            five: 0,
            six: 0
        };
        for (i=0;i<5;i++){
            diceArray[i] = Math.floor(Math.random() * 6 + 1);
        }
        for (i=0;i<5;i++){
            if(diceArray[i]==1){
                diceCount[0]+=1;
                upperCal['ace']+=1;
            }
            else if (diceArray[i] == 2){
                diceCount[1]+=1
                upperCal['two'] += 2;
            }
            else if (diceArray[i] == 3) {
                diceCount[2]+=1
                upperCal['three'] += 3;
            }
            else if (diceArray[i] == 4) {
                diceCount[3]+=1
                upperCal['four'] += 4;
            }
            else if (diceArray[i] == 5) {
                diceCount[4]+=1
                upperCal['five'] += 5;
            }
            else if (diceArray[i] == 6) {
                diceCount[5]+=1
                upperCal['six'] += 6;
            }
        }
        setState({
            ...state,
            dice: diceArray,
            count: diceCount,
            upperPoint: upperCal
        });
        
    }
    function selectPoint(e) {
        const { value, name } = e.target;
        setState({
            ...state,
            selectUpper:{
                ...sel,
                [name]: value}
        });
        console.log(sel)
        console.log(state.selectUpper)
    };
    return(
        <Fragment>
            <button onClick={rollDice}>주사위 굴리기 버튼</button>
            <div>{state.dice}</div>
            <div>같은 수의 주사위 개수 : {state.count}</div>
            <div>당신이 얻을 수 있는 점수입니다.
                <div>Aces: {state.upperPoint['ace']}
                    <button name="ace" onClick={selectPoint} value={state.upperPoint['ace']}>Aces</button>
                </div>
                <div>Twos: {state.upperPoint['two']}
                    <button name="two" onClick={selectPoint} value={state.upperPoint['two']}>선택</button>
                </div>
                <div>Threes: {state.upperPoint['three']}
                    <button name="three" onClick={selectPoint} value={state.upperPoint['three']}>선택</button>
                </div>
                <div>Fours: {state.upperPoint['four']}
                    <button name="four" onClick={selectPoint} value={state.upperPoint['four']}>선택</button>
                </div>
                <div>Fives: {state.upperPoint['five']}
                    <button name="five" onClick={selectPoint} value={state.upperPoint['five']}>선택</button>
                </div>
                <div>Sixes: {state.upperPoint['six']}
                    <button name="six" onClick={selectPoint} value={state.upperPoint['six']}>선택</button>
                </div>
            </div>
            <div>당신이 얻은 점수입니다.
                <div>Aces : {state.selectUpper['ace']}</div>
                <div>Twos : {state.selectUpper['two']}</div>
                <div>Threes : {state.selectUpper['three']}</div>
                <div>Fours : {state.selectUpper['four']}</div>
                <div>Fives : {state.selectUpper['five']}</div>
                <div>Sixes : {state.selectUpper['six']}</div>
            </div>
        </Fragment>
    );
}
export default Dice;