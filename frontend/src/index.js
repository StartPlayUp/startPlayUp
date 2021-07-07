import React from 'react';
import ReactDOM from 'react-dom';
import './Css/index.css';
import Routes from './Routes';
import { LoginStore } from './LoginStore'

ReactDOM.render(
    <>
        <LoginStore>
            <Routes />
        </LoginStore>
    </>,
    document.getElementById('root')
);
