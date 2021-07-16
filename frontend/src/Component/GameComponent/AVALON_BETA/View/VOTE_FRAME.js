import React, {useContext} from "react";
import {Title} from "../../../WebComponent/WebPage/Style/CreateRoomStyle";
import {Pages} from "../MVC/AVALON_Reducer";
import {GameContext, PlayerContext} from "../Store";

function VOTE_FRAME() {
    const game = useContext(GameContext)
    const player = useContext(PlayerContext)
    return (
        <>
            <div>VOTE</div>
            <div>
                <Title>
                    {player.playerState.map((user, index) => <Vote key={index} index={index}/>)}
                </Title>
                <button onClick={() => game.setPage(Pages.VOTE_RESULT)}>결과</button>
            </div>

        </>
    )
}

export default VOTE_FRAME