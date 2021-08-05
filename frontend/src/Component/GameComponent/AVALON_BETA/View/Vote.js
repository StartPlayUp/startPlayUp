import React, {useContext, useState} from "react";
import {GameContext} from "../Store";
import {VOTE_ONCLICK} from "../MVC/AVALON_Reducer";
import * as S from '../Styled'

function Vote(props) {
    const {dispatch, gameState} = useContext(GameContext);
    const gameData = {...gameState};
    const [vote, setVote] = useState("agree");
    const [click, setClick] = useState(false);
    const onChange = (e) => {
        setVote(e.target.value);
    };
    const onClick = (e) => {
        if (e.target.value === "agree") {
            setVote("agree");
        } else if (e.target.value === "oppose") {
            setVote("oppose");
        }
        gameData.usingPlayers[props.index].toGo = vote;
        dispatch({type: VOTE_ONCLICK, gameData});
        setClick(true);
    };
    return (
        <S.PlayerVote>
            {click ?
                <h3>{vote === "agree" ? "찬성" : "반대"}</h3>
                :
                <>
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
                    <S.MainVoteButton onClick={onClick} disabled={click} value={vote}>
                        확인
                    </S.MainVoteButton>
                </>
            }
        </S.PlayerVote>
    );
}

export default Vote;
