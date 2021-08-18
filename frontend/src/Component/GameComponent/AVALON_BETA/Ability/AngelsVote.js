import React, { useContext, useState } from "react";
import { PeersContext } from "Routes/peerStore";
import WaitingView from "../animation/WaitingView";
import { GAME_CHECK } from "../MVC/AVALON_Reducer";
import { GameContext } from "../Store";
import { SuccessImage } from "../Styled";
import AVALON_TIMER from "../View/Timer";

function AngelsVote() {
  const { gameState, dispatch } = useContext(GameContext);
  const { peers } = useContext(PeersContext);
  const gameData = { ...gameState };
  const [isClick, setIsClick] = useState(false);
  const onClick = (e) => {
    console.log("성공");
    gameData.vote.push("o");
    dispatch({ type: GAME_CHECK, gameData, peers });
    setIsClick(true);
  };
  return !isClick ? (
    <div>
      <AVALON_TIMER minutes={0} seconds={5} callDispatch={onClick} />
      <SuccessImage onClick={onClick} value={"o"} disabled={isClick} />
    </div>
  ) : (
    <WaitingView />
  );
}

export default AngelsVote;
