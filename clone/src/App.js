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

const App = () => {
    console.log(firebase_config)
    return (
        <Avalon/>
    );
};

export default App;