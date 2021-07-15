import React, {useContext, useState, useReducer} from "react";
import Store, {GameContext, gameContext, PlayerContext, playerContext} from "../Store";
import View from "../View";

function AVALON_VIEW() {
    return (
        <PlayerContext.Consumer>
            <GameContext.Consumer>
                <View/>
            </GameContext.Consumer>
        </PlayerContext.Consumer>

    );
}

export default AVALON_VIEW