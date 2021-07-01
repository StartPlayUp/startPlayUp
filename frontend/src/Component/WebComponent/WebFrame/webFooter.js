import React from "react";
import styled from "styled-components";

const FooterArea = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    background-color: #566270;
`
const FooterCenter = styled.div`
    width: 75%;
    margin: 0 auto;
    flex: 1 1 auto;
    justify-content : flex-end;
`

const FOOTER = () =>{
    return(
        <div>
            <FooterArea>
                <h3>FooterArea</h3>
                <FooterCenter>
                    <h3>footerCenter</h3>
                </FooterCenter>
                <h3>FooterArea</h3>
            </FooterArea>
        </div>
    )
}

export default FOOTER;