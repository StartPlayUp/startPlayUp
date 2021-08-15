import React, { useContext } from "react";
import { GameContext, FRAME_MAIN, EXPEDITION_CLICK } from "../Store";
import { SET_COMPONENT } from "../MVC/AVALON_Reducer";
import { PeersContext } from "../../../../Routes/peerStore";
import * as S from "../Styled";
import Timer_test from "./Timer";
function EXPEDITION_RESULT() {
  const { gameState, dispatch } = useContext(GameContext);
  const { peers } = useContext(PeersContext);
  const expeditionResult = gameState.vote.sort();
  const expeditionSuccessCount = expeditionResult.filter(
    (e) => "o" === e
  ).length;
  const expeditionFailCount = expeditionResult.filter((e) => "x" === e).length;
  const expeditionVoteResult = () => {
    let result = "";
    if (gameState.expeditionStage === 3 && gameState.usingPlayers.length >= 7) {
      expeditionFailCount >= 2
        ? (result = "원정 실패 😩")
        : (result = "원정 성공 😃");
    } else {
      expeditionFailCount === 0
        ? (result = "원정 성공 😃")
        : (result = "원정 실패 😩");
    }
    return result;
  };
  return (
    <S.ColumnFrame>
      <Timer_test
        callDispatch={() =>
          dispatch({ type: SET_COMPONENT, component: FRAME_MAIN })
        }
        minutes={0}
        seconds={5}
      />
      <S.MAIN_VOTE_HEADER>{`${expeditionVoteResult()}`}</S.MAIN_VOTE_HEADER>
      <S.RowFrame>
        <h3>{`성공 : ${expeditionSuccessCount} 실패 : ${expeditionFailCount}`}</h3>
      </S.RowFrame>
      <S.RowFrame>
        {expeditionResult.map((expeditionStage) =>
          expeditionStage === "o" ? <S.SuccessImage /> : <S.FailImage />
        )}
      </S.RowFrame>
      <S.RowFrame>
        <button
          onClick={() =>
            dispatch({ type: SET_COMPONENT, component: FRAME_MAIN })
          }
        >
          다음
        </button>
      </S.RowFrame>
    </S.ColumnFrame>
  );
}

export default EXPEDITION_RESULT;
