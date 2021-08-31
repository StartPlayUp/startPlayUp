import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
require('dotenv').config();

function Naver() {
    const location = useLocation();

    const getNaverToken = () => {
        if (!location.hash) return;
        const token = location.hash.split('=')[1].split('&')[0];
        console.log(token);
    }
    const initializeNaverLogin = () => {
        const naverLogin = new naver.LoginWithNaverId({
            clientId: process.env.REACT_APP_naverClientID,
            callbackUrl: "http://localhost:3000",
            isPopup: false,
            loginButton: {
                color: 'green', type: 3, height: '60'
            },
        });
        naverLogin.init();
    }
    useEffect(() => {
        initializeNaverLogin();
        getNaverToken();
    }, [])

    return (
        <div id='naverIdLogin' />
    )
}

export default Naver
