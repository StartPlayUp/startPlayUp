import React, { memo } from "react";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import thunderstorm from "../image/thunderstorm.jpg";

const GlobalStyles = createGlobalStyle`
     ${reset};
     *:focus { outline:none; }
     body{
         //font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
         //font-size: 14px;
         //background-color: rgb(178, 199, 217); // 카카오톡 배경
     }
     img{
      width:20px;
      height:20px;
     }
     html{
      //overflow:hidden;
     }
 `;


function ChatContainer() {
  console.log("debug ChatContainer rerender");
  return (
    <GlobalStyles />
  );
}

export default ChatContainer;
