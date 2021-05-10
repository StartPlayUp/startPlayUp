import React from "react";
import styled from "styled-components";

export const Image = styled.img`
    width : 24px;
    height : 24px;
`;

export const Player = styled.div`
    display : flex;
    align-items : center;
`;

export const StateButton = styled.button`
    background-color: ${props => props.color};
    color : white;
    padding : 5px 15px 5px 15px;
    margin-right : 5px;
`;

export const PlayerText = styled.span`
    font-size : 14px;
`;

function Players(props) {

    return (
        <div>
            <span>{props.name}</span>
            <span>{props.rate}</span>
            <span>{props.log}</span>
        </div>
    );
}

export default Players;