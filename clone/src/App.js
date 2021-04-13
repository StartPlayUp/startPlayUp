import './App.css'
import {
    Home,
    waitingRoom,
    Mafia,
    YachtDice,
    Yutnori, CreateRoom,
} from './WebPage'
import {Route} from 'react-router-dom'

const App = () => {

    return (
        <>
            <Route exact path={"/"} component={Home}/>
            <Route path={"/waitingRoom"} component={waitingRoom}/>
            <Route path={"/Mafia"} component={Mafia}/>
            <Route path={"/YachtDice"} component={YachtDice}/>
            <Route path={"/Yutnori"} component = {Yutnori}/>
            {/*<CreateRoom/>*/}
        </>
    );
};


export default App;