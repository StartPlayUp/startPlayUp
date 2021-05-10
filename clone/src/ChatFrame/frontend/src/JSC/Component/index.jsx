import React, { memo, useContext, useEffect, useRef, useState } from 'react';
import RockPaperScissors from "./GameComponent/RockPaperScissors"
import styled from 'styled-components'
import { PeerContext } from '../store';

const App = () => {
    return (
        <>
            <RockPaperScissors />
        </>
    )
}

export default memo(App);
