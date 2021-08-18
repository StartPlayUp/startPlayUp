import React, { StrictMode, useContext, useState } from "react";
import { GameContext } from "../Store";
import CardFlip from "../animation/Card_Flip";
import styled from "styled-components";
import * as S from "../Styled";
const Box = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  flex-direction: row;
  margin: 200px 30px 30px 100px;
`;
function END_GAME_FRAME() {
  const { gameState } = useContext(GameContext);

  return (
    <S.PublicColumn>
      <h1>{gameState.winner}</h1>
      <Box>
        {gameState.usingPlayers.map((player, index) => (
          <div key={index}>
            <br />
            <div>
              <CardFlip nickname={player.nickname} role={player.role} />
            </div>
          </div>
        ))}
      </Box>
    </S.PublicColumn>
  );
}

export default END_GAME_FRAME;
