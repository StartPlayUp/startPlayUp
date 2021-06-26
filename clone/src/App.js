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
        <Switch>
            <Route exact path={'/'} component={LoginApp}/>
            <Route exact path={'/Home'} component={Home}/>
            <Route exact path={'/waitingRoom'} component={waitingRoom}/>
            <Route exact path={'/Avalon'} component={Avalon}/>
        </Switch>

    );
};

export default App;