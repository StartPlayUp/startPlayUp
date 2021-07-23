import React, {useContext} from "react";
import {angels, GameContext} from "../Store";
import AngelsVote from "../Ability/AngelsVote";
import EvilsVote from "../Ability/EvilsVote";
import {EXPEDITION_CLICK} from "../MVC/AVALON_Reducer";

function EXPEDITION_FRAME() {
    const {gameState, dispatch} = useContext(GameContext)
    const nickname = localStorage.getItem('nickname')
    return (
        <>
            <div>
                {
                    gameState.usingPlayers.map((user, index) => (
                        user.nickname === nickname && user.selected?
                        <ul key={index}>
                            {user.nickname === nickname && user.selected ?
                                <div>
                                    <li>{user.nickname}</li>
                                    {angels.includes(user.role) ?
                                        <AngelsVote value={index}/>
                                        :
                                        <EvilsVote value={index}/>}
                                </div>
                                : <h3>대기 중 ...</h3>}
                        </ul> : <h3>대기 중..</h3>
                    ))
                }
                <button onClick={() => dispatch({type: EXPEDITION_CLICK})}>결과</button>
            </div>
        </>
    );
}

export default EXPEDITION_FRAME