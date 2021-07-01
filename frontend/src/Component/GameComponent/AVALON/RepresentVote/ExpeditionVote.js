import React, {useContext, useState} from "react";
import PlayerInfo from "../MainPage/PlayerInfo";
import Vote from "./Vote";
import {Title} from "../MainPage/Styled";
import {withRouter} from "react-router-dom";
import Expedition from "./Expedition";
import {UserState,PlayState} from "../gameSetting";


function ExpeditionVote({history}) {
    const gameState = useContext(PlayState)
    const userState = useContext(UserState)
    const [isClick, setIsClick] = useState(false);
    const onClick = () => {
        setIsClick(true);
    }
    const nextPage = () => {
        let agree = 0;
        let oppose = 0;
        userState.map(e => e.toGo === 'agree' ? ++agree : ++oppose)
        if (agree >= oppose) {
            gameState.voteStage = 0;
            history.push({
                pathname: '/expedition',
                state: {
                    vote: gameState.voteStage,
                }
            })
        } else {
            if (gameState.voteStage === 4) {
                gameState.takeStage[gameState.expeditionStage] = 'fail';
                gameState.expeditionStage += 1;
                gameState.voteStage = 0;
            } else {
                gameState.voteStage += 1;
            }
            history.push({
                pathname: '/main',
                state: {
                    vote: gameState.voteStage,
                }
            });
        }
        gameState.represent += 1;
        gameState.represent %= userState.length;
        // 해당 부분 state 로 구현하기
    }
    return (
        <div>
            <PlayerInfo/>
            <Expedition/>
            <Title>
                {userState.map((user, index) => <Vote key={index} index={index}/>)}
            </Title>
            <br/>
            <button onClick={onClick}>결과</button>
            {/*나중에 Timeout으로 처리*/}
            {
                isClick ?
                    <div>
                        {userState.map((user, index) => (
                            <ul key={index}>
                                <li>{`nickname : ${user.nickname}`}</li>
                                <li>{`vote : ${user.toGo === 'agree' ? '찬성' : '반대'}`}</li>
                            </ul>
                        ))}
                        <button onClick={nextPage}>다음</button>
                    </div> : null
            }
        </div>
    )
}

export default withRouter(ExpeditionVote);