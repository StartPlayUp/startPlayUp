import React from 'react';
import ReactDOM from 'react-dom';
import './Css/index.css';
import Routes from './Routes';
import { LoginStore } from './LoginStore'
import { AuthStore,AuthProvider} from './Component/WebComponent/Login/LoginFrame/Auth/AuthContext'
    
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
