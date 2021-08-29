import React, { Component, useLayoutEffect, useState } from 'react';
//import firebase from 'firebase';
//import 'firebase/firestore';
import { testDB } from 'Common/TestDB/index2';
import axios from "axios";

const AuthStore = React.createContext(); //context 객체 생성

const AuthProvider = (props) => { //AuthProvider 컴포넌트를 생성
    const [contextState, setContextState] = useState({ //useState를 사용해 Context값을 변경하려고 합니다.
        checkAuth: false, //로그인 상태를 기록합니다. false는 로그아웃 되어있는 상태입니다.
        error: false
    });
    const { children } = props; //children에게 값을 전달합니다.
    // const testDB = [{ email: "test1", password: "test1" },
    // { email: "test2", password: "test2" }]; //테스트를 위한 하드코딩 된 이메일과 비밀번호 입니다.
    const onLogin = (model, history) => {
        /* setContextState({
            ...contextState, //
        }); */
        console.log("이메일" + model.email)
        console.log("비밀번호" + model.password)
        const checkUserEmailConfig = {
            method: 'post',
            url: 'http://localhost:4000/api/user/checkUser',
            data: {
                email: model.email
            }
        }
        axios(checkUserEmailConfig)
        .then(function (response) {
            console.log("해당 이메일로 가입한 사람 있는지 확인 : ", response.data);
            if (response.data.success) {
                setContextState({
                    ...contextState,//로그인이 성공 했음을 알립니다.
                    checkAuth: true,
                    error: false
                });
                localStorage.setItem('email', model.email); //새로고침 하더라도 계속 유지 될 수 있도록 웹 스토리지에 저장합니다.
                localStorage.setItem('password', model.password); //마찬가지로 비밀번호도 저장합니다.
                //localStorage.setItem('nickname', res[0].nickname); // 관련 닉네임을 찾아 저장합니다.
                history.push('/main');
            }
            else {
                alert("가입된 아이디가 없습니다.")
            }
        })
        .catch(function (error) {
            console.log("에러메세지:",error);
        });
        
/*         const res = testDB.filter((i) => i.email === model.email && i.password === model.password);
        console.log(res) */
        /* if (res.length > 0) {
            localStorage.setItem('email', model.email); //새로고침 하더라도 계속 유지 될 수 있도록 웹 스토리지에 저장합니다.
            localStorage.setItem('password', model.password); //마찬가지로 비밀번호도 저장합니다.
            localStorage.setItem('nickname', res[0].nickname); // 관련 닉네임을 찾아 저장합니다.

            setContextState({
                ...contextState,
                checkAuth: true,
                error: false
            }
            );
            history.push('/main');
        } else {
            setContextState({
                checkAuth: false,//전달 받은 이메일 비밀번호가 같지 않은 경우입니다.
                error: true//에러를 트루로 변경합니다.
            });
        } */
        console.log(contextState.checkAuth)
    };
    const onNaverLogin = (naverUser, history) => {
        const NaverID = naverUser.id
        const NaverEmail = naverUser.email
        const checkUserEmailConfig = {
            method: 'post',
            url: 'http://localhost:4000/api/user/checkUser',
            data: {
                email: NaverEmail
            }
        }
        axios(checkUserEmailConfig)
        .then(function (response) {
            console.log("해당 이메일로 가입한 사람 있는지 확인 : ", response.data);
            if (response.data.success) {
                setContextState({
                    ...contextState,//로그인이 성공 했음을 알립니다.
                    checkAuth: true,
                    error: false
                });
                history.push('/main');
            }
            else {
                alert("가입된 아이디가 없습니다.")
            }
        })
        .catch(function (error) {
            console.log("에러메세지:",error);
        });
        
            //console.log(naverUser);
    }
    const onKakaoLogin = (res, history) => {  //카카오 로그인 할 때 전달 받은 res 객체 중 id 요소를 파악하도록 합니다.
        setContextState({
            ...contextState,//로그인이 성공 했음을 알립니다.
            checkAuth: true,
            error: false
                        });
        const KakaoID = res.profile.id  //res 객체 중 id 배열에 접근합니다.
        console.log(res)
        history.push('/main');//메인 페이지로 넘어가게 됩니다.
    }
    return (
        <AuthStore.Provider value={{  //Provider 태그 안에서 쓸 수 있도록 합니다.
            onLogin,
            onKakaoLogin,
            onNaverLogin,
            checkAuth: contextState.checkAuth
        }}>
            {children}
        </AuthStore.Provider>
    );
}

export { AuthStore, AuthProvider };
