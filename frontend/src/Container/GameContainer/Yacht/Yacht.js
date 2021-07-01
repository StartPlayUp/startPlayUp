import React, { useState, useContext, Fragment, useEffect } from 'react';
import styled from 'styled-components';
import YachtReduce from '../../../Component/GameComponent/Yachu/yachtReduce'
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
                <YachtReduce />
        </YachtMan>
    );
}
export default Yacht;