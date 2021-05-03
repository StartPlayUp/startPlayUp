import React from "react";
import styled from "styled-components";

/*
const Background = styled.div`
    display:flex;
    flex-direction: column;
    width:100%;
    heigt:100%;
    justify-content: center;
    
`*/
const Box = styled.div`
    display:flex;
    top: 50%;
    left: 50%;
    width: 40%;
    height: 60%;
    margin: 0 auto;
    margin: auto 0;
    background: #FFFFF3;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    flex-direction : column;
    justify-content: center;
    aligh-items:center;
`

function LoginWrapper({children}){
    return(
        
            <Box>
                {children}
            </Box>
    )
}
export default LoginWrapper;