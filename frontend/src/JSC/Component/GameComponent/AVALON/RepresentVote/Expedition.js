import React, {useContext, useState} from "react";
import {withRouter} from 'react-router-dom';
import {UserState,PlayState} from "../gameSetting";

function Expedition({history}) {
    const [playerCount, setPlayerCount] = useState(0);
    const [voteStage, setVoteStage] = useState(0);
    const [isClick, setIsClick] = useState(true);
    const gameState = useContext(PlayState)
    const userState = useContext(UserState)
    const onChange = e => {
        userState[e.target.value].selected = e.target.checked;
        e.target.checked ? setPlayerCount(playerCount + 1) : setPlayerCount(playerCount - 1);
    }
    const onClick = () => {
        if (playerCount === gameState.takeStage[gameState.expeditionStage]) {
            setVoteStage(voteStage + 1);
            history.push({
                pathname: '/result',
            });
            setIsClick(false);
        } else {
            alert(`${gameState.takeStage[gameState.expeditionStage]}명을 선택해야합니다.`);
        }
    }
    return (
        <div>{
            isClick ?
                userState.map((user, index) => (
                    <ul key={index}>
                        <label>{user.nickname}
                            <input
                                onChange={onChange}
                                type="checkbox"
                                name={'checkbox'}
                                value={index}/>
                        </label>
                    </ul>
                )) : null
        }
            <button disabled={!isClick} onClick={onClick}>결정</button>
        </div>
    );
}

export default withRouter(Expedition)