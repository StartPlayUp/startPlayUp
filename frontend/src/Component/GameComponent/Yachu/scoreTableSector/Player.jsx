import React, { Fragment, useState, useEffect, useContext, useReducer, memo } from "react";
import { PlayerData } from "Container/GameContainer/Yacht/YatchStore";
import styled, { keyframes } from 'styled-components';
import GameOverScreen from "../gameOverModal";
import ScoreTable from "./scoreTable";
import Modal from "react-modal";

const Div = styled.div`
    position: relative;
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
    top:35%;
    left:155%;
    width:800px;
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
        let lower = Object.keys(copyData[turn].selectPoint.lowerRanking).map((i) => {
            return copyData[turn].selectPoint.lowerRanking[i][0]
        })
        let getPoint = Object.keys(copyData[turn].selectPoint.lowerRanking).map((i) => {
            return copyData[turn].selectPoint.lowerRanking[i][1]
        })
        let copyLower = lower.slice(0, 5);
        copyLower.push(lower[6]);
        let copyGet = getPoint.slice(0, 5);
        copyGet.push(getPoint[6]);
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
        console.log("copyData", copyData)
        console.log(wordState)
    }, [dataState.playerData])

    if (wordState) {
        setTimeout(() => {
            setWord('')
            setLower(false)
        }, 4000)
    }
    return (
        <PlayerData.Consumer>
            {({ playerData, nowTurn, endGame, halt, selectData, rollCount }) => (
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
                        <ScoreTable playerData={playerData} nowTurn={nowTurn} lowerState={lowerState} halt={halt} selectData={selectData} rollCount={rollCount} />
                    </Div>
                </Fragment>

            )}
        </PlayerData.Consumer>
    )
}
export default Player;