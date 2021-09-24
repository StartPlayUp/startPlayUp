import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// dashboad layout
import routes from "./modules/modules.routes";
import Dashboard from "./layout/Dashboard";
// modules
const Home = React.lazy(() => import("./modules/Home"));
const Setting = React.lazy(() => import("./modules/Setting"));
const User = React.lazy(()=> import("./modules/UserInformationModal"))
import * as S from '../Style/WebFrameStyle'
function NavigationBar({open,setOpen,logout}) {
    return (
        <Router>
                <Dashboard isOpen={open} isSetOpen={setOpen} routes={routes}>
                    <Switch>
                        <Route exact path={routes.main.route}/>
                        <Route path={routes.setting.route}>
                            <Setting />
                        </Route>
                        <Route path={routes.users.route}>
                            <User open={false} setOpen={setOpen}/>
                        </Route>
                        <Route path={routes.signout.route}>
                            {logout}
                        </Route>
                    </Switch>
                </Dashboard>
        </Router>
    );
}
export default NavigationBar