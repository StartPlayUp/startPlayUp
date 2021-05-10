import React from 'react';
import ReactDOM from 'react-dom';
import './JSC/Css/index.css';
import JSC from './JSC';
import { Store } from './JSC/store'

ReactDOM.render(
    <React.StrictMode>
        <Store>
            <JSC />
        </Store>
    </React.StrictMode>,
    document.getElementById('root')
);
