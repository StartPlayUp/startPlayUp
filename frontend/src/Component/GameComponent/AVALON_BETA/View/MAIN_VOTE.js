import React, {useContext, useState} from "react";
import {GameContext, VOTE_FRAME} from "../Store";
import {MAIN_VOTE_ONCLICK} from "../MVC/AVALON_Reducer";
import * as S from '../Styled'

function MAIN_VOTE() {
    const {dispatch, gameState} = useContext(GameContext);
    const [playerCount, setPlayerCount] = useState(0);
    const gameData = {...gameState};

    const onChange = (e) => {
        gameData.usingPlayers[e.target.value].selected = e.target.checked;
        e.target.checked
            ? setPlayerCount(playerCount + 1)
            : setPlayerCount(playerCount - 1);
        gameData.playerCount = playerCount;
        console.log(`playerCount : ${playerCount}`);
        console.log(`index : ${e.target.value} , checked : ${e.target.checked}`);
    };

    const onClick = () => {
        if (playerCount === gameData.takeStage[gameData.expeditionStage]) {
            gameData.voteCount += 1;
            gameData.vote = [];
            gameData.component = VOTE_FRAME;
            dispatch({type: MAIN_VOTE_ONCLICK, gameData});
        } else {
            alert(
                `${gameData.takeStage[gameData.expeditionStage]}명을 선택해야합니다.`
            );
        }
    };
    return (
        <S.MainVote>
            <S.MAIN_VOTE_HEADER>
                {"원정에 참여하는 인원 수 : " +
                gameState.takeStage[gameState.expeditionStage] +
                "명"}
            </S.MAIN_VOTE_HEADER>
            <S.SelectPlayer>
                {gameState.usingPlayers.map((user, index) => (
                    <div>
                        <S.MainVoteLabel>
                            {user.nickname}
                        </S.MainVoteLabel>
                        <S.MainVoteCheckbox
                            onChange={onChange}
                            type="checkbox"
                            name={"checkbox"}
                            value={index}/>
                    </div>
                ))}
            </S.SelectPlayer>
            <S.MainVoteButton onClick={onClick}>결정</S.MainVoteButton>
        </S.MainVote>
    );
}

export default MAIN_VOTE;
