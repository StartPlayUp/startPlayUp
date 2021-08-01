import React, {useContext} from "react";
import {GameContext, VOTE_RESULT} from "../Store";
import {Title} from "../Styled";
import Vote from "./Vote";
import {SET_COMPONENT} from "../MVC/AVALON_Reducer";
import * as S from '../Styled'

function VOTE_FRAME() {
    const {gameState, dispatch} = useContext(GameContext);
    const selectedPlayers = () => {
        let temp = []
        gameState.usingPlayers.map((user) => {
            user.selected && temp.push(user.nickname)
        })
        return temp
    }
    return (
        <S.VoteFrame>
            <S.MAIN_VOTE_HEADER>{`대표자 : ${selectedPlayers()}`}</S.MAIN_VOTE_HEADER>
            <S.VoteImage>
                <img src={'/img/vote_img.png'} alt={'img'} width={'10%'}/>
                <h1>동의 합니까?</h1>
            </S.VoteImage>
            <Title>
                {gameState.usingPlayers.map((user, index) => (
                    <Vote key={index} index={index}/>
                ))}
            </Title>
            <S.MainVoteButton
                onClick={() =>
                    dispatch({type: SET_COMPONENT, component: VOTE_RESULT})
                }>
                투표 결과
            </S.MainVoteButton>
        </S.VoteFrame>
    );
}

export default VOTE_FRAME;
