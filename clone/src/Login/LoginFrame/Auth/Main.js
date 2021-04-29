import React from 'react';
import {Route} from 'react-router-dom';
const Main = () => {
    return (
        <div>
            <p>사용자 이메일</p>
            <p>{localStorage.getItem('email')}</p>
            <p>사용자 비밀번호</p>
            <p>{localStorage.getItem('password')}</p>
        </div>
    );
};

export default Main;