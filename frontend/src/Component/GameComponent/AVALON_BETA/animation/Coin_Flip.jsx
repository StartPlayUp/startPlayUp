import React, { useState } from "react";
import * as S from '../Styled'
import styled, { keyframes, createGlobalStyle } from "styled-components";

const CoinFlipStyle = createGlobalStyle`
  .App {
  font-family: sans-serif;
  text-align: center;
}
#coin {
  position: relative;
  margin: 0 auto;
  width: 130px;
  height: 130px;
}
#coin div {
  width: 100%;
  height: 100%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  -webkit-box-shadow: inset 0 0 45px rgba(255, 255, 255, 0.3),
    0 12px 20px -10px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: inset 0 0 45px rgba(255, 255, 255, 0.3),
    0 12px 20px -10px rgba(0, 0, 0, 0.4);
  box-shadow: inset 0 0 45px rgba(255, 255, 255, 0.3),
    0 12px 20px -10px rgba(0, 0, 0, 0.4);
}
.side-a {
  background-color: #bb0000;
  color: white;
  text-align: center;
}
.side-b {
  background-color: #3e3e3e;
  color: white;
  text-align: center;
}

#coin {
  transition: -webkit-transform 1s ease-in;
  -webkit-transform-style: preserve-3d;
}
#coin div {
  position: absolute;
  -webkit-backface-visibility: hidden;
}
.side-a {
  z-index: 100;
}
.side-b {
  -webkit-transform: rotateY(-180deg);
}

#coin.angels {
  -webkit-animation: flipHeads 2s ease-out forwards;
  -moz-animation: flipHeads 2s ease-out forwards;
  -o-animation: flipHeads 2s ease-out forwards;
  animation: flipHeads 2s ease-out forwards;
}
#coin.evils {
  -webkit-animation: flipTails 2s ease-out forwards;
  -moz-animation: flipTails 2s ease-out forwards;
  -o-animation: flipTails 2s ease-out forwards;
  animation: flipTails 2s ease-out forwards;
}

@-webkit-keyframes flipHeads {
  from {
    -webkit-transform: rotateY(0);
    -moz-transform: rotateY(0);
    transform: rotateY(0);
  }
  to {
    -webkit-transform: rotateY(540deg);
    -moz-transform: rotateY(540deg);
    transform: rotateY(540deg);
  }
}
@-webkit-keyframes flipTails {
  from {
    -webkit-transform: rotateY(0);
    -moz-transform: rotateY(0);
    transform: rotateY(0);
  }
  to {
    -webkit-transform: rotateY(720deg);
    -moz-transform: rotateY(720deg);
    transform: rotateY(720deg);
  }
}
`;

function CoinFlip(props) {
  const [result, setResult] = useState(props.value);
  function coinToss() {
    console.log(`result : ${result}`);
    result !== "angels" ? setResult("angels") : setResult("evils");
  }
  coinToss = coinToss.bind(result);
  return (
    <div className="App">
      <CoinFlipStyle />
      <div id="coin" className={result} key={result}>
        <div class="side-a">
          <S.FailImageToken/>
        </div>
        <div className="side-b">
          <S.SuccessImageToken/>
        </div>
      </div>
      {/* <h1>Flip a coin</h1>
      <button id="btn" onClick={coinToss}>
        Coin Toss
      </button> */}
    </div>
  );
}

export default CoinFlip;
