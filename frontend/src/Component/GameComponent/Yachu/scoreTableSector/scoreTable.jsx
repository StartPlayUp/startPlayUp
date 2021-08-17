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
                                    disabled={playerData[0].selectPoint.highRanking[highRankings[i]][1]}
                                    name={highRankings[i]}
                                    onClick={select}
                                    value={playerData[0].selectPoint.highRanking[highRankings[i]][0]}
                                >{playerData[0].selectPoint.highRanking[highRankings[i]][0]}</Button></td>
                                <td>{playerData[1].selectPoint.highRanking[highRankings[i]][0]}</td>
                            </tr>)}
                        <tr>
                            <td>Bonus</td>
                            <td>{playerData[0].bonus[1] ? "+35" : "0"}</td>
                            <td>{playerData[1].bonus[1] ? "+35" : "0"}</td>
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
                                    disabled={playerData[0].selectPoint.lowerRanking[lowerRankings[i]][1]}
                                    name={lowerRankings[i]}
                                    onClick={select}
                                    value={playerData[0].selectPoint.lowerRanking[lowerRankings[i]][0]}
                                >{playerData[0].selectPoint.lowerRanking[lowerRankings[i]][0]}</Button></td>
                                <td>{playerData[1].selectPoint.lowerRanking[lowerRankings[i]][0]}</td>
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
                                <td>{playerData[0].selectPoint.highRanking[highRankings[i]][0]}</td>
                                <td><Button
                                    disabled={playerData[1].selectPoint.highRanking[highRankings[i]][1]}
                                    name={highRankings[i]}
                                    onClick={select}
                                    value={playerData[1].selectPoint.highRanking[highRankings[i]][0]}
                                >{playerData[1].selectPoint.highRanking[highRankings[i]][0]}</Button></td>
                            </tr>)}
                        <tr>
                            <td>Bonus</td>
                            <td>{playerData[0].bonus[1] ? "+35" : "0"}</td>
                            <td>{playerData[1].bonus[1] ? "+35" : "0"}</td>
                        </tr>
                        <tr>
                            <td>Sum</td>
                            <td>{playerData[0].bonus[0]}</td>
                            <td>{playerData[1].bonus[0]}</td>
                        </tr>
                        {Object.keys(lowerRankings).map((i, index) =>
                            <tr keys={index}>
                                <td>{lowerRankings[i]}</td>
                                <td>{playerData[0].selectPoint.lowerRanking[lowerRankings[i]][0]}</td>
                                <td><Button
                                    disabled={playerData[1].selectPoint.lowerRanking[lowerRankings[i]][1]}
                                    name={lowerRankings[i]}
                                    onClick={select}
                                    value={playerData[1].selectPoint.lowerRanking[lowerRankings[i]][0]}
                                >{playerData[1].selectPoint.lowerRanking[lowerRankings[i]][0]}</Button></td>
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