import React from "react";
import {createGlobalStyle} from "styled-components";
import WalkAnimation from "./WalkAnimation";
const GlobalStyle = createGlobalStyle`

html, body {
	background: #FFFFFF;
}

.column {
  position: relative;
	display: flex;
	flex-direction: column;
  margin : 10% auto;
  align-items: center;

  & p {
	  color: gray;
    font-size: 19px;
  }
}

.row {
	display: flex;
}

.animate {
	height: 15px;
	width: 15px;
	border-radius: 50%;
}

.box1 {
	background: gray;
	animation: loader9 1.0s ease-in-out infinite alternate;
}
.box2 {
	background: gray;
	animation: loader9 1.8s ease-in-out infinite alternate;
}
.box3 {
	background: gray;
	animation: loader9 1.1s ease-in-out infinite alternate;
}
.box4 {
	background: gray;
	animation: loader9 1.4s ease-in-out infinite alternate;
}

@keyframes loader9 {
   0% {transform: scale(0, 0);opacity:0;}
   100% {transform: scale(1, 1);opacity:1;}
}
@-webkit-keyframes loader9 {
   0% {-webkit-transform: scale(0, 0);opacity:0;}
   100% {-webkit-transform: scale(1, 1);opacity:1;}
}
`;

const WaitingView = () => {
    return (
        <div className="column">
            <WalkAnimation/>
            <GlobalStyle/>
            <div className="row">
                <div className="animate box1"/>
                <div className="animate box2"/>
            </div>
            <div className="row">
                <div className="animate box3"/>
                <div className="animate box4"/>
            </div>
            <p>투표 대기 중.....</p>
        </div>
    );
};
export default WaitingView