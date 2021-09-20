import React, { useContext, useState } from "react";
import { UserContext } from "../LoginStore";
import { Route, Switch, useHistory } from "react-router-dom";
import LoginPageContainer from "Container/LoginPageContainer";
import GlobalContainer from "Container/GlobalContainer";
import ChatComponent from "Component/ChatComponent";
import RockPaperScissors from "Component/GameComponent/RockPaperScissors";
import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import MineSearch from "Container/GameContainer/MineSearch";
import Yut from "Container/GameContainer/Yut/Yut";
import Yacht from "Container/GameContainer/Yacht/Yacht";
import { PeerStore } from "./peerStore";
import AVALON_BETA from "../Component/GameComponent/AVALON_BETA/AVALON_BETA";
import messageButtonImage from "images/blue-message.png";
import View from "../Component/GameComponent/AVALON_BETA/View";
import { createGlobalStyle } from "styled-components";
import { LoginApp } from "Component/WebComponent/WebPage";
import { AuthStore } from "Component/WebComponent/Login/LoginFrame/Auth/AuthContext";
import WebMain from "../Component/WebComponent/WebPage/WebFrame/webBody";
import WaitingRoom from "../Component/WebComponent/WebPage/WebFrame/waitingRoom";
import SetNickName from "Component/WebComponent/Login/LoginFrame/setNickName";
import { Modal } from "react-modal";
import { CookiesProvider } from "react-cookie";
const GamePage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 10px;
`;

const StyleDiv = styled.div`
  display: flex;
  background-color: #e0e3da;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  min-height: 100vh;
`;
const AVALON_STYLE = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  background-color: inherit;
`;
const AVALON_Global = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background-color: #e0e3da;
    background-image: url('https://www.transparenttextures.com/patterns/45-degree-fabric-light.png');
  }
  div {
    width: auto;
    height: auto;
    color: black;
  }
`;
const AVALON_GAME = styled.div`
  display: flex;
  width: 70%;
  height: 90%;
  flex-wrap: wrap;
  justify-content: flex-start;
`;
const AVALON_CHAT = styled.div`
  display: flex;
  width: 30%;
  height: 100%;
  justify-content: flex-end;
`;

const CHAT_STYLE = styled.div`
  display: flex;
  flex-basis: 30%;
  flex-direction: row;
  justify-content: flex-end;
`;

export const CHAT_SHOW_BUTTON_STYLE = styled.button`
  width: 40px;
  height: 40px;
  background-color: rgb(0, 0, 0, 0);
  background-size: contain;
  background-image: url(${messageButtonImage});
  border-radius: 100%;
`;

export const ButtonGlobalHover = createGlobalStyle`
  button{
    font-size: 14px;
    color: #ffffff;
    background-color: #a593e0;
    border-radius: 2px;
    border: 0;
    padding: 10px;
    text-decoration: none;
    transition: all 0.5s;

    &:hover {
      background-color: green;
    }
  }
`;

export const CHAT_SHOW_DIV_STYLE = styled.div`
  position: absolute;
  z-index: 100;
  top: 0;
  right: 0;
  margin: 8px 20px 0px 0px;
  width: 32px;
  height: 32px;
`;

const FLEX_DIV = styled.div`
  display: flex;
  justify-content: space-around;
`;

const TemporaryMain = () => {
  const history = useHistory();
  return (
    <div>
      <button onClick={() => history.push("/RockPaperScissors")}>
        RockPaperScissors
      </button>
      <button onClick={() => history.push("/MineSearch")}>MineSearch</button>
      <button onClick={() => history.push("/Yut")}>Yut</button>
      <button onClick={() => history.push("/Yacht")}>Yacht</button>
      <button onClick={() => history.push("/AVALON")}>AVALON</button>
    </div>
  );
};

const app = () => {
  //const { isAuthenticated } = useContext(UserContext);
  const { checkAuth } = useContext(AuthStore);
  const [chatShow, setChatShow] = useState(true);
  const [chatList, setChatList] = useState([]);
  const chatOnClickHandler = () => {
    setChatShow((prev) => !prev);
  };
  
  return (
    <>
      <BrowserRouter>
        <>
          
          <ButtonGlobalHover />
          {/* 원래 코드 주석 처리 ( 로그인 표시 X) */}
          <Route path="/" component={GlobalContainer} />
          {/* <Route exact path="/" component={LoginPageContainer} /> */}
          <CookiesProvider>
            <Route exact path="/" component={LoginApp} />
          </CookiesProvider>
          {checkAuth && (
            <>
              <Switch>
                <Route exact path="/main" component={WebMain} />
                <Route
                  path={"/waitingRoom"}
                  render={() => (
                    <WaitingRoom
                      chatList={chatList}
                      chatShow={chatShow}
                      setChatList={setChatList}
                      handler={chatOnClickHandler}
                      history={history}
                    />
                  )}
                />
              </Switch>
            </>
          )}
        </>
        {checkAuth && (
          <Route
            exact
            path="/RockPaperScissors"
            render={() => (
              <GamePage>
                <PeerStore>
                  <RockPaperScissors />
                  <ChatComponent />
                </PeerStore>
              </GamePage>
            )}
          />
        )}
        {checkAuth && (
          <Route exact path="/setNickname" component={SetNickName}/>
        )}
        {checkAuth && (
          <Route
            exact
            path="/MineSearch"
            render={() => (
              <GamePage>
                <PeerStore>
                  <MineSearch />
                </PeerStore>
              </GamePage>
            )}
          />
        )}
        {checkAuth && (
          <Route
            exact
            path="/Yut"
            render={() => (
              <GamePage>
                <PeerStore>
                  <Yut />
                  {chatShow && (
                    <ChatComponent
                      chatList={chatList}
                      setChatList={setChatList}
                      width={500}
                    />
                  )}
                  <CHAT_SHOW_DIV_STYLE>
                    <CHAT_SHOW_BUTTON_STYLE onClick={chatOnClickHandler} />
                  </CHAT_SHOW_DIV_STYLE>
                </PeerStore>
              </GamePage>
            )}
          />
        )}
        {checkAuth && (
          <Route
            exact
            path="/Yacht"
            render={() => (
              <GamePage>
                <PeerStore>
                  <StyleDiv>
                    <Yacht />
                  </StyleDiv>
                  {chatShow && (
                    <ChatComponent
                      chatList={chatList}
                      setChatList={setChatList}
                    />
                  )}
                  <CHAT_SHOW_DIV_STYLE>
                    <CHAT_SHOW_BUTTON_STYLE onClick={chatOnClickHandler} />
                  </CHAT_SHOW_DIV_STYLE>
                </PeerStore>
              </GamePage>
            )}
          />
        )}
        {checkAuth && (
          <Route
            exact
            path="/AVALON"
            render={() => (
              <GamePage>
                <PeerStore>
                  <StyleDiv>
                    <AVALON_Global />
                    <AVALON_BETA />
                  </StyleDiv>
                  {chatShow && (
                    <ChatComponent
                      chatList={chatList}
                      setChatList={setChatList}
                      width={320}
                    />
                  )}
                  <CHAT_SHOW_DIV_STYLE>
                    <CHAT_SHOW_BUTTON_STYLE onClick={chatOnClickHandler} />
                  </CHAT_SHOW_DIV_STYLE>
                  {/* <AVALON_STYLE>
                  <AVALON_Global />
                  <AVALON_GAME>
                    <AVALON_BETA />
                  </AVALON_GAME>
                  <AVALON_CHAT>
                    {chatShow && (
                      <ChatComponent
                        chatList={chatList}
                        setChatList={setChatList}
                        width={300}
                      />
                    )}
                    <CHAT_SHOW_DIV_STYLE>
                      <CHAT_SHOW_BUTTON_STYLE onClick={chatOnClickHandler} />
                    </CHAT_SHOW_DIV_STYLE>
                  </AVALON_CHAT>
                </AVALON_STYLE> */}
                </PeerStore>
              </GamePage>
            )}
          />
        )}
      </BrowserRouter>
    </>
  );
};
export default app;
