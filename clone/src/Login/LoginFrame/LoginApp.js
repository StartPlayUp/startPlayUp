import React, {Fragment} from 'react';
import LoginWrapper from './LoginWrapper';
import styled, {createGlobalStyle} from 'styled-components';
import LogoWrapper from './Logo';
import LoginForm from './LoginForm';
import {AuthProvider} from './Auth/AuthContext'
import {Route} from 'react-router-dom';
import Main from "./LoginForm"
import {Home} from "../../WebPage";

const GlobalStyle = createGlobalStyle`
    #root,html,body{
        background: #E0E3DA;
        width:100%;
        height:100%;
        display: flex;
        justify-content: center;
    }
`
const Container = styled.div`
        width:100%;
        height:100%;
        display: flex;
        justify-content: center;
`

function LoginApp() {
    return (
        <Fragment>
            <GlobalStyle/>
            <Container>
                <AuthProvider>
                    <LoginWrapper>
                        <LogoWrapper>StartPlayUp</LogoWrapper>
                        <LoginForm/>
                    </LoginWrapper>
                </AuthProvider>
            </Container>
        </Fragment>
    )
}

export default LoginApp;