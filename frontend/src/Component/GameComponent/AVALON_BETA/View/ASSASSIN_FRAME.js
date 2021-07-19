import React, {useContext} from "react";
import {END_GAME_FRAME, GameContext} from "../Store";
import {ASSASSIN_KILL} from "../MVC/AVALON_Reducer";
function ASSASSIN_FRAME() {
    const {dispatch, gameState} = useContext(GameContext)
    const onChange = e => {
        return e.target.value
    }
    const onClick = () => {
        const gameArr = {...gameState}
        const targetPlayer = onChange.toString()
        targetPlayer === 'Merlin' ? gameArr.winner = '악의 승리' : gameArr.winnner = '선의 승리'
        gameArr.component = END_GAME_FRAME
        dispatch({type: ASSASSIN_KILL, gameArr})
    }
    return (
        <>
            <h3>ASSASSIN</h3>
            {gameState.usingPlayers.map((user, index) => (
                <label key={index}>
                    {user.nickname}
                    <input type="radio"
                           name={'vote'}
                           value={user.role}
                           onChange={onChange}
                    />
                    <br/>
                </label>
            ))}
            <button onClick={onClick}>kill</button>
        </>
    )
}

export default ASSASSIN_FRAME
