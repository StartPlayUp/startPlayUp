import React from 'react';
import LoginWrapper from './LoginWrapper';
import styled, {createGlobalStyle} from 'styled-components';
import LogoWrapper from './Logo';
import LoginForm from './LoginForm';
//import {AuthProvider} from './Auth/AuthContext';

const Frame = styled.div`
    display : flex;
    justify-content: center;
    align-items: center;   
`

function LoginApp() {
    return (
        <Frame>
            {/* <AuthProvider> */}
                <LoginWrapper>
                    <LoginForm/>
                </LoginWrapper>
            {/* </AuthProvider> */}
        </Frame>
    )
}

export default LoginApp;