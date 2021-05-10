import React from "react";
import styled from "styled-components";

const LogoWrapper = styled.div`
    margin: 0 auto;
    font-family: Roboto;
    font-size: 40px;
    line-height: 3em;
    text-align: center;
    font-weight : lighter;
    letter-spacing : 20px;
    text-decoration : none;
`
function Logo({ children }){
    return (
        <LogoWrapper>
            {children}
        </LogoWrapper>
    )
}

export default Logo;