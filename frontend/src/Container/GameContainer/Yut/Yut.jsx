import React, { useReducer } from 'react';
import styled from 'styled-components';
import Yutfield from 'Component/GameComponent/Yut/YutfieldSection'

import YutPlayersSection from 'Component/GameComponent/Yut/YutPlayersSection';
import YutButtonSection from 'Component/GameComponent/Yut/YutButtonSection';

import YutStore from './YutStore';
import YutAnimation from 'Component/GameComponent/Yut/YutAnimationSection';
import WinnerModal from './WinnerModal';
import Timer from './Timer';
import YutTextView from './YutTextViewModal';


const FieldAnimationSection = styled.div`
    display:flex;
    flex-direction: row;
    width: 1150px;
    height:550px;
    justify-content: center;
    align-items: center;`;

const PlayerButtonSection = styled.div`
    display:flex;
    flex-direction: row;
    width: inherit;
    height:240px;
    justify-content: center;
    align-items: center;
    margin:0px;
`;


const StyleDiv = styled.div`

    /* Auto Layout */
    display: flex;
    flex-direction: column;
    padding: 30px;

    justify-content: center;
    align-items: center;
    background: #FFFFF3;
    border-radius: 30px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;


const Yut = (props) => {
    return (
        <YutTextView>
            <YutStore >
                <Timer />
                <WinnerModal />
                <StyleDiv>
                    <FieldAnimationSection>
                        <Yutfield />
                        <YutAnimation />
                    </FieldAnimationSection>
                    <PlayerButtonSection>
                        <YutPlayersSection />
                        <YutButtonSection />
                    </PlayerButtonSection>
                </StyleDiv>
            </YutStore>
        </YutTextView >
    )
}

export default Yut;
