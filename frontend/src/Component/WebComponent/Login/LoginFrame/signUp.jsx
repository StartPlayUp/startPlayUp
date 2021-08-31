import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
const Div = styled.div`
    display: flex;
    align-items : center;
`
const ButtonArea = styled.div`
    width : 30vw;
    margin : 0 atuo;
    justify-content: center;
    align-items : center;
`
const SingUpContainer = styled.div`
    display:flex;
    flex-direction: column;
    margin : 50px auto;
`
const Button = styled.button`
    display:flex;
    background:#566270;
    padding : 15px;
    color:white;
    font-family: Roboto;
    font-style: normal;
    font-size: 22px;
    border:none;
    text-align: center;
    justify-content: center;
    height: fit-content;
`
function SignUp() {
    return (
        <Div>
            <SingUpContainer>
                <div>
                    이메일
                </div>
                <input>
                </input>
                <div>
                    아이디
                </div>
                <input></input>
                <div>
                    비밀번호
                </div>
                <input></input>
                <div>
                    비밀번호 확인
                </div>
                <input></input>
                <div>
                    닉네임
                </div>
                <input></input>
            </SingUpContainer>
                <Button>SignUp</Button>
        </Div>
    )
}
export default SignUp;