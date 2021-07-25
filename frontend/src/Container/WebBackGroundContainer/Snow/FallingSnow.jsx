import styled from 'styled-components';
import React from "react";

const StyledSnowFlake = styled.p`
    display: inline-block;
	width: 0.1%;
	color: black;
	opacity: 0;
	font-size: 120px;
	margin: 0;
	padding: 0;
	animation: fall 16s linear infinite;

    @keyframes fall {
        0% {
            opacity: 0;
        }
        3% {
            opacity: 0.9;
        }

        90% {
            opacity: 0.9;
        }
        100% {
            transform: translate(0, 97vh);
            opacity: 0;
        }
    }
`;

const StyleSnowDiv = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0;
    padding: 0;
    overflow: hidden;
    height: 100vh;
`;

const Snowflake = (props) => {
    return (
        <StyledSnowFlake id={`item${props.id}`} style={props.style}> * </StyledSnowFlake>
    )
}



const Snow = () => {
    let animationDelay = '0s';
    let fontSize = '100px';
    console.log("snow")
    let arr = Array.from('Snowflakes are awesome!!! They are like little pieces of magic!!! Love snowflakes!!! Snowflakes are awesome!!! They are like little pieces of magic!!! Love snowflakes!!! Snowflakes are awesome!!! They are like little pieces of magic!!! Love snowflakes!!!')
    return arr.map((el, i) => {
        animationDelay = `${(Math.random() * 16).toFixed(2)}s`;
        fontSize = `${(Math.floor(Math.random() * 10) + 10)}px`;
        let style = {
            animationDelay,
            fontSize
        }
        return (
            // <StyleSnowDiv>
            //     <Snowflake key={el + i} id={i} style={style} />
            // </StyleSnowDiv>
            <></>
        )
    })
}
export default Snow;