import React, {useContext} from "react";
import {Pages} from "./MVC/AVALON_Reducer";
import {angels, GameContext, PlayerContext, voteStageColor} from "./Store";
import {Circle, Frame, PublicFrame, User, VoteStageFrame} from "./Styled";
import {Title} from "../../WebComponent/WebPage/Style/CreateRoomStyle";
import MerlinPlayer from "./Ability/MerlinPlayer";
import PercivalPlayer from "./Ability/PercivalPlayer";
import AngelsVote from "./Ability/AngelsVote";
import EvilsVote from "./Ability/EvilsVote";
import GameStart from "./View/GameStart";
import MAIN_FRAME from "./View/MAIN_FRAME";
import MAIN_VOTE from "./View/MAIN_VOTE";
import VOTE_FRAME from "./View/VOTE_FRAME";
import VOTE_RESULT from "./View/VOTE_RESULT";
import EXPEDITION_FRAME from "./View/EXPEDITION_FRAME";
import EXPEDITION_RESULT from "./View/EXPEDITION_RESULT";
import ASSASSIN_FRAME from "./View/ASSASSIN_FRAME";
import END_GAME_FRAME from "./View/END_GAME_FRAME";

function View() {
    const game = useContext(GameContext)
    switch (game.gameState.page) {
        case Pages.START_FRAME:
            return <GameStart/>
        case Pages.MAIN_FRAME:
            return <MAIN_FRAME/>
        case Pages.MAIN_VOTE:
            return <MAIN_VOTE/>
        case Pages.VOTE_FRAME:
            return <VOTE_FRAME/>
        case Pages.VOTE_RESULT:
            return <VOTE_RESULT/>
        case Pages.EXPEDITION_FRAME:
            return <EXPEDITION_FRAME/>
        case Pages.EXPEDITION_RESULT:
            return <EXPEDITION_RESULT/>
        case Pages.ASSASSIN_FRAME:
            return <ASSASSIN_FRAME/>
        case Pages.END_GAME_FRAME:
            return <END_GAME_FRAME/>
    }
    return (
        <div>
            error
        </div>
    )
}

export default View