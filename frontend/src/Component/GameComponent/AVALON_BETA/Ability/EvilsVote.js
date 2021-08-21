import React, { useContext, useState } from "react";
import { GameContext } from "../Store";
import WaitingView from "../animation/WaitingView";
import * as S from "../Styled";
import { GAME_CHECK } from "../MVC/AVALON_Reducer";
import { PeersContext } from "Routes/peerStore";
import AVALON_TIMER from "../View/Timer";
function EvilsVote() {
  const { gameState, dispatch } = useContext(GameContext);
  const { peers } = useContext(PeersContext);
  const [isClick, setIsClick] = useState(false);
  const gameData = { ...gameState };

  const onClick = (e) => {
    gameData.vote.push(e === undefined ? "x" : e.target.value);
    dispatch({ type: GAME_CHECK, gameData, peers });
    setIsClick(true);
  };
  return !isClick ? (
    <S.RowFrame>
      <AVALON_TIMER minutes={0} seconds={5} callDispatch={onClick} />
      <S.SuccessImage onClick={onClick} value={"o"} disabled={isClick} />
      <S.FailImage onClick={onClick} value={"x"} disabled={isClick} />
    </S.RowFrame>
  ) : (
    <WaitingView />
  );
}

export default EvilsVote;
