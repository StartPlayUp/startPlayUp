import React, { useContext } from "react";
import { GameContext, MINIMUM_PLAYER_NUMBER, START_FRAME } from "../Store";
import { PeersContext } from "../../../../Routes/peerStore";
import * as S from "../Styled";
import AVALON_TIMER from "./Timer";
function GameStart() {
  const { dispatch, gameState } = useContext(GameContext);
  const { peers } = useContext(PeersContext);

  console.log(`dispatch : ${dispatch} , gameState : ${gameState}`);
  // const onClick = () => {
  //   dispatch({ type: START_FRAME, peers });
  // };
  return (
    <div>
      <AVALON_TIMER
        minute={0}
        seconds={2}
        callDispatch={dispatch({ type: START_FRAME, peers })}
      />
      {/* <button
        disabled={peers.length + 1 < MINIMUM_PLAYER_NUMBER}
        onClick={onClick}
      >
        게임 시작
      </button> */}
    </div>
  );
}

export default GameStart;
