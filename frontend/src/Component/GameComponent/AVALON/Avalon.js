import React from "react";
import {Route, Switch} from "react-router-dom";
import {End, Main, Result, Setting, Stage,AssassinPlayer} from "./index";

function Avalon() {
    return(
        <Switch>
            <Route exact path={'/'} component={Setting}/>
            <Route exact path={'/main'} component={Main}/>
            <Route exact path={'/result'} component={Result}/>
            <Route exact path={'/expedition'} component={Stage}/>
            <Route exact path={'/assassin'} component={AssassinPlayer}/>
            <Route exact path={'/endGame'} component={End}/>
        </Switch>
    )
}
export default Avalon