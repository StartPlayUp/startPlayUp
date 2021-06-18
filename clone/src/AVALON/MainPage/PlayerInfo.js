import MerlinPlayer from "../Ability/MerlinPlayer";
import React, {useContext} from "react";
import styled from "styled-components";
import {withRouter} from "react-router-dom";
import PercivalPlayer from "../Ability/PercivalPlayer";
import {UserState,PlayState} from "../gameSetting";

const Frame = styled.div`
    display : flex;
    flex-direction : row;
    flex-wrap : wrap;
`

const User = styled.div`
    display : flex;
    flex-direction : column;
    flex-wrap : wrap;
    margin : 0 auto;
    border 3px solid black;
    padding : 5px;
`

const PlayerInfo = ({history}) => {
    const userState = useContext(UserState)
    const gameState = useContext(PlayState)
    const onClick = () => {
        history.push({
            pathname: '/result'
        })
    }
    return (
        <Frame>
            {
                userState.map((user, index) => (
                    <User key={index}>
                        <ul>
                            <li>{`nickname : ${user.nickname}`}</li>
                            <li>{`role : ${user.role}`}</li>
                            <br/>
                            {user.role === 'Merlin' ?
                                <MerlinPlayer index={index}/> : null
                            }
                            {user.role === 'Percival' ?
                                <PercivalPlayer index={index}/> : null
                            }
                        </ul>
                        {index === gameState.represent ? <button onClick={onClick}>원정 인원 정하기</button> : null}
                    </User>
                ))
            }
        </Frame>
    )
}
export default withRouter(PlayerInfo);