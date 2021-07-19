import React, {useContext} from "react";
import {angels, GameContext} from "../Store";
import AngelsVote from "../Ability/AngelsVote";
import EvilsVote from "../Ability/EvilsVote";

function EXPEDITION_FRAME() {
    const game = useContext(GameContext)
    return (
        <>
            <div>
                {
                    game.gameState.usingPlayers.map((user, index) => (
                        <ul key={index}>
                            {user.selected ?
                                <div>
                                    <li>{user.nickname}</li>
                                    {angels.includes(user.role) ?
                                        <AngelsVote value={index}/>
                                        :
                                        <EvilsVote value={index}/>}
                                </div>
                                : null}
                        </ul>
                    ))
                }
                <button onClick={game.expeditionClick}>결과</button>
            </div>
        </>
    );
}

export default EXPEDITION_FRAME