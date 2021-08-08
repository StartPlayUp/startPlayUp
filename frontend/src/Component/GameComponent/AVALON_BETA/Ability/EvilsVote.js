import React, { useContext, useState } from "react";
import { GameContext } from "../Store";
import WaitingView from "../animation/WaitingView";
import * as S from "../Styled";
import { GAME_CHECK } from "../MVC/AVALON_Reducer";
function EvilsVote() {
  const { gameState, dispatch } = useContext(GameContext);
  const [isClick, setIsClick] = useState(false);
  const gameData = { ...gameState };
  const onClick = (e) => {
    console.log(`${e.target.value}`);
    gameData.vote.push(e.target.value);
    dispatch({ type: GAME_CHECK, gameData });
    setIsClick(true);
  };
  return !isClick ? (
    <S.RowFrame>
      <S.SuccessImage onClick={onClick} value={"o"} disabled={isClick} />
      <S.FailImage onClick={onClick} value={"x"} disabled={isClick} />
    </S.RowFrame>
  ) : (
    <WaitingView />
  );
}

export default EvilsVote;
