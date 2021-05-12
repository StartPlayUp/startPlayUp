import React from "react";
import styled from "styled-components";

const Frame = styled.div`
    margin : 20vh auto;
    background-color : #FFFFF3;
    flex-direction : column;
    justify-content : center;
    align-items : center;
    flex-basis : 400px;
    height : 50vh;
    width : 30vw;
`

function LoginWrapper({children}) {
    return (
        <Frame>
            {children}
        </Frame>
    )
}

export default LoginWrapper;