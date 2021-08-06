import React, { Fragment, useState, useEffect, useContext, useReducer, memo } from "react";
import Modal from 'react-modal';
import styled, { keyframes } from 'styled-components';

function GameOverScreen({ playerData, endGame }) {
    const [winnerNickName, setWinner] = useState('');
    function gameOverResult() {
        if (playerData[0].result > playerData[1].result) {
            setWinner(playerData[0].nickname);
        }
        else {
            setWinner(playerData[1].nickname);
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
                    backgroundColor: 'rgba(255, 255, 255, 0.75)',
                    zIndex: '99'
                },
                content: {
                    position: 'absolute',
                    width: '60%',
                    height: '41.7%',
                    border: '1px solid #ccc',
                    background: '#fff',
                    overflow: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    borderRadius: '4px',
                    outline: 'none',
                    padding: '20px',
                }
            }}
        >
            <div>Winner!</div>
            <div>{winnerNickName}</div>
            <div>{ }</div>
        </Modal>
    );
}

export default GameOverScreen;

Modal.setAppElement('body');