import React, { Fragment, useState, useEffect, useContext, useReducer, memo } from "react";
import { PlayerData } from "Container/GameContainer/Yacht/YatchStore";
import styled, { keyframes } from 'styled-components';
const Div = styled.div`
    display: relative;
    width:400px;
    height:700px;

`
const Notification = keyframes`
    0%{
        transform:scale(10.0);
    }
    10%{
        transform:scale(1.0);
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
    top:25%;
    left:10%;
    margin:auto;
    font-size: 7.5vw;
    z-index: 99;
    stroke: black;
    color:#FFB800;
    -webkit-text-stroke-width:3px;
    animation:${Notification} 3s linear;

`
const TableAnimaion = keyframes`
    0%{
        transform:translateX(5px)
    }
    50%{
        transform:translateX(-5px)
    }
    75%{
        transform:translateX(0px)
    }
`
const Table = styled.table`
    border:2px solid;
    background-color: white;
    width:350px;
    height:650px;
    position: absolute;
    animation: ${(props) => props.check && TableAnimaion} 0.1s infinite;
    ${(props) => console.log(props.check)};
    tr{
        text-align: center;
        height:3.3vh;
    }
    td{
        font-size: 1.4vw;
        border:3px solid;
    }
`
const Button = styled.button`
    background-color: white;
    font-size: 1.4vw;
    height:100%;
    border:none;
    width:100%;
    :hover{
        background-color: #128efa;
        color:white;
    }
    :active{
        background-color: #f17777;
        color:white;
    }
`
const Player = () => {
    const dataState = useContext(PlayerData);
    const [lowerState, setLower] = useState(false);
    const [wordState, setWord] = useState('');
    const [p1high, setP1high] = useState([0, 0, 0, 0, 0, 0]);
    const [p2high, setP2high] = useState([0, 0, 0, 0, 0, 0]);
    const [p1low, setP1low] = useState([0, 0, 0, 0, 0, 0]);
    const [p2low, setP2low] = useState([0, 0, 0, 0, 0, 0]);
    const [p1Bonus, setP1Bonus] = useState('0');
    const [p2Bonus, setP2Bonus] = useState('0');
    const myName = localStorage.getItem('nickname');
    const lowerWord = ['Three Of a Kind!', 'Four Of a Kind!', 'Full House!', 'Small Straight!', 'Large Straight!', 'YAHTZEE!']
    const highRankings = ['ace', 'two', 'three', 'four', 'five', 'six'];
    const lowerRankings = ['threeOfaKind', 'fourOfaKind', 'fullHouse', 'smallStraight', 'largeStraight', 'choice', 'yahtzee']
    function select(e) {
        if (dataState.halt === true) {
            const { name, value } = e.target;
            dataState.selectData(name, value)
        } else {
            alert("니턴 아님")
        }
    }
    useEffect(() => {
        const copyData = [...dataState.playerData];
        let p1selectData = Object.keys(copyData[0].selectPoint).map((i) => {
            return copyData[0].selectPoint[i][0]
        })
        let p2selectData = Object.keys(copyData[1].selectPoint).map((i) => {
            return copyData[1].selectPoint[i][0]
        })
        if (copyData[0].bonus[1]) {
            setP1Bonus('+35');
        }
        if (copyData[1].bonus[1]) {
            setP2Bonus('+35');
        }
        setP1high(p1selectData.slice(0, 6));
        setP1low(p1selectData.slice(6, 13));
        setP2high(p2selectData.slice(0, 6));
        setP2low(p2selectData.slice(6, 13));
        console.log(p1high)
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
        copyGet.push(getPoint[12]);
        for (var i = 5; i >= 0; i--) {
            if (copyGet[i]) {
                continue;
            }
            if (copyLower[i] !== 0) {
                setWord(lowerWord[i]);
                setLower(true);
                break;
            }
        }
        setTimeout(() => { setLower(false) }, 3000)
    }, [dataState.playerData])
    return (
        <PlayerData.Consumer>
            {({ playerData, nowTurn }) => (
                <Fragment>
                    <Div>
                        {lowerState && <LowerWord>{wordState}</LowerWord>}
                        <Table check={lowerState}>
                            <thead>
                                <tr>
                                    <th>점수표</th>
                                    {Object.keys(playerData).map((i, index) => (<th keys={index}>{playerData[i].nickname}</th>))}
                                </tr>
                            </thead>
                            <tbody>
                                {nowTurn === 0 ?
                                    <>
                                        {Object.keys(highRankings).map((i, index) =>
                                            <tr keys={index}>
                                                <td>{highRankings[i]}</td>
                                                <td><Button
                                                    disabled={playerData[0].selectPoint[highRankings[i]][1]}
                                                    name={highRankings[i]}
                                                    onClick={select}
                                                    value={playerData[0].selectPoint[highRankings[i]][0]}
                                                >{p1high[i]}</Button></td>
                                                <td>{p2high[i]}</td>
                                            </tr>)}
                                        <tr>
                                            <td>Bonus</td>
                                            <td>{p1Bonus}</td>
                                            <td>{p2Bonus}</td>
                                        </tr>
                                        <tr>
                                            <td>Sum</td>
                                            <td>{playerData[0].bonus[0]}</td>
                                            <td>{playerData[1].bonus[0]}</td>
                                        </tr>
                                        {Object.keys(lowerRankings).map((i, index) =>
                                            <tr keys={index}>
                                                <td>{lowerRankings[i]}</td>
                                                <td><Button
                                                    disabled={playerData[0].selectPoint[lowerRankings[i]][1]}
                                                    name={lowerRankings[i]}
                                                    onClick={select}
                                                    value={playerData[0].selectPoint[lowerRankings[i]][0]}
                                                >{p1low[i]}</Button></td>
                                                <td>{p2low[i]}</td>
                                            </tr>)}
                                        <tr>
                                            <td>Result</td>
                                            <td>{playerData[0].result}</td>
                                            <td>{playerData[1].result}</td>
                                        </tr>
                                    </> :
                                    <>
                                        {Object.keys(highRankings).map((i, index) =>
                                            <tr keys={index}>
                                                <td>{highRankings[i]}</td>
                                                <td>{p1high[i]}</td>
                                                <td><Button
                                                    disabled={playerData[1].selectPoint[highRankings[i]][1]}
                                                    name={highRankings[i]}
                                                    onClick={select}
                                                    value={playerData[1].selectPoint[highRankings[i]][0]}
                                                >{p2high[i]}</Button></td>
                                            </tr>)}
                                        <tr>
                                            <td>Bonus</td>
                                            <td>{p1Bonus}</td>
                                            <td>{p2Bonus}</td>
                                        </tr>
                                        <tr>
                                            <td>Sum</td>
                                            <td>{playerData[0].bonus[0]}</td>
                                            <td>{playerData[1].bonus[0]}</td>
                                        </tr>
                                        {Object.keys(lowerRankings).map((i, index) =>
                                            <tr keys={index}>
                                                <td>{lowerRankings[i]}</td>
                                                <td>{p1low[i]}</td>
                                                <td><Button
                                                    disabled={playerData[1].selectPoint[lowerRankings[i]][1]}
                                                    name={lowerRankings[i]}
                                                    onClick={select}
                                                    value={playerData[1].selectPoint[lowerRankings[i]][0]}
                                                >{p2low[i]}</Button></td>
                                            </tr>)}
                                        <tr>
                                            <td>Result</td>
                                            <td>{playerData[0].result}</td>
                                            <td>{playerData[1].result}</td>
                                        </tr>
                                    </>
                                }
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
                                    {Object.keys(playerData).map((i, index) => (<th keys={index}>{playerData[i].nickname}</th>))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        {Object.keys(playerData[0].selectPoint).map((j, dex) => (
                                            <tr key={dex}>
                                                {dex === 5 ? <><tr><td>{j}</td></tr><tr><td>bonus</td></tr></> : <>{j}</>}
                                            </tr>
                                        ))}
                                        <td>result</td>
                                    </td>
                                    {Object.keys(playerData).map((i, index) => (
                                        <td key={index}>
                                            {Object.keys(playerData[i].selectPoint).map((j, dex) => (
                                                <tr key={dex}>
                                                    {nowTurn == i ?
                                                        (<>
                                                            {dex === 5 ?
                                                                (<>
                                                                    <tr><td><button
                                                                        disabled={playerData[i].selectPoint[j][1]}
                                                                        name={j}
                                                                        onClick={select}
                                                                        value={playerData[i].selectPoint[j][0]}
                                                                    >{playerData[i].selectPoint[j][0]}</button></td></tr>
                                                                    <tr><td>{playerData[i].bonus[0]}</td></tr>
                                                                </>
                                                                )
                                                                :
                                                                (<td>
                                                                    <button
                                                                        disabled={playerData[i].selectPoint[j][1]}
                                                                        name={j}
                                                                        onClick={select}
                                                                        value={playerData[i].selectPoint[j][0]}
                                                                    >{playerData[i].selectPoint[j][0]}</button></td>)}</>)
                                                        :
                                                        (<>{dex === 5 ?
                                                            (<><tr><td>{playerData[i].selectPoint[j][0]}</td></tr>
                                                                <tr><td>{playerData[i].bonus[0]}</td></tr>
                                                            </>
                                                            )
                                                            :
                                                            (<>
                                                                {playerData[i].selectPoint[j][0]}</>)}</>)}
                                                </tr>
                                            ))}
                                            <tr>
                                                <td>{playerData[i].result}</td>
                                            </tr>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                    </Table>
*/