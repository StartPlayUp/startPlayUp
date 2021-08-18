import React, { useContext, useEffect } from "react";
import { EXPEDITION_FRAME, GameContext } from "../Store";
import { VOTE_CHECK } from "../MVC/AVALON_Reducer";
import { PeersContext } from "../../../../Routes/peerStore";
import * as S from "../Styled";
import Timer_test from "./Timer";

function VOTE_RESULT() {
  const { gameState, dispatch, selectedPlayers, timeOver } =
    useContext(GameContext);
  const { peers } = useContext(PeersContext);
  const agreeVotedPlayers = () => {
    const players = [];
    gameState.usingPlayers.map((user) => {
      user.toGo === "agree" && players.push(user.nickname);
    });
    return players;
  };

  const opposeVotedPlayers = () => {
    const players = [];
    gameState.usingPlayers.map((user) => {
      user.toGo === "oppose" && players.push(user.nickname);
    });
    return players;
  };

  console.log("voteResult--=----");
  console.log(peers.peers);

  return (
    <S.PublicColumn>
      <S.MAIN_VOTE_HEADER>{`대표자 : ${selectedPlayers()}`}</S.MAIN_VOTE_HEADER>
      <Timer_test callDispatch={timeOver} minutes={0} seconds={5} />
      <S.VotePlayers>
        <S.AgreeVotePlayers>
          <h1>{`찬성 : ${agreeVotedPlayers().length}`}</h1>
          <h3>{`${agreeVotedPlayers()}`}</h3>
        </S.AgreeVotePlayers>
        <S.OpposeVotePlayers>
          <h1>{`반대  : ${opposeVotedPlayers().length}`}</h1>
          <h3> {`${opposeVotedPlayers()}`}</h3>
        </S.OpposeVotePlayers>
      </S.VotePlayers>
      <S.RowFrame>
        {/* <button onClick={() => dispatch({ type: VOTE_CHECK, peers })}>
          다음
        </button> */}
      </S.RowFrame>
    </S.PublicColumn>
  );
}
export default VOTE_RESULT;
