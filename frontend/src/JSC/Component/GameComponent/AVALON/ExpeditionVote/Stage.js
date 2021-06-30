import React, {useContext, useState} from "react";
import {angels} from '../gameSetting'
import AngelsVote from "./AngelsVote";
import EvilsVote from "./EvilsVote";
import {UserState, PlayState} from "../gameSetting";

function Stage({history}) {
    const [isClick, setIsClick] = useState(false);
    const gameState = useContext(PlayState)
    const userState = useContext(UserState)
    const onClick = () => {
        setIsClick(true)
        if (gameState.expeditionStage === 3 && userState.length >= 7) {
            if (gameState.vote.filter(element => 'fail' === element).length >= 2) {
                gameState.takeStage[gameState.expeditionStage] = 'fail';
            } else {
                gameState.takeStage[gameState.expeditionStage] = 'success'
            }
        } else {
            gameState.vote.includes('fail') ?
                gameState.takeStage[gameState.expeditionStage] = 'fail' :
                gameState.takeStage[gameState.expeditionStage] = 'success'
        }
        console.log(gameState.takeStage)
        console.log(userState.length)
        gameState.expeditionStage += 1;

    }
    const push = () => {
        gameState.vote = []
        history.push({
            pathname: '/main',
        })
    }
    return (
        <div>
            {
                userState.map((user, index) => (
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
                        {user.selected = false}
                    </ul>
                ))
            }

            <button onClick={onClick} disabled={isClick}>결과 보기</button>
            {
                isClick ?
                    gameState.expeditionStage !== 4 ?
                        <div>
                            {gameState.vote.includes('fail') ? '원정 실패' : '원정 성공'}
                            <div>성공 개수 : {gameState.vote.filter(element => 'success' === element).length}</div>
                            <div>실패 개수 :{gameState.vote.filter(element => 'fail' === element).length}</div>
                        </div> :
                        <div>
                            {userState.length >= 7 && gameState.vote.filter(element => 'fail' === element).length >= 2 ? '원정 실패' : '원정 성공'}
                            <div>성공 개수 : {gameState.vote.filter(element => 'success' === element).length}</div>
                            <div>실패 개수 :{gameState.vote.filter(element => 'fail' === element).length}</div>
                        </div>
                    : null
            }
            <button onClick={push}>돌아 가기</button>
        </div>
    )
}

export default Stage;