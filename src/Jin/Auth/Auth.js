import React, { Component, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import {Navigate,Route} from 'react-router-dom';

const AuthContext=React.createContext(); //context 객체 생성

const AuthProvider =props=>{ //AuthProvider 컴포넌트를 생성
    const [contextState, setContextState] = useState({ //useState를 사용해 Context값을 변경하려고 합니다.
        checkAuth:false, //로그인 상태를 기록합니다. false는 로그아웃 되어있는 상태입니다.
        error:false
    });
    const {children} = props; //children에게 provider를 통해서 값을 전달합니다.
    const testDB = [{email:'jeongjin@naver.com',password:'test123'}]; //테스트를 위한 하드코딩 된 이메일과 비밀번호 입니다.

    const onLogin = model=>{
        setContextState({
            ...contextState, // 불변성을 지키기 위한 요소입니다.
        });
        if(model.email===props.email && model.password===props.password){
            localStorage.setItem('email',model.email); //새로고침 하더라도 계속 유지 될 수 있도록 웹 스토리지에 저장합니다.
            localStorage.setItem('password',model.password); //마찬가지로 비밀번호도 저장합니다.
            setContextState({
                checkAuth:ture,
                error:false
            });
        }else{
            setContextState({
                checkAuth:false,//전달 받은 이메일 비밀번호가 같지 않은 경우입니다.
                error:ture//에러를 트루로 변경합니다.
            });
        }
    };
    const onLogout = () =>{ //로그아웃을 하는 컴포넌트 입니다.
        localStorage.removeItem('email');//로그아웃을 했기 때문에 이메일, 비밀번호를 지웁니다.
        localStorage.removeItem('password');
        setContextState({ //로그인 상태를 변경합니다. checkAuth의 상태를 변경해 로그아웃 상태임을 알려줍니다.
            ...contextState,
            checkAuth:false,
            error:false
        });
    };
    /*
    const signIn =model=>{ //회원가입 하는 컴포넌트 입니다. 향후에 구현할 예정입니다.
        setContextState({
            ...contextState,
        });
        
    }
    */
    return(
        <AuthContext.Provider value={{  //Provider 태그 안에서 쓸 수 있도록 합니다.
            onLogin,onLogout,error:contextState.error
        }}>
            {children}
        </AuthContext.Provider>
    );
}
const AuthRoute=({ component: Component, ...rest})=>(//다른 페이지를 띄워주기 위한 컴포넌트 입니다.
    <AuthContext.Consumer>
        {({ checkAuth})=>{
            let content = '';

            if (checkAuth){
                content =(
                    <Route render = { props => ( <Component { ...props}/>)}
                {...rest}
                />
                );
            }
        }
        }
    </AuthContext.Consumer>
);

export { AuthProvider,AuthRoute };