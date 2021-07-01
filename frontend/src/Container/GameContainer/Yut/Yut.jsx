import React from 'react';
import styled from 'styled-components';
import Yutfield from 'JSC/Component/GameComponent/Yut/Yutfield'
import YutPlayersSection from 'JSC/Component/GameComponent/Yut/YutPlayersSection';
import YutStore from './YutStore';
import YutAnimation from 'JSC/Component/GameComponent/Yut/YutAnimation'

const Yut = (props) => {
    const StyleDiv = styled.div`
        display:flex;
        height:30px;
        flex-direction: column;
        margin:10px;
    `;
    const Test = styled.div`
        display:flex;
        flex-direction: row;
    `;
    return (
        <YutStore>
            <StyleDiv>
                <Test>
                    <Yutfield />
                    <YutAnimation />
                </Test>
                <YutPlayersSection />
            </StyleDiv>
        </YutStore>
    )
}

export default Yut;
