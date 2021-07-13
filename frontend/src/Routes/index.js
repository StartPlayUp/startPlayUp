import React, { useContext } from "react";
import { Store, UserContext } from "../store"
import { Route, Switch, useHistory } from 'react-router-dom';
import LoginPageContainer from "Container/LoginPageContainer";
import GlobalContainer from "Container/GlobalContainer";
import ChatComponent from "Component/ChatComponent";
import RockPaperScissors from "Component/GameComponent/RockPaperScissors";
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import MineSearch from "Container/GameContainer/MineSearch";
import Yut from 'Container/GameContainer/Yut/Yut';
import Yacht from 'Container/GameContainer/Yacht/Yacht';

const GamePage = styled.div`
    display:flex;
    flex-direction:row;

`;
const StyleDiv = styled.div`
        display: flex;
        background-color: #e0e3da;
        justify-content: center;
        flex-direction: row;
        width: 100%;
        min-height: 100vh;
    `
const TemporaryMain = () => {
    const history = useHistory();
    return (<div>
        <button onClick={() => history.push("/RockPaperScissors")}>RockPaperScissors</button>
        <button onClick={() => history.push("/MineSearch")}>MineSearch</button>
        <button onClick={() => history.push("/Yut")}>Yut</button>
        <button onClick={() => history.push("/Yacht")}>Yacht</button>
    </div>)
}

function app() {
    const { isAuthenticated } = useContext(UserContext);
    console.log("asdf")
    return (
        <BrowserRouter>

            {/* 원래 코드 주석 처리 ( 로그인 표시 X) */}
            <Route path="/" component={GlobalContainer} />
            <Route exact path="/" component={LoginPageContainer} />
            {isAuthenticated && <Route exact path="/main" component={TemporaryMain} />}
            {isAuthenticated && <Route exact path="/RockPaperScissors" render={() => <GamePage>
                <RockPaperScissors />
                <ChatComponent />
            </GamePage>} />}
            {isAuthenticated && <Route exact path="/MineSearch" render={() => <GamePage>
                <MineSearch />
            </GamePage>} />}
            {isAuthenticated && <Route exact path="/Yut" render={() => <GamePage>
                <Yut />
                <ChatComponent />
            </GamePage>} />}
            {isAuthenticated && <Route exact path="/Yacht" render={() => <GamePage>
                <StyleDiv>
                    <Yacht />
                </StyleDiv>
                <ChatComponent />
            </GamePage>} />}



            {/* {<Route path="/" component={TemporaryMain} />}
            {<Route exact path="/RockPaperScissors" render={() => <GamePage>
                <RockPaperScissors />
                <ChatComponent />
            </GamePage>} />}
            {<Route exact path="/MineSearch" render={() => <GamePage>
                <MineSearch />
            </GamePage>} />}
            {<Route exact path="/Yut" render={() => <GamePage>
                <Yut />
                <ChatComponent />
            </GamePage>} />} */}
        </BrowserRouter>
    );
}

export default app;
