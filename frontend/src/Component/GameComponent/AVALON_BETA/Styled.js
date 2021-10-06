import styled, { createGlobalStyle, keyframes } from "styled-components";

export const PageFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: ${(props) => props.color};
`;
export const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* border: 5px solid black; */
`;
export const VoteImage = styled.div`
  display: flex;
  margin: 5% 0 5% 0;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const Stage = styled.div`
  display: flex;
  width: 120px;
  height: 120px;
  border-radius: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  /* padding: 50px; */
  margin: 20px;
  border: 2px solid black;
`;
export const MainVoteFrame = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30%;
`;
export const VoteFrame = styled.div`
  flex: 1 1 auto;
  flex-wrap: wrap;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;
export const PlayerFrame = styled.div`
  display: flex;
  width: 30%;
  flex-wrap: wrap;
  align-items: center;
  //margin-left: 10%;
  //justify-content: space-evenly;
  flex-direction: column;
`;
export const Players = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 auto;
  border: 3px solid black;
  padding: 5px;
`;
export const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;
export const StageFrame = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;
// display: flex;
// flex-direction: row;
// flex-wrap: wrap;
// border: 2px solid black;
// margin: 15px;
// border-radius: 70%;
// padding: 60px;

export const RoleList = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;
export const UserList = styled.div`
  display: flex;
  flex-direction: row;
`;
export const GameFrame = styled.div`
  display: flex;
  margin: 0 auto;
  width: 70%;
  flex-direction: column;
  //justify-content: space-between;
`;
export const GameState = styled.div`
  display: flex;
  width: 70%;
  flex-direction: column;
  border: 5px solid black;
`;
export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background-color: #FFFFF3;
    /* background-image: url('https://www.transparenttextures.com/patterns/45-degree-fabric-light.png'); */
  }

  div {
    color: black;
  }
`;
export const PlayerVote = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
`;
export const PlayerVoteFrame = styled.form`
  display: flex;
  font-size: 32px;
  justify-content: space-around;
  padding: 30px;
`;
export const RowFrame = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: nowrap;
`;
export const VotePlayers = styled.div`
  display: flex;
  margin: 10%;
  flex-direction: row;
  justify-content: space-between;
`;
export const AgreeVotePlayers = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  justify-content: center;
`;
export const OpposeVotePlayers = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  justify-content: center;
`;
export const Timer = styled.div`
  display: flex;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  justify-content: flex-start;
  font-size: 32px;
`;
export const PlayerVoteResult = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
`;
export const ColumnFrame = styled.div`
  /* display: flex; */
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  /* margin: 0 auto; */
  flex-direction: column;
  justify-content: center;
`;
export const Circle = styled.div`
  display: flex;
  width: auto;
  height: auto;
  border-radius: 70%;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  margin-left: 15px;
  border: 2px solid black;
  background: ${(props) => props.color};
`;
export const VoteStageFrame = styled.div`
  display: flex;
  justify-content: flex-start;
`;
export const User = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  border: 2px solid black;
`;
export const Button = styled.button`
  margin: 30% auto;
  padding: 5px 36px 5px 36px;
  font-size: 18px;
  background-color: dimgray;
  color: white;
  transition: all 0.5s;
  &:hover {
    background-color: green;
  }
`;
export const SelectPlayer = styled.div`
  flex: 1 1 auto;
  margin: 0 auto;
  flex-direction: row;
  justify-content: space-between;
`;
export const MainVote = styled.div`
  display: flex;
  margin-top: 10%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const MainVoteLabel = styled.label`
  font-size: 32px;
  margin: 0 auto;
`;
export const MainVoteCheckbox = styled.input`
  width: 32px;
  height: 32px;
  margin: 16px;
`;
export const PublicColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 85vw;
  height: 90vh;
`;
export const PublicRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 85vw;
  height: 90vh;
`;
export const MainVoteButton = styled.button`
  width: 168px;
  height: 48px;
  background: #ff0000;
  opacity: 0.7;
  backdrop-filter: blur(4px);
  font-size: 32px;
  margin-top: 5%;
  color: white;
`;
export const MAIN_FRAME_STYLE = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
export const MAIN_VOTE_HEADER = styled.div`
  background-color: dimgray;
  color: white;
  text-align: center;
  font-size: 48px;
  padding: 10px;
`;
export const VoteHeader = styled.div`
  font-size: 28px;
  margin: 0 auto;
  padding: 32px;
`;
export const PlayerList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
export const VoteTitle = styled.div`
  flex: 1 1 auto;
`;
export const SuccessImageToken = styled.img`
  width: inherit;
  height: inherit;
  border-radius: 100%;
  object-fit: fill;
  background: url("/img/angelToken.png");
`;
export const FailImageToken = styled.img`
  width: inherit;
  height: inherit;
  border-radius: 100%;
  object-fit: none;
  object-position: center;
  background: url("/img/evilToken.png");
`;
// export const Container = styled.div`
//   position: fixed;
//   top: 10;
//   left: 10;
//   width: 100%;
//   height: 100%;
//   background-color: #042813;
//   background-image: url("https://www.transparenttextures.com/patterns/45-degree-fabric-light.png");
// `;

const Card = styled.div`
  width: 250px;
  height: 450px;
`;

export const CardWrapper = styled(Card)`
  /* position: fixed; */
  top: 30%;
  left: 30%;
  transform: translate(-50%, -50%);
`;

export const PokerCard = styled(Card)`
  position: absolute;
  border-radius: 5px;
  margin-left: 20px;
  box-shadow: 4px 4px 5px 0px rgba(50, 50, 50, 0.75);
`;

export const PokerBack = styled(PokerCard)`
  //background-color: #ffffff;
  //opacity: 0.8;
  //background-color: #f3f3f4;
  //opacity: 1;
  background-image: linear-gradient(135deg, #a90c08 25%, transparent 25%),
    linear-gradient(225deg, #a90c08 25%, transparent 25%),
    linear-gradient(45deg, #a90c08 25%, transparent 25%),
    linear-gradient(315deg, #a90c08 25%, #f3f3f4 25%);
  background-position: 20px 0, 20px 0, 0 0, 0 0;
  background-size: 20px 20px;
  background-repeat: repeat;
  border: 5px solid #fff;
`;
// Poker card in front-side
export const PokerFront = styled(PokerCard)`
  display: flex;
  flex-flow: column nowrap;
  padding: 5px;
  background-color: #ffffff;
`;
export const FrontImg = styled.img`
  width: 100%;
  height: 100%;
`;
export const NicknameTag = styled.div`
  font-size: 24px;
  margin: 50px 0 0 100px;
`;
const walking = keyframes`
  to {
    background-position: 100% 0;
  }
`;

const stroll = keyframes`
  from {
    transform: translateX(-200%);
  }
  to {
    transform: translateX(200%);
  }
`;
export const ModalTitle = styled.div`
  display: flex;
  flex-direction: row;
  //justify-content: center;
  font-size: 24px;
  margin: 5px;
`;
export const ModalColumn = styled.div`
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  /* margin: 0 auto; */
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const ModalRow = styled.div``;
export const WalkContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 20%;
  padding-bottom: 30%;
  vertical-align: middle;
  overflow: hidden;
  animation: ${stroll} 5s linear infinite;
`;
export const SuccessImage = styled.button`
  width: 200px;
  height: 330px;
  background: url("/img/success.png");
`;
export const FailImage = styled.button`
  width: 200px;
  height: 330px;
  background: url("/img/fail.png");
`;
export const Walk = styled.div`
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/walk-sequence.svg);
  background-repeat: no-repeat;
  background-size: 800%;
  animation: ${walking} 1s infinite steps(7);
`;

export const ButtonAnimation = createGlobalStyle`
  body {
  font-family: sans-serif;
  text-align: center;

  display: grid;
  place-items: center;
  width: 100vw;
  height: 100vh;
}

.button {
  padding: 16px 24px;
  font-size: 21px;
  border: none;
  background: linear-gradient(135deg, blue 1%, red);
  color: white;
  border-radius: 4px;
}
.button:hover,
.button:focus {
  cursor: pointer;
  border: none;
  outline: none;
}

/* .button:active{
  -moz-animation: buttonRotate 10ms linear 0s 50 normal none;
  -webkit-animation: buttonRotate 10ms linear 0s 50 normal none;
  animation: buttonRotate 10ms linear 0s 50 normal none;
} */

.animate {
  -moz-animation: buttonRotate 10ms linear 0s 50 normal none;
  -webkit-animation: buttonRotate 10ms linear 0s 50 normal none;
  animation: buttonRotate 10ms linear 0s 50 normal none;
}

@keyframes buttonRotate {
  0% {
    transform: translate(-20px, 2px);
  }
  100% {
    transform: translate(20px, -2px);
  }
}
`;
