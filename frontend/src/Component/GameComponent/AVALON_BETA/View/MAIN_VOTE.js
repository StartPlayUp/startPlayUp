import React, { useContext, useState } from "react";
import { GameContext, VOTE_FRAME } from "../Store";
import { MAIN_VOTE_ONCLICK, VOTE_CHECK } from "../MVC/AVALON_Reducer";
import * as S from "../Styled";
import { PeersContext } from "Routes/peerStore";
import AVALON_TIMER from "./Timer";

function MAIN_VOTE() {
  const { dispatch, gameState, buttonAnimation, timeOver } =
    useContext(GameContext);
  const { peers } = useContext(PeersContext);
  const [playerCount, setPlayerCount] = useState(0);
  const gameData = { ...gameState };

  const onChange = (e) => {
    gameData.usingPlayers[e.target.value].selected = e.target.checked;
    e.target.checked
      ? setPlayerCount(playerCount + 1)
      : setPlayerCount(playerCount - 1);
    gameData.playerCount = playerCount;
    console.log(`playerCount : ${playerCount}`);
    console.log(`index : ${e.target.value} , checked : ${e.target.checked}`);
  };

  const onClick = (e) => {
    if (playerCount === gameData.takeStage[gameData.expeditionStage]) {
      gameData.voteCount += 1;
      gameData.vote = [];
      gameData.component = VOTE_FRAME;
      dispatch({ type: MAIN_VOTE_ONCLICK, gameData, peers });
    } else {
      buttonAnimation(e);
    }
  };

  return (
    <S.MainVote>
      <S.MAIN_VOTE_HEADER>
        {"원정에 참여하는 인원 수 : " +
          gameState.takeStage[gameState.expeditionStage] +
          "명"}
      </S.MAIN_VOTE_HEADER>
      <AVALON_TIMER minutes={0} seconds={3} callDispatch={timeOver} />
      <S.SelectPlayer>
        {gameState.usingPlayers.map((user, index) => (
          <div>
            <S.MainVoteLabel>{user.nickname}</S.MainVoteLabel>
            <S.MainVoteCheckbox
              onChange={onChange}
              type="checkbox"
              name={"checkbox"}
              value={index}
            />
          </div>
        ))}
      </S.SelectPlayer>
      <S.ButtonAnimation />
      <S.MainVoteButton onClick={onClick}>결정</S.MainVoteButton>
    </S.MainVote>
  );
}

export default MAIN_VOTE;
