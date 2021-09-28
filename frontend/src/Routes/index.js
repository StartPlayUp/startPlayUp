import React, { useContext, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
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
import {mappingTable} from "../Constants/peerDataTypes";
export const Yutnori = 'Yutnori'
export const AVALON = 'AVALON'
export const YachtDice = 'YachtDice'
export const MINE_SEARCH = 'MINE_SEARCH'

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
export const CHAT_SHOW_BUTTON_STYLE = styled.button`
  width: 40px;
  height: 40px;
  background-color: rgb(0, 0, 0, 0);
  background-size: contain;
  background-image: url(${messageButtonImage});
  border-radius: 100%;
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

const app = () => {
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
          <PeerStore>
            {/* 원래 코드 주석 처리 ( 로그인 표시 X) */}
            <Route path="/" component={GlobalContainer} />
            <CookiesProvider>
              <Route exact path="/" component={LoginApp} />
            </CookiesProvider>
            {checkAuth && (
              <>
                <Route exact path="/main" component={WebMain} />
                <Switch>
                  <Route
                    path={"/waitingRoom"}
                    render={() => (
                      <WaitingRoom
                        chatList={chatList}
                        setChatList={setChatList}
                        handler={chatOnClickHandler}
                        history={history}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/RockPaperScissors"
                    render={() => (
                      <GamePage>
                        <RockPaperScissors />
                        <ChatComponent
                          chatList={chatList}
                          setChatList={setChatList}
                          width={500}
                          chatShow={chatShow}
                          position={'absolute'}
                        />
                      </GamePage>
                    )}
                  />
                  <Route
                    exact
                    path= {mappingTable.MINE_SEARCH.path}
                    render={() => (
                      <GamePage>
                        <ChatComponent
                          chatList={chatList}
                          setChatList={setChatList}
                          width={500}
                          chatShow={chatShow}
                          position={'absolute'}
                        />
                      </GamePage>
                    )}
                  />
                  <Route
                    exact
                    path={mappingTable.YUT.path}
                    render={() => (
                      <GamePage>
                        <Yut />
                        <ChatComponent
                          chatList={chatList}
                          setChatList={setChatList}
                          width={450}
                          chatShow={chatShow}
                          position={'absolute'}
                          style={{ border: "3px solid gray" }}
                        />
                        <CHAT_SHOW_DIV_STYLE>
                          <CHAT_SHOW_BUTTON_STYLE onClick={chatOnClickHandler} />
                        </CHAT_SHOW_DIV_STYLE>
                      </GamePage>
                    )}
                  />
                  <Route
                    exact
                    path={mappingTable.YACHT.path}
                    render={() => (
                      <GamePage>
                        <StyleDiv>
                          <Yacht />
                        </StyleDiv>
                        <ChatComponent
                          chatList={chatList}
                          setChatList={setChatList}
                          width={450}
                          chatShow={chatShow}
                          position={'absolute'}
                          style={{ border: "3px solid gray" }}
                        />
                        <CHAT_SHOW_DIV_STYLE>
                          <CHAT_SHOW_BUTTON_STYLE onClick={chatOnClickHandler} />
                        </CHAT_SHOW_DIV_STYLE>
                      </GamePage>
                    )}
                  />
                  <Route
                    exact
                    path={mappingTable.AVALON.path}
                    render={() => (
                      <GamePage>
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
                      </GamePage>
                    )}
                  />
                </Switch>
              </>
            )}
          </PeerStore>
        </>
      </BrowserRouter>
    </>
  );
};
export default app;
