import './mainPage/webList'
import './App.css'
import {Switch, Route, useHistory} from "react-router-dom"

import WebHeader from './mainPage/webHeader'
import WebBody from './mainPage/webBody'

import React from 'react'

function App() {
    return (
        <div>
            <WebHeader/>
            <WebBody/>
        </div>
    );
}


export default App