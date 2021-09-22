import React from 'react';
import ReactDOM from 'react-dom';
import './Css/index.css';
import Routes from './Routes';
import { AuthStore, AuthProvider } from './Component/WebComponent/Login/LoginFrame/Auth/AuthContext'
require('dotenv').config();
import { CookiesProvider } from 'react-cookie';


ReactDOM.render(
    <>
        {/* <LoginStore> */}
        <AuthProvider>
            <Routes />
        </AuthProvider>
        {/* </LoginStore> */}
    </>,
    document.getElementById('root')
);
