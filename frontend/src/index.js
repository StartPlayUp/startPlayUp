import React from 'react';
import ReactDOM from 'react-dom';
import './Css/index.css';
import Routes from './Routes';
import { Store } from './store'

ReactDOM.render(
    <React.StrictMode>
        <Store>
            <Routes />
        </Store>
    </React.StrictMode>,
    document.getElementById('root')
);
