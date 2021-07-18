import React, {useContext} from "react";
import {Pages} from "../MVC/AVALON_Reducer";
import {GameContext} from "../Store";
import {Title} from "../Styled";
import Vote from "./Vote";

function VOTE_FRAME() {
    const game = useContext(GameContext)
    return (
        <>
            <div>VOTE</div>
            <div>
                <Title>
                    {game.gameState.usingPlayers.map((user, index) => <Vote key={index} index={index}/>)}
                </Title>
                <button onClick={() => game.setPage(Pages.VOTE_RESULT)}>투표 결과</button>
            </div>
        </>
    )
}

export default VOTE_FRAME