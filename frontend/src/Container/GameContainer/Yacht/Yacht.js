import React, { useState, useContext, Fragment, useEffect } from 'react';
import styled from 'styled-components';
import YachtMain from '../../../Component/GameComponent/Yachu/yachtMain'
const Yacht=(props)=>{

    const YachtMan=styled.div`
        display: flex;
        background-color: #e7e1cd;
        justify-content: center;
        align-items: center;
        width:70%;

    `
    const Header=styled.div`
        position: fixed;
        top:0;
        width:50%;
        height: 2%;
        padding: 0.8rem;
        background-color:black;
        font-weight: bold;
        display: flex;

    `
    return(
        <YachtMan>
                <Header />
                <YachtMain />
        </YachtMan>
    );
}
export default Yacht;