import './App.css'
import {
    Home,
    waitingRoom,
    Mafia,
    YachtDice,
    Yutnori,
    LoginApp
} from './WebPage'
import {Route} from 'react-router-dom';
import firebase_config from "./Login/util/firebase_config";
import {useState} from "react";

const App = () => {
    const [isLogin, setIsLogin] = useState(false);


    console.log(firebase_config)
    return (
        <>
            {/*{isLogin ? (*/}
            {/*    <Route exact path={'/'}>*/}
            {/*        <Home/>*/}
            {/*    </Route>*/}
            {/*) : (*/}
            {/*    <Route exact path={'/'}>*/}
            {/*        <LoginApp/>*/}
            {/*    </Route>*/}
            {/*)*/}

            {/*}*/}
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