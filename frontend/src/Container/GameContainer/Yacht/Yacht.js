import React, { useState, useContext, Fragment, useEffect } from 'react';
import styled from 'styled-components';
import Dice from 'Component/GameComponent/Yachu/dice';
import Player from 'Component/GameComponent/Yachu/Player';
import Timer from 'Component/GameComponent/Yachu/timer';
import NicknameDisplay from 'Component/GameComponent/Yachu/playerNickname';
import {YachuProvider} from './YatchStore';
const Yacht=(props)=>{

    const YachtMan=styled.div`
        display: flex;
        background-color: #e7e1cd;
        align-items: center;
        justify-content: right;
        width:1280px;
        height:720px;

    `
    const ParentDiv = styled.div`
        display: flex;
        align-items:center;
        position:relative;
        width:980px;
        height:100%;
        justify-content: right;
    `

    return(
        <YachuProvider>
            <YachtMan>
                <Player />
                <ParentDiv>
                    <Timer />
                    <NicknameDisplay />
                    <Dice />
                </ParentDiv>
            </YachtMan>
        </YachuProvider>
    );
}
export default Yacht;