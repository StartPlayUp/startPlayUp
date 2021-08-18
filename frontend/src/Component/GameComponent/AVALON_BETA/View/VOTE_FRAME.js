import React, { useContext, useState } from "react";
import { GameContext } from "../Store";
import * as S from "../Styled";
import { PeersContext } from "../../../../Routes/peerStore";
import { GAME_CHECK } from "../MVC/AVALON_Reducer";
import WaitingView from "../animation/WaitingView";
import AVALON_TIMER from "./Timer";

function VOTE_FRAME() {
  const { dispatch, gameState, selectedPlayers } = useContext(GameContext);
  const { peers } = useContext(PeersContext);
  const nickname = localStorage.getItem("nickname");
  const gameData = { ...gameState };
  const [vote, setVote] = useState("agree");
  const [click, setClick] = useState(false);
  console.log("vote");
  const onChange = (e) => {
    setVote(e.target.value);
  };
  const onClick = () => {
    setClick(true);
    gameData.usingPlayers[gameData.voteTurn].toGo = vote;
    gameData.voteTurn += 1;
    dispatch({ type: GAME_CHECK, gameData, peers });
  };
  return (
    <S.PublicColumn>
      {gameData.voteTurn !== gameData.usingPlayers.length &&
      gameData.usingPlayers[gameData.voteTurn].nickname === nickname ? (
        <S.ColumnFrame>
          <AVALON_TIMER minutes={0} seconds={15} callDispatch={onClick} />
          <S.MAIN_VOTE_HEADER>{`대표자 : ${selectedPlayers()}`}</S.MAIN_VOTE_HEADER>
          <S.VoteImage>
            <img src={"/img/vote_img.png"} alt={"img"} width={"300px"} />
          </S.VoteImage>
          {click ? (
            <h3>{vote === "agree" ? "찬성" : "반대"}</h3>
          ) : (
            <S.ColumnFrame>
              <S.PlayerVoteFrame>
                <label>
                  찬성
                  <S.MainVoteCheckbox
                    type={"radio"}
                    name={"vote"}
                    value={"agree"}
                    onChange={onChange}
                  />
                </label>
                <label>
                  반대
                  <S.MainVoteCheckbox
                    type={"radio"}
                    name={"vote"}
                    value={"oppose"}
                    onChange={onChange}
                  />
                </label>
              </S.PlayerVoteFrame>
              <S.MainVoteButton onClick={onClick} disabled={click} value={vote}>
                확인
              </S.MainVoteButton>
            </S.ColumnFrame>
          )}
        </S.ColumnFrame>
      ) : (
        <WaitingView />
      )}
    </S.PublicColumn>
  );
}

export default VOTE_FRAME;
