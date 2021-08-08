import React, { useContext, useEffect } from "react";
import { GameContext } from "../Store";
import { VOTE_CHECK } from "../MVC/AVALON_Reducer";
import { PeersContext } from "../../../../Routes/peerStore";
import * as S from "../Styled";

function VOTE_RESULT() {
  const { gameState, dispatch, selectedPlayers } = useContext(GameContext);
  const { peers } = useContext(PeersContext);
  const agreeVotedPlayers = () => {
    const players = [];
    gameState.usingPlayers.map((user) => {
      user.toGo === "agree" && players.push(user.nickname);
    });
    return players;
  };

  useEffect(() => {
    console.log(`voteResult : ${peers}`);
  }, [peers]);

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
    <S.ColumnFrame>
      <S.MAIN_VOTE_HEADER>{`대표자 : ${selectedPlayers()}`}</S.MAIN_VOTE_HEADER>
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
        <button onClick={() => dispatch({ type: VOTE_CHECK, peers })}>
          다음
        </button>
      </S.RowFrame>
    </S.ColumnFrame>
  );
}
export default VOTE_RESULT;
