import React, { useContext, useState } from "react";
import { GameContext } from "../Store";
import * as S from "../Styled";
import { PeersContext } from "../../../../Routes/peerStore";
import { GAME_CHECK } from "../MVC/AVALON_Reducer";

function VOTE_FRAME() {
  const { dispatch, gameState } = useContext(GameContext);
  const { peers } = useContext(PeersContext);
  const nickname = localStorage.getItem("nickname");
  const gameData = { ...gameState };
  const [vote, setVote] = useState("agree");
  const [click, setClick] = useState(false);
  console.log("vote");
  const onChange = (e) => {
    setVote(e.target.value);
  };
  const selectedPlayers = () => {
    let temp = [];
    gameState.usingPlayers.map((user) => {
      user.selected && temp.push(user.nickname);
    });
    return temp;
  };
  const onClick = (e) => {
    if (e.target.value === "agree") {
      setVote("agree");
    } else if (e.target.value === "oppose") {
      setVote("oppose");
    }
    setClick(true);
    gameData.usingPlayers[gameData.voteTurn].toGo = vote;
    gameData.voteTurn += 1;
    dispatch({ type: GAME_CHECK, gameData, peers });
  };
  return (
    <>
      <S.VoteFrame>
        <S.MAIN_VOTE_HEADER>{`대표자 : ${selectedPlayers()}`}</S.MAIN_VOTE_HEADER>
        <S.VoteImage>
          <img src={"/img/vote_img.png"} alt={"img"} width={"10%"} />
          <h1>동의 합니까?</h1>
        </S.VoteImage>
        <S.Title>
          {gameData.voteTurn !== gameData.usingPlayers.length && (
            <S.PlayerVote>
              {click ? (
                <h3>{vote === "agree" ? "찬성" : "반대"}</h3>
              ) : (
                <React.Fragment>
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
                        type="radio"
                        name={"vote"}
                        value={"oppose"}
                        onChange={onChange}
                      />
                    </label>
                  </S.PlayerVoteFrame>
                  <S.MainVoteButton
                    onClick={onClick}
                    disabled={click}
                    value={vote}
                  >
                    확인
                  </S.MainVoteButton>
                </React.Fragment>
              )}
            </S.PlayerVote>
          )}
        </S.Title>
      </S.VoteFrame>
    </>
  );
}

export default VOTE_FRAME;
