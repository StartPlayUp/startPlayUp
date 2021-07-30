import React, { useEffect, useState, useContext } from 'react';
import styled, { keyframes } from 'styled-components';

import {
    YutContext
} from "Container/GameContainer/Yut/YutStore"

const modelShow = keyframes`
    from {
        opacity: 0;
        margin - top: -50px;
    }
    to {
        opacity: 1;
        margin - top: 0;
    }
`;

const modalBgShow = keyframes`

    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const Modal = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.2);
`;

const ModalButton = styled.button`
    outline: none;
    cursor: pointer;
    border: 0;
`;

const ModalSection = styled.div`
    width: 90%;
    max-width: 450px;
    margin: 0 auto;
    border-radius: .3rem;
    background-color: #fff;
    animation: modelShow .3s;
    overflow: hidden;
`;

const ModalSectionHeader = styled.div`
    position: relative;
    padding: 16px 64px 16px 16px;
    background-color: #f1f1f1;
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




const winnerModal = () => {

    const { winner, playerData } = useContext(YutContext);
    const [modalShow, setModalShow] = useState(false);
    useEffect(() => {
        if (playerData.length === winner.length) {
            setModalShow(true);
        }
    }, [winner])

    const modalShowOnHandler = () => {
        console.log("set on")
        setModalShow(true);
    }

    const modalShowOffHandler = () => {
        console.log("set off")
        setModalShow(false);
    }

    return (
        <>
            <button style={{ height: "100px", width: "100px" }} onClick={modalShowOnHandler}>modalOn</button>
            <button style={{ height: "100px", width: "100px" }} onClick={modalShowOffHandler}>modalOff</button>
            {modalShow && <Modal className="modal page">
                <ModalSection>
                    <ModalSectionHeader>
                        <button onClick={modalShowOffHandler}> asdf </button>
                    </ModalSectionHeader>
                </ModalSection>

            </Modal>}
        </>
    );

}

export default winnerModal;