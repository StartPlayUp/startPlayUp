import React, { useContext } from "react";
import {
  FRAME_MAIN,
  GameContext,
  MINIMUM_PLAYER_NUMBER,
  START_FRAME,
} from "../Store";
import { PeersContext } from "../../../../Routes/peerStore";
import * as S from "../Styled";
import AVALON_TIMER from "./Timer";
function GameStart() {
  const { dispatch, gameState } = useContext(GameContext);
  const { peers } = useContext(PeersContext);

  console.log(`dispatch : ${dispatch} , gameState : ${gameState}`);
  const onClick = () => {
    dispatch({ type: START_FRAME, peers });
    gameState.component = FRAME_MAIN;
    console.log("--------------");
    console.log(gameState);
  };
  return (
    <div>
      <AVALON_TIMER minute={0} seconds={3} callDispatch={onClick} />
      <button onClick={onClick}>게임 시작</button>
    </div>
  );
}

export default GameStart;
