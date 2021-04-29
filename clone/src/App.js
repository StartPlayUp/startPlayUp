import './App.css'
import {
    Home,
    waitingRoom,
    Mafia,
    YachtDice,
    Yutnori,
    LoginApp
} from './WebPage'
import {BrowserRouter, Route, Router} from 'react-router-dom';

const App = () => {
    return (
        <>
            <Route exact path={"/"} component={LoginApp}/>
            <Route exact path={'/Home'} component={Home}/>
            <Route exact path={"/waitingRoom"} component={waitingRoom}/>
            <Route path={"/Mafia"} component={Mafia}/>
            <Route path={"/YachtDice"} component={YachtDice}/>
            <Route path={"/Yutnori"} component={Yutnori}/>
        </>
    );
};

export default App;