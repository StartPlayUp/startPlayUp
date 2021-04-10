import './App.css'
import {
    Home,
    waitingRoom,
    Mafia,
    YachtDice,
    Yutnori
} from './pages'
import React, {useState} from 'react'
import {Route} from 'react-router-dom'

const App = () => {
    return (
        <>
            <Route exact path={"/"} component={Home}/>
            <Route path={"/waitingRoom"} component={waitingRoom}/>
            <Route path={"/Mafia"} component={Mafia}/>
            <Route path={"/YachtDice"} component={YachtDice}/>
            <Route path={"/Yutnori"} component = {Yutnori}/>
        </>
    );
};


export default App;