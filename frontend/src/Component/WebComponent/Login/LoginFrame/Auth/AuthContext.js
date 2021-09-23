import React, { Component, useEffect, useLayoutEffect, useState } from 'react';
//import firebase from 'firebase';
//import 'firebase/firestore';
import { testDB } from 'Common/TestDB/index2';
import axios from "axios";
import Cookies, { CookiesGetOptions } from 'universal-cookie';
const AuthStore = React.createContext(); //context 객체 생성

const AuthProvider = (props) => { //AuthProvider 컴포넌트를 생성
    const [contextState, setContextState] = useState({ //useState를 사용해 Context값을 변경하려고 합니다.
        checkAuth: false, //로그인 상태를 기록합니다. false는 로그아웃 되어있는 상태입니다.
        error: false
    });

    const { children } = props; //children에게 값을 전달합니다.
    const onLogin = (model, history) => {
        axios.defaults.withCredentials = true;
        const userLogin = {
            method: 'post',
            url: 'http://localhost:4000/api/auth/login/local',
            data: {
                email: model.email,
                password: model.password
            },
            WithCredentials: true
        }
        axios(userLogin)
            .then(function (response) {
                console.log("해당 이메일로 가입한 사람 있는지 확인 : ", response.data);
                if (response.data.success) {
                    setContextState({
                        ...contextState,//로그인이 성공 했음을 알립니다.
                        checkAuth: true,
                        error: false
                    });
                    // localStorage.setItem('email', model.email); //새로고침 하더라도 계속 유지 될 수 있도록 웹 스토리지에 저장합니다.
                    // localStorage.setItem('password', model.password); //마찬가지로 비밀번호도 저장합니다.
                    history.push(response.data.redirectPath);
                }
                else {
                    alert("가입된 아이디가 없습니다.")
                }
            })
            .catch(function (error) {
                console.log("에러메세지:", error);
            });
    };
    const onNaverLogin = () => {
        window.location.href = 'http://localhost:4000/api/auth/login/naver'

    }
    const onKakaoLogin = () => {  //카카오 로그인 할 때 전달 받은 res 객체 중 id 요소를 파악하도록 합니다.
        window.location.href = "http://localhost:4000/api/auth/login/kakao"
    }
    const createUser = (user) => {
        const createUserConfig = {
            method: 'post',
            url: 'http://localhost:4000/api/user/createUser',
            data: user
        }
        axios(createUserConfig)
            .then(function (response) {
                if (response.data.success) {
                    console.log("createUser check : ", response.data);
                    alert("회원가입에 성공하였습니다. 다시 로그인 해")
                    setTimeout(function () {
                        location.reload();
                    }, 3000);
                }
                else {
                    alert("회원가입에 실패하였습니다.")
                }
            })
            .catch(function (error) {
                console.log(error);
                alert("회원가입에 실패하였습니다.")
            });
    }
    const onSignUp = (profile, history) => {
        const user = {
            email: profile.email,
            password: profile.password,
            nickname: profile.nickname
        }
        createUser(user);
    }
    const alreadyLogged = (history) => {
        setContextState({
            ...contextState,//로그인이 성공 했음을 알립니다.
            checkAuth: true,
            error: false
        });
        history.push('/main');
    }
    const logout = (history) => {
        setContextState({
            ...contextState,//로그인이 성공 했음을 알립니다.
            checkAuth: false,
            error: false
        });
        history.push('/');
    }
    return (
        <AuthStore.Provider value={{  //Provider 태그 안에서 쓸 수 있도록 합니다.
            onLogin,
            onSignUp,
            onNaverLogin,
            onKakaoLogin,
            checkAuth: contextState.checkAuth,
            alreadyLogged,
            logout,
        }}>
            {children}
        </AuthStore.Provider>
    );
}

export { AuthStore, AuthProvider };
