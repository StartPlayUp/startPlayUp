import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
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
const StyleCheckDiv = styled.div`
    color: ${props => props.check === false && 'red'};
`

function SignUp(props) {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        verifyPassword: '',
        nickname: ''
    })
    const [correctPassword, setCorrectPassword] = useState(false);
    const { email, password, verifyPassword, nickname } = inputs;
    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
        console.log(inputs.password, inputs.verifyPassword)
        if (name === 'verifyPassword') {
            setCorrectPassword(inputs.password === value);
        }
        else if (name === 'password') {
            setCorrectPassword(inputs.verifyPassword === value);
        }
    };

    const onClick = () => {
        if (verifyPassword === password) {
            props.onSignUp(inputs, props.history)
        }
        else {
            alert("비밀번호와 비밀번호 확인이 서로 다릅니다.")
        }
    }

    return (
        <Div>
            <InputFrame>
                <InputInfo>
                    이메일
                    <Input
                        type={'text'}
                        name="email"
                        onChange={onChange}
                        value={email}
                    >
                    </Input>
                    비밀번호
                    <Input
                        type={'password'}
                        name="password"
                        onChange={onChange}
                        value={password}
                    ></Input>
                    <StyleCheckDiv check={correctPassword}>비밀번호 확인</StyleCheckDiv>
                    <Input
                        type={'password'}
                        name="verifyPassword"
                        onChange={onChange}
                        value={verifyPassword}
                    ></Input>
                    닉네임
                    <Input
                        type={'text'}
                        name="nickname"
                        onChange={onChange}
                        value={nickname}
                    ></Input>
                </InputInfo>
                <LoginButtonArea>
                    <SingUpButton onClick={onClick}>SignUp</SingUpButton>
                </LoginButtonArea>
            </InputFrame>
        </Div>
    )
}
export default SignUp;