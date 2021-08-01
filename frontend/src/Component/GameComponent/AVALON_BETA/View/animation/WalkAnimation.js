import React from "react";
import styled, {keyframes} from "styled-components";

const walking = keyframes`
   to{
        background-position: 100% 0;
   }
`
const stroll = keyframes`
     from{
        transform: translateX(-200%);
    }
    to{
        transform: translateX(300%);
    }
`;
const WalkContainer = styled.div`
    display: flex;
    position: relative;
    width: 20%;
    padding-bottom: 30%;
    vertical-align: middle;
    overflow: hidden;
    animation: ${stroll} 10s linear infinite;
`
const Walk = styled.div`
    display: flex;
    position: relative;
    top: 0;
    left: 0;
    width: 30%;
    height: 30%;
    background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/walk-sequence.svg);
    background-repeat: no-repeat;
    background-size: 10%;
    animation:${walking} 1s infinite steps(7);
`
function WalkAnimation() {
    return (
        <WalkContainer>
            <Walk/>
        </WalkContainer>
    )
}

export default WalkAnimation