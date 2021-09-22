import React, {useState, useContext, useEffect} from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import {AuthStore} from './Auth/AuthContext';
import naverGreenLogin from '../../images/naverGreenLogin.PNG'
import SignUp from './signUp.jsx'
require('dotenv').config();

const Frame = styled.div`
    display : flex;
    justify-content : center;
    flex-direction : column;
`

const Title = styled.div`
    display : flex;
    margin: 0 auto;
    font-family: Roboto;
    font-size: 32px;
    line-height: 3em;
    text-align: center;
    font-weight : lighter;
    letter-spacing : 10px;
    text-decoration : none;
    margin-bottom : 30px;
`

const LoginConnectArea = styled.div`
    margin : 50px auto;
    display : inherit;
    justify-content : center;
    align-items : center;
    flex-direction : column;
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
`

const Input = styled.input`
    display:flex;
    margin : 0 auto 12px auto;
    width:80%;
    border-bottom-width:medium solid;
    border-style:none;
    background-color : inherit;
    outline:none;
    font-style: italic;
    font-size : 14px;
    border-bottom:solid 3px #E0E3DA;
    // border-collapse:collapse;
`

const InputFrame = styled.div`
    display : flex;
    flex-wrap : nowrap;
    align-items : center;
`
const InputInfo = styled.div`
    width : 100vw;
`
const LoginButtonArea = styled.div`
    width : 30vw;
    margin : 0 atuo;
    justify-content: center;
    align-items : center;
`

const Image = styled.img`
    width : auto;
    height : 6vh;
    margin-bottom : 20px;
`
function LoginForm() {
    const AuthCon = useContext(AuthStore);
    let history = useHistory();
    const [signUpButton, setSignUpButton] = useState(false) //false 인경우 로그인하기 true인 경우 회원가입하기 창이 뜸
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const {email, password} = inputs;
    const onChange = (e) => {
        const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };
    const logOn = (e) => {
        e.preventDefault();
        AuthCon.onLogin(inputs, history)
    };
    const onClick = () => {
        setSignUpButton(!signUpButton);
    }
    const naverLoginButton = () => {
        AuthCon.onNaverLogin();
    }
    const KakaoLoginButton = () => {
        AuthCon.onKakaoLogin();
    }
    return (
        <AuthStore.Consumer>
            {({checkAuth,onSignUp}) => (
                (checkAuth ? <></> :
                    <Frame>
                        <Title>StartPlayUp</Title>
                        {signUpButton ?
                            <>
                                <InputInfo>
                                    <SignUp onSignUp={onSignUp} history={history}></SignUp>
                                </InputInfo>
                            </> :
                            <>
                                <InputFrame>
                                    <InputInfo>
                                        <Input
                                            type={'text'}
                                            name="email"
                                            onChange={onChange}
                                            placeholder={'Email'}
                                            value={email} />
                                        <Input
                                            type={'password'}
                                            name="password"
                                            onChange={onChange}
                                            placeholder={'Password'}
                                            value={password} />
                                    </InputInfo>
                                    <LoginButtonArea>
                                        <Button onClick={logOn}>Login</Button>
                                    </LoginButtonArea>
                                </InputFrame>
                                <LoginConnectArea>
                                    <Image onClick={naverLoginButton } src={ naverGreenLogin}></Image>
                                    <Image onClick={KakaoLoginButton}  src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg" />
                                </LoginConnectArea>
                            </>}
                        <button onClick={ onClick}>{signUpButton ? <div>로그인 하기</div>:<div>회원가입 하기</div> }</button>
                    </Frame>
                )
            )
            }
        </AuthStore.Consumer>
    );

}

export default LoginForm;