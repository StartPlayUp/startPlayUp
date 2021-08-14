import React, { Fragment, useState, useEffect, useContext, useReducer, memo } from "react";
import styled, { keyframes } from 'styled-components';
const Div = styled.div`
    display: relative;
    width:400px;
    height:700px;
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
    animation: ${(props) => props.check && TableAnimaion} 0.1s 1s 30;
    tr{
        text-align: center;
        height:3.3vh;
    }
    td{
        font-size: 1.0vw;
        border:3px solid;
        vertical-align:middle;
    }
    th{
        font-size: 1.2vw;
        border:3px solid;
        vertical-align:middle;
    }
`
const Button = styled.button`
    background-color: #e2f8a7;
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
function ScoreTable({ playerData, nowTurn, lowerState, halt, selectData, rollCount }) {
    const [p1high, setP1high] = useState([0, 0, 0, 0, 0, 0]);
    const [p2high, setP2high] = useState([0, 0, 0, 0, 0, 0]);
    const [p1low, setP1low] = useState([0, 0, 0, 0, 0, 0]);
    const [p2low, setP2low] = useState([0, 0, 0, 0, 0, 0]);
    const [p1Bonus, setP1Bonus] = useState('0');
    const [p2Bonus, setP2Bonus] = useState('0');
    const highRankings = ['ace', 'two', 'three', 'four', 'five', 'six'];
    const lowerRankings = ['threeOfaKind', 'fourOfaKind', 'fullHouse', 'smallStraight', 'largeStraight', 'choice', 'yahtzee']

    function select(e) {
        if (halt === true && rollCount < 3) {
            const { name, value } = e.target;
            selectData(name, value)
        } else {
            alert("니턴 아님")
        }
    }
    useEffect(() => {
        const copyData = [...playerData];
        console.log(copyData)
        let p1selectData = Object.keys(copyData[0].selectPoint).map((i) => {
            return copyData[0].selectPoint[i][0]
        })
        let p2selectData = Object.keys(copyData[1].selectPoint).map((i) => {
            return copyData[1].selectPoint[i][0]
        })
        if (copyData[0].bonus[0] >= 63 && copyData[0].bonus[1]) {
            setP1Bonus('+35점 획득');
        }
        if (copyData[1].bonus[0] >= 63 && copyData[1].bonus[1]) {
            setP2Bonus('+35점 획득');
        }
        setP1high(p1selectData.slice(0, 6));
        setP1low(p1selectData.slice(6, 13));
        setP2high(p2selectData.slice(0, 6));
        setP2low(p2selectData.slice(6, 13));
    }, [playerData])
    return (
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
    )
}

export default ScoreTable;