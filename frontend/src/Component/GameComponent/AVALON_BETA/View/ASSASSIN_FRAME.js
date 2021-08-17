import React, { useContext, useState } from "react";
import { angels, END_GAME_FRAME, GameContext } from "../Store";
import {
  ASSASSIN_KILL,
  GAME_CHECK,
  SET_COMPONENT,
} from "../MVC/AVALON_Reducer";
import { PeersContext } from "../../../../Routes/peerStore";
import * as S from "../Styled";
import WaitingView from "../animation/WaitingView";

function ASSASSIN_FRAME() {
  const { dispatch, gameState, buttonAnimation } = useContext(GameContext);
  const gameData = { ...gameState };
  const { peers } = useContext(PeersContext);
  const [killedPlayer, setKilledPlayer] = useState("");
  const onChange = (e) => {
    setKilledPlayer(e.target.value);
  };
  const onClick = (e) => {
    if (killedPlayer === "") {
      buttonAnimation(e);
    } else {
      gameData.component = END_GAME_FRAME;
      gameData.winner = killedPlayer === "Merlin" ? "악의 승리" : "선의 승리";

      dispatch({
        type: GAME_CHECK,
        gameData,
        peers,
      });
    }
  };

  return (
    <S.MainVote>
      <S.MAIN_VOTE_HEADER>멀린을 찾아 암살하시오.</S.MAIN_VOTE_HEADER>
      <S.SelectPlayer>
        {gameState.usingPlayers.map(
          (user, index) =>
            angels.includes(user.role) && (
              <label key={index}>
                <S.MainVoteLabel>{user.nickname}</S.MainVoteLabel>
                <S.MainVoteCheckbox
                  type="radio"
                  name={"vote"}
                  value={user.role}
                  onChange={onChange}
                />
                <br />
              </label>
            )
        )}
      </S.SelectPlayer>
      <S.ButtonAnimation />
      <S.MainVoteButton onClick={onClick}>kill</S.MainVoteButton>
      {/* <S.ColumnFrame>
        <h1>대기 화면</h1>
        <WaitingView />
      </S.ColumnFrame> */}
    </S.MainVote>
  );
}

export default ASSASSIN_FRAME;
