import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// dashboad layout
import routes from "./modules/modules.routes";
import Dashboard from "./layout/Dashboard";
import {createGlobalStyle} from "styled-components";
// modules
const Home = React.lazy(() => import("./modules/Home"));

const Setting = React.lazy(() => import("./modules/Setting"));
const Theme = createGlobalStyle`
    *{
      text-decoration: none;
    }
`

function NavigationBar({open,setOpen,logout}) {
    return (
        <Router>
            <Theme/>
            <Dashboard isOpen={open} isSetOpen={setOpen}  routes={routes}>
                <Switch>
                    <Route exact path={routes.home.route}>
                        <Home />
                    </Route>
                    <Route path={routes.setting.route}>
                        <Setting />
                    </Route>
                </Switch>
            </Dashboard>
        </Router>
    );
}
export default NavigationBar