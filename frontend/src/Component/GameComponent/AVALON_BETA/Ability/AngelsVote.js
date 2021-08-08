import React, { useContext, useState } from "react";
import WaitingView from "../animation/WaitingView";
import { GAME_CHECK } from "../MVC/AVALON_Reducer";
import { GameContext } from "../Store";
import { SuccessImage } from "../Styled";

function AngelsVote() {
  const { gameState, dispatch } = useContext(GameContext);
  const gameData = { ...gameState };
  const [isClick, setIsClick] = useState(false);
  const onClick = (e) => {
    console.log("성공");
    gameData.vote.push(e.target.value);
    dispatch({ type: GAME_CHECK, gameData });
    setIsClick(true);
  };
  return !isClick ? (
    <SuccessImage onClick={onClick} value={"o"} disabled={isClick} />
  ) : (
    <WaitingView />
  );
}

export default AngelsVote;
