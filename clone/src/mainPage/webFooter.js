import React from "react";
import styled from "styled-components";

const FooterArea = styled.div`
    display: flex;
    
    flex-direction: column;
    flex: 1 1 auto;
    height: 10%;
    background-color: #566270;
`
const FooterCenter = styled.div`
    width: 75%;
    margin: 0 auto;
    flex: 1 1 auto;
`

const FOOTER = ({children}, ...rest) =>{
    return(
        <div>
            <FooterArea>
                FooterArea
                <FooterCenter>
                    footerCenter
                </FooterCenter>
            </FooterArea>
        </div>
    )
}

export default FOOTER;