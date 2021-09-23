import React, {useState} from "react";
import {HeadColor, HeadLeft, HeadRight, HeadStyle} from "../Style/WebFrameStyle";

const HEADER = ({isClick}) => {

    return (
        <div>
            <HeadColor>
                <HeadStyle>
                    <HeadLeft fontSize={"32px"}>
                        StartPlayUp
                    </HeadLeft>
                    <HeadRight>
                        <img
                            src="../../images/white-menu.png"
                            alt="menu"
                            onClick={isClick}
                        />
                    </HeadRight>
                </HeadStyle>
            </HeadColor>
        </div>
    )
}

export default HEADER;