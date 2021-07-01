import React from "react";
import styled from "styled-components";

const LogoWrapper = styled.div`
    display : flex;
    margin: 0 auto;
    font-family: Roboto;
    font-size: 32px;
    line-height: 3em;
    text-align: center;
    font-weight : lighter;
    letter-spacing : 10px;
    text-decoration : none;
    margin-bottom : 50px;
`
function Logo({ children }){
    return (
        <LogoWrapper>
            {children}
        </LogoWrapper>
    )
}

export default Logo;