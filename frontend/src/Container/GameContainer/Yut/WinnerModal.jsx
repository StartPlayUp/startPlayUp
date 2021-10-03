import React, { useEffect, useState, useContext, useRef, useReducer } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

import crown from 'image/crown.png'

import {
    YutContext
} from "Container/GameContainer/Yut/YutStore"

const modelShow = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;


const Modal = styled.div`
    width: 100%;
    height: 100%;

    /* 중앙 정렬 */
    display: flex;
    justify-content: center;
    align-items: center;

    /* 위치 0,0 로 */
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.2);
`;

const ModalSection = styled.div`
    /* width: 90%; */
    /* max-width: 450px;
    min-width: 300px; */
    display: flex;
    justify-content: center;
    align-items: stretch;
    width: 1150px;
    height:480px;
    border-radius: 1rem;
    background-color: #fff;
    animation: ${modelShow} 1s;
    overflow: hidden;
`;

const ModalSectionHeader = styled.div`
    /* position: relative; */
    display:flex;
    flex-direction: column;
    justify-content:space-between;
    align-items: center;
    width:100%;
    padding: 16px 16px 50px 16px;
    font-weight: 700;
`;

const DivHeader = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 1000px;
    height:450px;

`;

const StyleExitButton = styled.button`

    /* 위치 */
    position:absolute;
    left: calc(50% - 230px/2 + 440px);
    top: calc(50% - 50px/2 - 187px);
    width: 230px;
    height: 50px;
    background: #FFFFF3;
    opacity: 0.5;
    border: 3px solid #010101;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 30px;

    /* 폰트 */
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 30px;
    line-height: 35px;
`;

const WinnerSection = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-end;
    width: 1000px;
    height:450px;

`;

const Winner = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px;
    width: 200px;
    height: 100px;
    background: #44F056;
    mix-blend-mode: normal;
    border: 1px solid #000000;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;

    /* 폰트 */

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 36px;
    line-height: 42px;
    display: flex;
    align-items: center;
    text-align: center;
`;

const moveImg = (x, y) => keyframes`
    from{
        opacity: 0;
        transform:translate(0px,0px);
    }
    to{
        opacity: 1;
        transform: translate(${x}px,${y}px);
    }
`;

const rotateY = (x, y) => keyframes`
    /* from{
        transform: rotateY(0deg) translate(${x}px,${y}px);
    }
    to{
        transform: rotateY(360deg) translate(${x}px,${y}px);
    } */
    from{
        transform:scale(1) translate(${x}px,${y}px);
    }
    33%{
        transform:scale(0.98) translate(${x}px,${y}px);
    }
    66%{
        transform:scale(1.02) translate(${x}px,${y}px);
    }
    to{
        transform:scale(1) translate(${x}px,${y}px);

    }
`;

const ImgAnimation = styled.img`
    /* animation:${props => moveImg(props.playerPosition[0], props.playerPosition[1])} 1s linear;
    animation-fill-mode: forwards; */
    transform-origin:left;
    animation-name:${props => moveImg(props.playerPosition[0], props.playerPosition[1])} ,${props => rotateY(props.playerPosition[0], props.playerPosition[1])};
    animation-fill-mode: forwards;
    animation-delay: 0s, 1s;
    animation-duration: 1s, 1s;
    animation-iteration-count: 1,infinite;
    animation-timing-function: ease-in, ease-in;

`;




const winnerModal = () => {
    const { winner, playerData } = useContext(YutContext);
    const [modalShow, setModalShow] = useState(true);
    const [playerPosition, setPlayerPosition] = useState([0, 0]);


    const imgRef = useRef();
    const playerRef = useRef([]);


    const modalShowOffHandler = () => {
        console.log("set Modal off")
        setModalShow(false);
    }

    const onLoadHandler = () => {
        const posImg = imgRef.current.getBoundingClientRect();
        const posPlayer = playerRef.current[0].getBoundingClientRect();
        const top = posPlayer.top - posImg.top - posImg.height;
        const left = posPlayer.left - posImg.left;
        setPlayerPosition([left, top]);
    }

    useEffect(async () => {
        if (playerData.length === winner.length && winner.length !== 0) {
            const userList = []
            winner.forEach((i, index) => {
                if (index === 0) {
                    userList.push({ nickname: i, winner: true })
                }
                else {
                    userList.push({ nickname: i, winner: false })
                }
            })
            const config = {
                method: "post",
                url: "http://localhost:4000/api/user/updateGameResult",
                data: { userList },
                withCredentials: true
            }
            const { data } = await axios(config);
            alert(data.success);
        }
    }, [winner])

    return (
        <>
            {
                modalShow && playerData.length === winner.length && winner.length !== 0 && <Modal>
                    <ModalSection>
                        <StyleExitButton onClick={modalShowOffHandler}> EXIT </StyleExitButton>
                        <ModalSectionHeader>
                            <DivHeader>
                                <ImgAnimation ref={imgRef} playerPosition={playerPosition} src={crown} onLoad={onLoadHandler} />

                            </DivHeader>
                            <WinnerSection>
                                {
                                    winner.map((i, index) => <div key={index} ref={el => playerRef.current[index] = el}>
                                        <div>{index + 1} 등</div>
                                        <Winner>{i.split(' ')[0]}</Winner>
                                    </div>)
                                }
                            </WinnerSection>
                        </ModalSectionHeader>
                    </ModalSection>
                </Modal>
            }
        </>
    );

}

export default winnerModal;