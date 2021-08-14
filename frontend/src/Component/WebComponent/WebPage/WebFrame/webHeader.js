import React from "react";
import {
    HeadColor,
    HeadStyle,
    HeadRight,
    HeadLeft
} from "../Style/WebFrameStyle";
import menu from 'images/white-menu.png';

const HEADER = () => {
    return (
        <div>
            <HeadColor>
                <HeadStyle>
                    <HeadLeft fontSize={"32px"}>
                        StartPlayUp
                    </HeadLeft>
                    <HeadRight>
                        <img src={menu} alt="menu" />
                    </HeadRight>
                </HeadStyle>
            </HeadColor>
        </div>
    )
}

export default HEADER;