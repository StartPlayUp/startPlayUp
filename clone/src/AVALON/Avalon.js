import React, {useContext} from "react";
import {PlayState, UserState} from "./gameSetting";
import {Route, Switch} from "react-router-dom";
import {End, Main, Result, Setting, Stage} from "./index";

function Avalon() {
    const game = useContext(PlayState)
    const user = useContext(UserState)
    return (
        <PlayState.Provider value={game}>
            <UserState.Provider value={user}>
                <Switch>
                    <Route exact path={'/avalon/setting'} component={Setting}/>
                    <Route exact path={'/avalon/main'} component={Main}/>
                    <Route exact path={'/avalon/result'} component={Result}/>
                    <Route exact path={'/avalon/expedition'} component={Stage}/>
                    <Route exact path={'/avalon/endGame'} component={End}/>
                </Switch>
            </UserState.Provider>
        </PlayState.Provider>
    )
}

export default Avalon