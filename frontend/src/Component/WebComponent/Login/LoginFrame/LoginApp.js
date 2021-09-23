import React, { useEffect, useState, useContext } from "react";
import LoginWrapper from "./LoginWrapper";
import styled, { createGlobalStyle } from "styled-components";
import LogoWrapper from "./Logo";
import LoginForm from "./LoginForm";
import { buttonGlobalHover } from "../../../../Routes";
//import {AuthProvider} from './Auth/AuthContext';
import { useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie'
import { AuthStore } from "./Auth/AuthContext";



const Frame = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;


function LoginApp() {
  let history = useHistory();
  const { alreadyLogged } = useContext(AuthStore);
  const [cookie, setCookie, removeCookie] = useCookies(['nickname']);
  useEffect(() => {
    console.log(cookie['nickname']);
    if (cookie['nickname'] !== undefined) {
      alreadyLogged(history);
      localStorage.setItem('nickname', cookie['nickname'])
    }
  }, []);
  return (
    <Frame>
      {/* <AuthProvider> */}
      <LoginWrapper>
        <LoginForm />
      </LoginWrapper>
      {/* </AuthProvider> */}
    </Frame>
  );
}

export default LoginApp;
