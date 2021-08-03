import React, { useReducer } from 'react';
import styled from 'styled-components';
import Yutfield from 'Component/GameComponent/Yut/YutfieldSection'

import YutPlayersSection from 'Component/GameComponent/Yut/YutPlayersSection';
import YutButtonSection from 'Component/GameComponent/Yut/YutButtonSection';

import YutStore from './YutStore';
import YutAnimation from 'Component/GameComponent/Yut/YutAnimationSection';
import WinnerModal from './WinnerModal';
import Timer from './Timer';

const StyleDivFlexRow = styled.div`
    display:flex;
    flex-direction: row;
    width: 1150px;
    height:750px;
`;

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


const StyledYutAnimation = styled(YutAnimation)`   
    /* flex-grow: 7; */
    justify-content: center;
    align-items: center;
`;

const StyledYutfield = styled(Yutfield)`
    /* flex-grow: 4.5; */
    justify-content: center;
    align-items: center;
`;


const StyledYutPlayersSection = styled(YutPlayersSection)`   
    /* flex-grow: 7; */
    justify-content: center;
    align-items: center;

`;

const StyledYutButtonSection = styled(YutButtonSection)`
    /* flex-grow: 4.5; */
    justify-content: center;
    align-items: center;
`;

const StyleDiv = styled.div`
    /* display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    margin: 10px;
    background: #FFFFF3;
    border-radius: 30px;
    padding: 30px; */

    /* Auto Layout */
    display: flex;
    flex-direction: column;
    padding: 30px;

    /* width: 1150px;
    height: 775px; */
    /* left: calc(50% - 1150px/2);
    top: calc(50% - 775px/2 + 35.5px); */
    justify-content: center;
    align-items: center;
    background: #FFFFF3;
    border-radius: 30px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const Yut = (props) => {
    return (
        <YutStore >
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
                <Timer />
            </StyleDiv>
        </YutStore>
    )
}

export default Yut;
