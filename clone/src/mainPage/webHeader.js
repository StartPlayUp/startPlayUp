import React from "react";
import styled from "styled-components";


const HeadStyle = styled.div`
    width: 75%;
    height: 100%;
    margin : 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const HeadColor = styled.div`
    background : #566270;
`;

const HeadLeft = styled.div`
    display: flex;
    justify-content: flex-start;
    color : white;
    font-weight: lighter;
    font-size : ${(props) => props.fontSize};
`;

const HeadRight = styled.div`
    display: flex;
    justify-content: flex-end;
    font-size : ${(props) => props.fontSize};
`

const HEADER = ({children, ...rest}) => {
    return (
        <div>
            <HeadColor>
                <HeadStyle>
                    <HeadLeft fontSize={"32px"}>
                        StartPlayUp
                    </HeadLeft>
                    <HeadRight fontSize = {"14px"}>
                        icons
                    </HeadRight>
                </HeadStyle>
            </HeadColor>
        </div>
    )
}

export default HEADER;