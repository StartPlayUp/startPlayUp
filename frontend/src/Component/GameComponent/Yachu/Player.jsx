import React, { Fragment, useState, useEffect, useContext, useReducer, memo } from "react";
import { PlayerData } from "Container/GameContainer/Yacht/YatchStore";
import styled, { keyframes } from 'styled-components';
const Div = styled.div`
    display: flex;
    width:300px;
    height:700px;

`
const Fade = keyframes`
    0%{
        opacity:0;
    }
    10%{
        opacity:1;
    }
    90%{
        opacity:1;
    }
    100%{
        opacity:0;
    }
`
const LowerWord = styled.div`
    position:absolute;
    left:35%;
    font-size: 7.5vw;
    z-index: 99;
    stroke: black;
    color:#FFB800;
    -webkit-text-stroke-width:3px;
    animation:${Fade} 3s linear;

`
const Table = styled.table`
    border:2px solid;
    background-color: white;
    width:200px;
    height:650px;
    position: absolute;

    tr{
        text-align: center;
        height:4.3vh;
    }
    td{
        border-bottom-left-radius:1px solid;
    }
`
const Button = styled.button`
    background-color: white;
    font-size: 1.4vw;
    height:4.3vh;
`
const Player = () => {
    const dataState = useContext(PlayerData);
    const [lowerState, setLower] = useState(false);
    const [wordState, setWord] = useState('');
    const myName = localStorage.getItem('nickname');
    function select(e) {
        if (dataState.halt === true) {
            const { name, value } = e.target;
            dataState.selectData(name, value)
        } else {
            alert("니턴 아님")
        }
    }
    useEffect(() => {
        const copyData = [...dataState.state.playerData];
        const turn = dataState.nowTurn
        let lower = Object.keys(copyData[turn].selectPoint).map((i) => {
            return copyData[turn].selectPoint[i][0]
        })
        let getPoint = Object.keys(copyData[turn].selectPoint).map((i) => {
            return copyData[turn].selectPoint[i][1]
        })
        let copyLower = lower.slice(6, 11);
        copyLower.push(lower[12]);
        let copyGet = getPoint.slice(6, 11);
        let word = ['Three Of a Kind!', 'Four Of a Kind!', 'Full House!', 'Small Straight!', 'Large Straight!', 'YAHTZEE!']
        copyGet.push(getPoint[12]);
        console.log(copyLower, copyGet)
        for (var i = 5; i >= 0; i--) {
            if (copyGet[i]) {
                continue;
            }
            if (copyLower[i] !== 0) {
                console.log(word[i])
                setWord(word[i]);
                setLower(true);
                console.log("lowerState 확인용", lowerState);
                break;
            }
        }
        setTimeout(() => { setLower(false) }, 3000)

    }, [dataState.state])
    return (
        <PlayerData.Consumer>
            {({ state, nowTurn }) => (
                <Fragment>
                    <Div>
                        {lowerState && <LowerWord>{console.log("tesatat", wordState)}{wordState}</LowerWord>}
                        <Table>
                            <thead>
                                <tr>
                                    <th>점수표</th>
                                    {Object.keys(state.playerData).map((i, index) => (<th keys={index}>{state.playerData[i].nickname}</th>))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        {Object.keys(state.playerData[0].selectPoint).map((j, dex) => (
                                            <tr key={dex}>
                                                {dex === 5 ? <><tr><td>{j}</td></tr><tr><td>bonus</td></tr></> : <>{j}</>}
                                            </tr>
                                        ))}
                                        <td>result</td>
                                    </td>
                                    {Object.keys(state.playerData).map((i, index) => (
                                        <td key={index}>
                                            {Object.keys(state.playerData[i].selectPoint).map((j, dex) => (
                                                <tr key={dex}>
                                                    {nowTurn == i ?
                                                        (<>
                                                            {dex === 5 ?
                                                                (<>
                                                                    <tr><td><button
                                                                        disabled={state.playerData[i].selectPoint[j][1]}
                                                                        name={j}
                                                                        onClick={select}
                                                                        value={state.playerData[i].selectPoint[j][0]}
                                                                    >{state.playerData[i].selectPoint[j][0]}</button></td></tr>
                                                                    <tr><td>{state.playerData[i].bonus[0]}</td></tr>
                                                                </>
                                                                )
                                                                :
                                                                (<td>
                                                                    <button
                                                                        disabled={state.playerData[i].selectPoint[j][1]}
                                                                        name={j}
                                                                        onClick={select}
                                                                        value={state.playerData[i].selectPoint[j][0]}
                                                                    >{state.playerData[i].selectPoint[j][0]}</button></td>)}</>)
                                                        :
                                                        (<>{dex === 5 ?
                                                            (<><tr><td>{state.playerData[i].selectPoint[j][0]}</td></tr>
                                                                <tr><td>{state.playerData[i].bonus[0]}</td></tr>
                                                            </>
                                                            )
                                                            :
                                                            (<>
                                                                {state.playerData[i].selectPoint[j][0]}</>)}</>)}
                                                </tr>
                                            ))}
                                            <tr>
                                                <td>{state.playerData[i].result}</td>
                                            </tr>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </Table>
                    </Div>
                </Fragment>
            )}
        </PlayerData.Consumer>
    )
}
export default Player;

/*
<Table>
                    <thead>
                        <tr>
                            <th>점수표</th>
                            {Object.keys(state.playerData).map((i, index) => (<th keys={index}>{index}</th>))}
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            {Object.keys(state.playerData[0].selectPoint).map((j, dex) => (
                                <div key={dex}>
                                    {dex === 5 ? <div><tr><td>{j}</td></tr><td>bonus</td></div> : <div>{j}</div>}
                                </div>
                            ))}
                            <td>result</td>
                        </td>
                        {Object.keys(state.playerData).map((i, index) => (
                            <td key={index}>
                                {Object.keys(state.playerData[i].selectPoint).map((j, dex) => (
                                    <div key={dex}>
                                        {nowTurn == i ?
                                            (<div>
                                                {dex === 5 ?
                                                    (<div>
                                                        <button
                                                            disabled={state.playerData[i].selectPoint[j][1]}
                                                            name={j}
                                                            onClick={select}
                                                            value={state.playerData[i].selectPoint[j][0]}
                                                        >{state.playerData[i].selectPoint[j][0]}</button>
                                                        <div>{state.playerData[i].bonus[0]} </div>
                                                    </div>
                                                    )
                                                    :
                                                    (<td>
                                                        <button
                                                            disabled={state.playerData[i].selectPoint[j][1]}
                                                            name={j}
                                                            onClick={select}
                                                            value={state.playerData[i].selectPoint[j][0]}
                                                        >{state.playerData[i].selectPoint[j][0]}</button></td>)}</div>)
                                            :
                                            (<div>{dex === 5 ?
                                                (<td>
                                                    {state.playerData[i].selectPoint[j][0]}
                                                    <div>{state.playerData[i].bonus[0]} </div>
                                                </td>
                                                )
                                                :
                                                (<div>
                                                    {state.playerData[i].selectPoint[j][0]}</div>)}</div>)}
                                    </div>
                                ))}
                                <tr>

                                    <td>{state.playerData[i].result}</td>
                                </tr>
                            </td>

                        ))}
                        </tr>
                    </tbody>
                    </Table>
*/