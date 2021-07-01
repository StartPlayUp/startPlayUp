import React, {useContext} from "react";
import {
    PageFrame, UserList,
    GameFrame, GameState
} from "./Styled";

import AssassinPlayer from "../Ability/AssassinPlayer";
import PlayerInfo from "./PlayerInfo";
import ExpeditionStage from "./ExpeditionStage";
import VoteStage from "./VoteStage";
import GameEnd from "./GameEnd";
import {UserState, PlayState} from "../gameSetting";

function MainFrame() {
    const gameState = useContext(PlayState)
    const playerState = useContext(UserState)
    const angels = gameState.takeStage.filter(element => 'success' === element).length;
    const evils = gameState.takeStage.filter(element => 'fail' === element).length;

    return (
        <PageFrame>
            {angels === 3 ? playerState.map(e => e.role === 'Assassin') ? <AssassinPlayer/> : null : null}
            {evils === 3 ? <GameEnd/> : null}
            {
                angels!==3 && evils!==3
            }
            <div>
                <ExpeditionStage/>
                <VoteStage name={'hello'}/>
                <UserList/>
                <PlayerInfo/>
                <GameFrame>
                    <GameState/>
                </GameFrame>
            </div>
        </PageFrame>
    )
}

export default MainFrame;