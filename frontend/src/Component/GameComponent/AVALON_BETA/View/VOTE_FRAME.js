import React, {useContext} from "react";
import {GameContext, VOTE_RESULT} from "../Store";
import {Title} from "../Styled";
import Vote from "./Vote";

function VOTE_FRAME() {
    const {gameState, setComponent} = useContext(GameContext)
    return (
        <>
            <div>VOTE</div>
            <div>
                <Title>
                    {/*{gameState.usingPlayers.map((user, index) =>*/}
                    {/*    <Vote key={index} index={index}/>*/}
                    {/*)}*/}
                    {gameState.usingPlayers[gameState.voteTurn].nickname === localStorage.getItem('nickname')
                        && <Vote key={gameState.voteTurn} index={gameState.voteTurn}/>
                    }
                </Title>
                <button onClick={() => setComponent(VOTE_RESULT)}>투표 결과</button>
            </div>
        </>
    )
}

export default VOTE_FRAME