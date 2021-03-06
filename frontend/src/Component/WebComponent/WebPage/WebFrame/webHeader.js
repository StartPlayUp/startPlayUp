import React, { useState, useContext } from "react";
import {
    HeadColor,
    HeadStyle,
    HeadRight,
    HeadLeft
} from "../Style/WebFrameStyle";
import menu from 'images/white-menu.png';
import { Link, useHistory, Redirect } from "react-router-dom";
import styled from "styled-components";
import { AuthStore } from "Component/WebComponent/Login/LoginFrame/Auth/AuthContext";
import Modal from 'react-modal'
import NavigationBar from "./index";
import SlideBar from "./layout/SlideBar";
import { useCookies } from "react-cookie";
import { getEnvIp } from "Common/envModule"

const axios = require('axios');


const StyledMainLogo = styled.div`
  color: white;
`;
const StyledMenuAttribute = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 10px 0px 10px;
  border-radius: 25px;
`;

const HEADER = () => {
    axios.defaults.withCredentials = true;
    const history = useHistory();
    const { checkAuth, logout } = useContext(AuthStore)
    const [redirect, setRedirect] = useState(false);
    const [open, setOpen] = useState(false)
    const nickname = localStorage.getItem('nickname')
    console.log(nickname)
    const logoutHandler = () => {
        axios.get(getEnvIp().SERVER_IP + `/api/auth/logout`, { withCredentials: true })
            .then(function (response) {
                logout(history)
                // setRedirect(true);
            })
            .catch(function (error) {
                console.log(error);
            });
        setOpen(false)
        alert('로그 아웃되었습니다.')
    }
    const onClick = () => {
        nickname === null ? setOpen(false) : setOpen(true)
    }
    return (
        <>
            <HeadColor>
                <HeadStyle>
                    <HeadLeft fontSize={"32px"}>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <StyledMainLogo>StartPlayUp</StyledMainLogo>
                        </Link>
                    </HeadLeft>
                    <HeadRight>
                        <img
                            src={menu}
                            alt="menu"
                            onClick={onClick}
                        />
                        {open && <NavigationBar
                            open={open}
                            setOpen={setOpen}
                            logout={logoutHandler}
                        />}
                    </HeadRight>
                </HeadStyle>
            </HeadColor>
        </>
    )
}
export default HEADER;