import React, { Fragment, useState, useEffect, useContext } from "react";
import { PlayerNickName } from 'Container/GameContainer/Yacht/YatchStore';
import styled from 'styled-components';
const ParentDiv = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`
const NickName = styled.div`
    font-size: 2.5vw;
    position:absolute;
    left:33%;
    top:3%;
`
function NicknameDisplay() {
    return (
        <PlayerNickName.Consumer>
            {({ playerOne, playerTwo, nowTurn }) => (
                <ParentDiv>
                    {nowTurn === 0 ? <NickName>{playerOne}님의 턴!</NickName> : <NickName>{playerTwo}님의 턴!</NickName>}
                </ParentDiv>
            )}
        </PlayerNickName.Consumer>
    );
}

export default NicknameDisplay;