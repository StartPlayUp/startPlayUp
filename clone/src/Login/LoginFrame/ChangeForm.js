import React, {useState, useContext, Fragment, useEffect} from 'react';
import styled from 'styled-components';
import {Route, useHistory} from 'react-router-dom';
import {Main} from './Auth';
import {AuthStore, AuthProvider} from './Auth/AuthContext';
import {signInWithGoogle} from '../util/firebase_config';
import {getSuggestedQuery} from '@testing-library/dom';
import firebase from 'firebase';
import KakaoLogin from "react-kakao-login";
import NaverLogin from "react-login-by-naver";
import 'firebase/firestore';

require('dotenv').config();

const Button = styled.button`
    display:flex;
    background:#566270;
    width:20%;
    color:white;
    font-family: Roboto;
    font-style: normal;
    font-size: 18px;
    border:none;
    text-align: center;
    justify-content: center;
`
const Input = styled.input`
    display:flex;
    width:80%;
    border-bottom-width:medium solid;
    
`

function LoginForm() {
    const AuthCon = useContext(AuthStore);
    let history = useHistory();
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
    return (
        <AuthStore.Consumer>
            {({checkAuth}) => (
                (checkAuth ? <div/> :
                        <form>
                            <Input name="email" onChange={onChange} value={email}/>
                            <p/>
                            <Input name="password" onChange={onChange} value={password}/>
                            <Button onClick={logOn}>Login</Button>
                            <NaverLogin //네이버 로그인 모듈 사용
                                clientId={process.env.REACT_APP_naverClientID} //발급 받은 클라이언트 ID
                                callbackUrl="http://localhost:3000/Main"    //콜백 URL
                                render={(props) => <div onClick={props.onClick}>Naver로 로그인</div>}  //로그인 버튼 생성
                                onSuccess={(naverUser) => AuthCon.onNaverLogin(naverUser, history)}   //성공시
                                onFailure={() => console.error(false)} //실패한 경우
                            ></NaverLogin>
                            <KakaoLogin
                                jsKey={process.env.REACT_APP_kakaoJsKey}
                                onSuccess={(res) => AuthCon.onKakaoLogin(res, history)}   //AuthContext에 있는 카카오 로그인 함수를 실행 하도록 합니다.
                                onFailure={(res) => console.log(res)}
                                getProfile={true}
                            ><img src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"/></KakaoLogin>
                        </form>
                )
            )
            }
        </AuthStore.Consumer>
    );

}

export default LoginForm;