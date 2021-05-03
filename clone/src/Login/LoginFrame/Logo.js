import React from "react";
import styled from "styled-components";

const LogoWrapper = styled.div`
    margin:0 auto;
    font-family: Roboto;
    font-size: 3em;
    line-height: 2em;
    text-align: center;
    color: #000000;
`
function Logo({ children }){
    return (
        <LogoWrapper>
            {children}
        </LogoWrapper>
    )
}

export default Logo;