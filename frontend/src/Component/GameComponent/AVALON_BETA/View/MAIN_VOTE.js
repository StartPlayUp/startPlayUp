import React, {useContext, useState} from "react";
import {GameContext, VOTE_FRAME} from "../Store";
import{MAIN_VOTE_ONCLICK} from "../MVC/AVALON_Reducer";

function MAIN_VOTE() {
    const {dispatch, gameState} = useContext(GameContext)
    const [playerCount, setPlayerCount] = useState(0)
    const gameData = {...gameState}
    const onChange = e => {
        gameData.usingPlayers[e.target.value].selected = e.target.checked
        e.target.checked ? setPlayerCount(playerCount + 1) : setPlayerCount(playerCount - 1)
        gameData.playerCount = playerCount
        console.log(`playerCount : ${playerCount}`)
        console.log(`index : ${e.target.value} , checked : ${e.target.checked}`)
    }
    const onClick = () => {
        if (playerCount === gameData.takeStage[gameData.expeditionStage]) {
            gameData.voteCount += 1
            gameData.vote = []
            gameData.component = VOTE_FRAME
            console.log(gameData)
            dispatch({type: MAIN_VOTE_ONCLICK, gameData})
        } else {
            alert(`${gameData.takeStage[gameData.expeditionStage]}명을 선택해야합니다.`)
        }
    }
    return (
        <div>
            <h3>{"원정에 참여하는 인원 수 : " + gameState.takeStage[gameState.expeditionStage] + "명"}</h3>
            {gameState.usingPlayers.map((user, index) => (
                <ul key={index}>
                    <label>{user.nickname}
                        <input
                            onChange={onChange}
                            type="checkbox"
                            name={'checkbox'}
                            value={index}
                        />
                    </label>
                </ul>
            ))}
            <button onClick={onClick}>결정</button>
        </div>
    )
}

export default MAIN_VOTE