import React from "react";
import Table from "../MineSearch/Table";
import {PlayerList} from "./Styled";
import {Store} from "./Store";
import AVALON_VIEW from "./MVC/AVALON_VIEW";
import View from "./View";
function AVALON_BETA() {
    return(
        <Store>
            <View/>
        </Store>
    )
}
export default AVALON_BETA