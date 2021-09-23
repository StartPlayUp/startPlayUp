import './App.css'
import {
    Home,
    waitingRoom,
    Mafia,
    YachtDice,
    Yutnori,
    LoginApp,
    Avalon,
} from './WebPage'
import {Route, Switch} from 'react-router-dom';
import firebase_config from "./Login/util/firebase_config";
import * as S from './WebPage/Style/WebFrameStyle'
import React from "react";
const App = () => {
    console.log(firebase_config)
    return (
        <>
            <S.buttonGlobalHover/>
            <Switch>
                <Route exact path={'/'} component={LoginApp}/>
                <Route exact path={'/Home'} component={Home}/>
                <Route exact path={'/waitingRoom'} component={waitingRoom}/>
                <Route exact path={'/Avalon'} component={Avalon}/>
            </Switch>
        </>


    );
};

export default App;