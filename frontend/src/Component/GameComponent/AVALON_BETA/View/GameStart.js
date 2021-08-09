import React, { useContext } from "react";
import { GameContext, MINIMUM_PLAYER_NUMBER, START_FRAME } from "../Store";
import { PeersContext } from "../../../../Routes/peerStore";

function GameStart() {
  const { dispatch, gameState } = useContext(GameContext);
  const { peers } = useContext(PeersContext);
  console.log(`dispatch : ${dispatch} , gameState : ${gameState}`);
  return (
    <div>
      <button
        disabled={peers.length + 1 < MINIMUM_PLAYER_NUMBER}
        onClick={() => dispatch({ type: START_FRAME, peers })}
      >
        게임 시작
      </button>
    </div>
  );
}

export default GameStart;
