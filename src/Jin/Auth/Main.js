import React,{useContext,useState} from 'react';
import {Route} from 'react-router-dom';
import { AuthStore, AuthProvider } from './AuthContext';
const Main = () =>{
    const test = useContext(AuthStore)
    return(
        <div>
        <p>사용자 이메일</p>
        <p>{console.log(AuthStore),console.log(test)}</p>
        <p>{localStorage.getItem('email')}</p>
        <p>사용자 비밀번호</p>
        <p>{localStorage.getItem('password')}</p>
        </div>
    );
};

export default Main;