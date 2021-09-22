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
const axios = require('axios');


const StyledMainLogo = styled.div`
    color:black;
`;
const StyledMenuAttribute = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    margin : 0px 10px 0px 10px;
    border-radius: 25px;
`;

const HEADER = () => {
    const history = useHistory();
    const { checkAuth, logout } = useContext(AuthStore)
    const [redirect, setRedirect] = useState(false);
    const logoutHandler = () => {
        axios.get(`http://localhost:4000/api/auth/logout`, { withCredentials: true })
            .then(function (response) {
                logout(history)
                // setRedirect(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div>
            <HeadColor>
                <HeadStyle>
                    <HeadLeft fontSize={"32px"}>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <StyledMainLogo>StartPlayUp</StyledMainLogo>
                        </Link>
                    </HeadLeft>
                    <HeadRight>
                        {checkAuth && <StyledMenuAttribute onClick={logoutHandler} >로그아웃</StyledMenuAttribute>}
                        <img src={menu} alt="menu" />
                    </HeadRight>
                </HeadStyle>
            </HeadColor>
            {redirect ? (<Redirect push to="/" />) : null}
        </div>
    )
}
export default HEADER;