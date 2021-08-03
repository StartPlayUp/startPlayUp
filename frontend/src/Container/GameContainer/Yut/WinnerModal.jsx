import React, { useEffect, useState, useContext, useRef, useReducer } from 'react';
import styled, { keyframes } from 'styled-components';

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
    /* padding: 16px 16px 50px 16px; */
    font-weight: 700;
`;

// .modal > section > header button {
//     position: absolute;
//     top: 15px;
//     right: 15px;
//     width: 30px;
//     font - size: 21px;
//     font - weight: 700;
//     text - align: center;
//     color: #999;
//     background - color: transparent;
// }
// .modal > section > main {
//     padding: 16px;
//     border - bottom: 1px solid #dee2e6;
//     border - top: 1px solid #dee2e6;
// }
// .modal > section > footer {
//     padding: 12px 16px;
//     text - align: right;
// }
// .modal > section > footer button {
//     padding: 6px 12px;
//     color: #fff;
//     background - color: #6c757d;
//     border - radius: 5px;
//     font - size: 13px;
// }
// .modal.openModal {
//     display: flex;
//     align - items: center;
//     /* 팝업이 열릴때 스르륵 열리는 효과 */
//     animation: modal - bg - show .3s;
// }
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
        transform:translate(${x}px,${y}px);
    }
`;

const ImgAnimation = styled.img`
    animation:${props => moveImg(props.playerPosition[0], props.playerPosition[1])} 1s linear;
    ${props => console.log("asdf", props.playerPosition[0], props.playerPosition[1])}
    animation-fill-mode: forwards;
`;




const winnerModal = () => {
    const dummyArray = ['player1', 'player2', 'player3', 'player4']
    const { winner, playerData } = useContext(YutContext);
    const [modalShow, setModalShow] = useState(false);
    const [playerPosition, setPlayerPosition] = useState([0, 0]);

    const imgRef = useRef();
    const playerRef = useRef([]);

    const useForceRender = () => {
        const [, forceRender] = useReducer((oldVal) => oldVal + 1, 0)
        return forceRender
    }

    useEffect(() => {
        if (playerData.length === winner.length && winner.length !== 0) {
            console.log("set Modal on")
            setModalShow(true);
            console.log(playerRef)
        }
    }, [winner])

    useEffect(() => {
        if (modalShow === true && playerRef.current[0] !== undefined) {
            // const { top, right, bottom, left } = playerRef.current[0].getBoundingClientRect();
            // setPlaceXY([left, top]);
            // setPlaceXY([playerRef.current[0].screenX, playerRef.current[0].screenY]);
            // console.log("left top : ", left, top)

            const posImg = imgRef.current.getBoundingClientRect();
            const posPlayer = playerRef.current[0].getBoundingClientRect();

            // const top = posPlayer.top - posImg.top - (playerRef.current[0].offsetHeight) - 20;
            const top = posPlayer.top - posImg.top;
            // const left = posPlayer.left - posImg.left + (playerRef.current[0].offsetWidth / 2);
            const left = posPlayer.left - posImg.left;

            setPlayerPosition([left, top]);
            console.log("left : ", posPlayer.left, posImg.left,)
            console.log("top : ", posPlayer.top, posImg.top,)

        }
    }, [modalShow])

    const modalShowOffHandler = () => {
        console.log("set Modal off")
        setModalShow(false);
    }
    useForceRender();
    return (
        <>
            <StyleExitButton onClick={() => setModalShow(true)}> EXIT </StyleExitButton>
            {
                modalShow && <Modal>
                    <ModalSection>
                        <ModalSectionHeader>
                            <DivHeader>
                                <ImgAnimation ref={imgRef} playerPosition={playerPosition} src={crown} />
                                <button onClick={modalShowOffHandler}> EXIT </button>
                            </DivHeader>
                            <WinnerSection>
                                <div key={0} ref={el => playerRef.current[0] = el} >
                                    <div>{1} 등</div>
                                    <Winner>{1}</Winner>
                                </div>
                                {/* {
                                    winner.map((i, index) => <div key={index} ref={el => playerRef.current[index] = el}>
                                        <div>{index + 1} 등</div>
                                        <Winner>{i}</Winner>
                                    </div>)
                                } */}
                            </WinnerSection>
                        </ModalSectionHeader>
                    </ModalSection>
                </Modal>
            }
        </>
    );

}

export default winnerModal;