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
import {useContext, useState} from "react";
import {PlayState, UserState} from "./AVALON/gameSetting";

const App = () => {
    // const [isLogin, setIsLogin] = useState(false);
    console.log(firebase_config)
    return (
        <Switch>
            <Route exact path={"/"} component={LoginApp}/>
            <Route exact path={'/Home'} component={Home}/>
            <Route exact path={"/waitingRoom"} component={waitingRoom}/>
            <Route path={"/Mafia"} component={Mafia}/>
            <Route path={"/YachtDice"} component={YachtDice}/>
            <Route path={"/Yutnori"} component={Yutnori}/>
            <Route path={'/avalon'} component={Avalon}/>
        </Switch>
    );
};

export default App;