import React, { Fragment, useState, useEffect, useContext, useReducer, memo } from "react";
import Modal from 'react-modal';
import styled, { keyframes } from 'styled-components';
const Table = styled.table`
    position:absolute;
    background-color: white;
    top:35%;
    width:640px;
    height: 122px;
    color:black;
    tr{
        text-align: center;
        height:3.3vh;
    }
    td{
        font-size: 2vw;
        border:3px solid;
        vertical-align:middle;
    }
    th{
        width:50%;
        font-size: 2.5vw;
        border:3px solid;
        vertical-align:middle;
    }
`
const Button = styled.button`
    position: absolute;
    bottom:5%;
    right:2%;
    width: 286px;
    height: 44px;
    background: #FFFFF3;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border:none;
    font-size:1vw;
    :active{
        background-color: #f17777;
        color:white;
    }
`
function GameOverScreen({ playerData, endGame }) {
    const [winnerNickName, setWinner] = useState('');
    function gameOverResult() {
        if (playerData[0].result > playerData[1].result) {
            setWinner(playerData[0].nickname + '님의 승리!');
        }
        else if ((playerData[0].result < playerData[1].result)) {
            setWinner(playerData[1].nickname + '님의 승리!');
        }
        else {
            setWinner('Draw!')
        }
    }
    useEffect(() => {
        gameOverResult();
    }, [endGame])
    return (
        <Modal
            isOpen={endGame}
            style={{
                overlay: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(54, 54, 54, 0.75)',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    zIndex: '99'
                },
                content: {
                    display: 'flex',
                    position: 'absolute',
                    top: '25%',
                    left: '30%',
                    width: '40%',
                    height: '30%',
                    border: 'none',
                    background: '#D6E4C8',
                    overflow: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    borderRadius: '15px',
                    outline: 'none',
                    padding: '20px',
                    fontSize: '3vw',
                    alignItems: 'center',
                    flexDirection: 'column',
                    color: '#FFB800'
                }
            }}
        >
            <div>{winnerNickName}</div>
            <Table>
                <thead>
                    <tr>
                        <th>
                            {playerData[0].nickname}
                        </th>
                        <th>{playerData[1].nickname}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{playerData[0].result}</td>
                        <td>{playerData[1].result}</td>
                    </tr>
                </tbody>
            </Table>
            <Button>대기방으로 돌아가기</Button>
        </Modal>
    );
}

export default GameOverScreen;

Modal.setAppElement('body');