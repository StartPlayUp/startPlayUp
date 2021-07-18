import React, {useContext} from "react";
import {GameContext} from "../Store";

function MAIN_VOTE() {
    const game = useContext(GameContext)
    return (
        <div>
            <h3>{"원정에 참여하는 인원 수 : " + game.gameState.takeStage[game.gameState.expeditionStage] + "명"}</h3>
            {game.gameState.usingPlayers.map((user, index) => (
                <ul key={index}>
                    <label>{user.nickname}
                        <input
                            onChange={game.voteOnChange}
                            type="checkbox"
                            name={'checkbox'}
                            value={index}
                        />
                    </label>
                </ul>
            ))}
            <button onClick={game.voteOnClick}>결정</button>
        </div>
    )
}

export default MAIN_VOTE