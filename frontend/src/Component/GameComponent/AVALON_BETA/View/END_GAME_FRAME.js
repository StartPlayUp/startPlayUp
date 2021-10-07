import React, { StrictMode, useContext, useState } from "react";
import { GameContext } from "../Store";
import CardFlip from "../animation/Card_Flip";
import styled from "styled-components";
import * as S from "../Styled";
import { angels, evils } from "../Store";
const Box = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  flex-direction: row;
  margin: 200px 30px 30px 100px;
`;
function END_GAME_FRAME() {
  const { gameState, gameNickname } = useContext(GameContext);
  const gameResult = () => {};

  //해당 부분 추가 승패 결과 firebase에 추가할 수 있도록 하기
  return (
    <S.ColumnFrame>
      <S.NicknameTag>{gameState.winner}</S.NicknameTag>
      <Box>
        {gameState.usingPlayers.map((player, index) => (
          <div key={index}>
            <br />
            <div>
              <CardFlip
                nickname={gameNickname(player.nickname)}
                role={player.role}
              />
            </div>
          </div>
        ))}
      </Box>
    </S.ColumnFrame>
  );
}

export default END_GAME_FRAME;
