import React, { useContext, useState, useEffect } from "react";
import { angels, GameContext } from "../Store";
import AngelsVote from "../Ability/AngelsVote";
import EvilsVote from "../Ability/EvilsVote";
import {
  EXPEDITION_CLICK,
  GAME_CHECK,
  SET_COMPONENT,
} from "../MVC/AVALON_Reducer";
import WaitingView from "../animation/WaitingView";
import { PeersContext } from "../../../../Routes/peerStore";
import * as S from "../Styled";
function EXPEDITION_FRAME() {
  const { gameState, dispatch } = useContext(GameContext);
  const { peers } = useContext(PeersContext);
  const nickname = localStorage.getItem("nickname");

  const expeditionSelectedPlayers = () => {
    const playerRole = gameState.usingPlayers.find(
      (user) => user.selected && user.nickname === nickname
    );
    return playerRole !== undefined ? playerRole.role : undefined;
  };

  useEffect(() => {
    console.log(peers);
  }, [peers]);

  console.log("expedition---------");
  console.log(peers.peers);
  const playerRole = expeditionSelectedPlayers();
  console.log(`playerRole : ${playerRole}`);

  return (
    <S.RowFrame>
      {playerRole !== undefined ? (
        angels.includes(playerRole) ? (
          <AngelsVote />
        ) : (
          <EvilsVote />
        )
      ) : (
        <WaitingView />
      )}
    </S.RowFrame>
  );
}

export default EXPEDITION_FRAME;
