import React, { Fragment, useState, useEffect, useContext, useReducer, memo } from "react";
import { PlayerData } from "Container/GameContainer/Yacht/YatchStore";
import styled, { keyframes } from 'styled-components';
import GameOverScreen from "../gameOverModal";
import ScoreTable from "./scoreTable";
import Modal from "react-modal";

const Div = styled.div`
    display: relative;
    width:400px;
    height:700px;
`
const Notification = keyframes`
    0%{
        opacity:1;
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
/* 애니메이션 @keyframes duration | timing-function | delay | iteration-count | direction | fill-mode | play-state | name */
const LowerWord = styled.div`
    position:absolute;
    opacity: 0;
    top:40%;
    left:28%;
    margin:auto;
    font-size: 5vw;
    z-index: 99;
    stroke: black;
    color:#FFB800;
    -webkit-text-stroke-width:3px;
    animation:${Notification} 3s linear 1s;
`
const Player = () => {
    const [lowerState, setLower] = useState(false);
    const [wordState, setWord] = useState('')
    const dataState = useContext(PlayerData);
    const lowerWord = ['Three Of a Kind!', 'Four Of a Kind!', 'Full House!', 'Small Straight!', 'Large Straight!', 'YAHTZEE!']

    useEffect(() => {
        const turn = dataState.nowTurn
        const copyData = [...dataState.playerData]
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
            else if (copyLower[i] === 0) {
                setWord('')
            }
        }
    }, [dataState.playerData])
    if (wordState) {
        setTimeout(() => {
            setWord('')
            setLower(false)
        }, 4000)
    }
    console.log(wordState)
    console.log(lowerState)
    return (
        <PlayerData.Consumer>
            {({ playerData, nowTurn, endGame, halt, selectData }) => (
                <Fragment>
                    <Div>
                        <Modal
                            isOpen={lowerState}
                            style={{
                                overlay: {
                                    position: "fixed",
                                    backgroundColor: "rgba(255, 255, 255, 0)",
                                    zIndex: "80"
                                },
                                content: {
                                    position: "absolute",
                                    border: "none",
                                    background: "none",
                                    overflow: "auto",
                                    WebkitOverflowScrolling: "touch",
                                    outline: "none",
                                }
                            }}
                        />
                        <GameOverScreen playerData={playerData} endGame={endGame} />
                        {lowerState && <LowerWord>{wordState}</LowerWord>}
                        <ScoreTable playerData={playerData} nowTurn={nowTurn} lowerState={lowerState} halt={halt} selectData={selectData} />
                    </Div>
                </Fragment>

            )}
        </PlayerData.Consumer>
    )
}
export default Player;
//
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