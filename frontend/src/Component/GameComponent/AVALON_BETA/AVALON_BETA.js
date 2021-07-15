import React from "react";
import Table from "../MineSearch/Table";
import TakeStage from "../AVALON/gamePage/mainView/TakeStage";
import VoteStage from "../AVALON/gamePage/mainView/VoteStage";
import {PlayerList} from "./Styled";
import Store from "./Store";
import AVALON_VIEW from "./MVC/AVALON_VIEW";
function AVALON_BETA() {
    return(
        <Store>
            <AVALON_VIEW/>
        </Store>
    )
}
export default AVALON_BETA