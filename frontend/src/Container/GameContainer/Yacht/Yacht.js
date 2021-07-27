import React, { useState, useContext, Fragment, useEffect } from 'react';
import styled from 'styled-components';
import Dice from 'Component/GameComponent/Yachu/dice';
import Player from 'Component/GameComponent/Yachu/Player';
import Timer from 'Component/GameComponent/Yachu/timer';
import {YachuProvider} from './YatchStore';
const Yacht=(props)=>{

    const YachtMan=styled.div`
        display: flex;
        background-color: #e7e1cd;
        justify-content: center;
        align-items: center;
        width:70%;

    `
    return(
        <YachuProvider>
            <YachtMan>
                <Player />
                <div>
                    <Timer />
                    <Dice />
                </div>
            </YachtMan>
        </YachuProvider>
    );
}
export default Yacht;