import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import Modal from "react-modal"
const Div = styled.div`
    display: flex;
    align-items : center;
    width: 100%;
`
const InputFrame = styled.div`
    display : flex;
    flex-wrap : nowrap;
    align-items : center;
    width: 100%;
`
const InputInfo = styled.div`
    width : 20%;
    margin-left: 1%;
`
const Input = styled.input`
    display:flex;
    margin : 5px auto 12px 0;
    width:90%;
    border-bottom-width:medium solid;
    border-style:none;
    background-color : inherit;
    outline:none;
    font-style: italic;
    font-size : 14px;
    border-bottom:solid 3px #E0E3DA;
    // border-collapse:collapse;
`
const LoginButtonArea = styled.div`
    width:50%;
    justify-content: center;
    align-items : center;
`
const SingUpButton = styled.button`
    display:flex;
    background:#566270;
    margin-left: 3%;
    padding : 15px;
    color:white;
    font-family: Roboto;
    font-style: normal;
    font-size: 22px;
    border:none;
    text-align: center;
    justify-content: center;
    .active{
        background:#b10202;
    }
`

const GetNickName = () => {
    const [state, setState] = useState('')
    const onChange = (e) => {
        setState(e.target.value)
    }
    const onClick = () => {
        console.log(state)
    }
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
            }}>
            <div>닉네임을 입력하여 주십시오.</div>
            <input onChange={onChange} value={nickname}></input>
            <button onClick={onClick}>확인</button>
        </Modal>
    )
}

export default GetNickName;