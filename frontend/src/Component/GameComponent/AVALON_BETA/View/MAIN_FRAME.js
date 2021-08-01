import React, {useContext} from "react";
import {GameContext, MAIN_VOTE, voteStageColor} from "../Store";
import * as S from "../Styled";
import MerlinPlayer from "../Ability/MerlinPlayer";
import PercivalPlayer from "../Ability/PercivalPlayer";
import {SET_COMPONENT} from "../MVC/AVALON_Reducer";

function MAIN_FRAME() {
    const {gameState, dispatch} = useContext(GameContext);
    const colors = voteStageColor.slice(gameState.voteStage, 5);
    return (
        <S.PublicFrame>
            <S.GameFrame>
                <S.StageFrame>
                    {gameState.takeStage.map((stage, index) => (
                        <S.Stage key={index}>
                            <b>{stage}</b>
                        </S.Stage>
                    ))}
                </S.StageFrame>
                <S.MainVoteFrame>
                    {colors.map((color, index) => (
                        <S.Circle color={color} key={index}>
                            {index + 1}
                        </S.Circle>
                    ))}
                </S.MainVoteFrame>
            </S.GameFrame>
            <S.PlayerFrame>
                <S.Players>
                    {gameState.usingPlayers.map((user, index) => (
                        <S.User key={index}>
                            <ul>
                                <li>{`nickname : ${user.nickname}`}</li>
                                <li>{`role : ${user.role}`}</li>
                                <br/>
                                {user.role === "Merlin" && <MerlinPlayer index={index}/>}
                                {user.role === "Percival" && <PercivalPlayer index={index}/>}
                            </ul>
                            {index === gameState.represent &&
                            <button onClick={() =>
                                dispatch({type: SET_COMPONENT, component: MAIN_VOTE})}>
                                원정 인원 정하기
                            </button>}
                        </S.User>
                    ))}
                </S.Players>
                <S.Info>
                    <S.Button>플레이어 정보</S.Button>
                </S.Info>

            </S.PlayerFrame>
        </S.PublicFrame>
    );
}

export default MAIN_FRAME;
