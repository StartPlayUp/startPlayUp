import React, {useState, useContext, Fragment, useEffect} from 'react';
import styled from 'styled-components';
import {Route, useHistory} from 'react-router-dom';
import {Main} from './Auth';
import {AuthStore, AuthProvider} from './Auth/AuthContext';
import {signInWithGoogle} from '../util/firebase_config';
import {getSuggestedQuery} from '@testing-library/dom';
import {firebase} from 'firebase';
import KakaoLogin from "react-kakao-login";
import NaverLogin from "react-login-by-naver";
import {firestore} from 'firebase-admin';


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
    const AuthCon = useContext(AuthStore); //useContext 사용
    let history = useHistory(); // useHistory사용
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });//email,password useState 사용 기본 값  -> ''
    const {email, password} = inputs;
    const onChange = (e) => {
        const {value, name} = e.target;
        setInputs({
            ...inputs, // ...이 무슨 의미이지??
            [name]: value
        }); // 이 부분 정확하게 해석
    };
    const logOn = (e) => {
        e.preventDefault();
        AuthCon.onLogin(inputs, history)
    }; // 이 부분 정확하게 해석

    return (
        <AuthStore.Consumer>
            {({checkAuth}) => (
                (checkAuth ? <div/> :
                        <form>
                            <Input type={'text'} name="email" onChange={onChange} value={email}/>
                            <p/>
                            <Input type={'password'} name="password" onChange={onChange} value={password}/>
                            <Button onClick={logOn}>Login</Button>
                            <NaverLogin //네이버 로그인 모듈 사용
                                clientId="" //발급 받은 클라이언트 ID
                                callbackUrl="http://localhost:3000/Home"    //콜백 URL
                                render={(props) => <div onClick={props.onClick}>Naver로 로그인</div>}  //로그인 버튼 생성
                                onSuccess={(naverUser) => console.log(naverUser)}   //성공시
                                onFailure={() => console.error(true)} //실패한 경우
                            />
                            <KakaoLogin
                                jsKey={""}
                                onSuccess={(res) => console.log(res)}
                                onFailure={(res) => console.log(res)}
                                getProfile={true}
                                onFail={false}><img
                                src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"/>
                            </KakaoLogin>
                        </form>
                )
            )
            }
        </AuthStore.Consumer>
    );
}

export default LoginForm;
//(res)=>DBUpload(res)
/*
                        (naverUser) => console.log(naverUser)
const DBUpload = (res) => {
    firestore
        .Collection("User")
        .get()
        .then(res => res.json())
        .then((res) => {

        })

}
*/
//<button onClick={signInWithGoogle}>구글로 로그인하기</button>