import React from 'react';
import LoginWrapper from './LoginWrapper';
import styled, {createGlobalStyle} from 'styled-components';
import LogoWrapper from './Logo';
import LoginForm from './LoginForm';
import {AuthProvider} from './Auth/AuthContext';

const GlobalStyle = createGlobalStyle`
    #root,html,body{
        background: #E0E3DA;
        width:100%;
        height:100%;
        margin : 0;
        padding : 0;
    }
`

const Frame = styled.div`
    display : flex;
    justify-content: center;
    align-items: center;   
`


function LoginApp() {
    return (
        <Frame>
            <GlobalStyle/>
            <AuthProvider>
                <LoginWrapper>
                    <LogoWrapper>BOTAKU</LogoWrapper>
                    <LoginForm/>
                </LoginWrapper>
            </AuthProvider>
        </Frame>
    )
}

export default LoginApp;