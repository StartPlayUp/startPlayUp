import React from 'react';
import LoginWrapper from './LoginWrapper';
import styled, {createGlobalStyle} from 'styled-components';
import LogoWrapper from './Logo';
import LoginForm from './LoginForm';
import {AuthProvider} from './Auth/AuthContext';

const GlobalStyle = createGlobalStyle`
    #root,html,body{
        background: #E0E3DA;
        width:100vw;
        height:100vh;
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
                    <LoginForm/>
                </LoginWrapper>
            </AuthProvider>
        </Frame>
    )
}

export default LoginApp;