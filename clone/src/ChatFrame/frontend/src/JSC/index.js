import React, { useContext } from "react";
import { Store, UserContext } from "./store"
import { Route, Switch } from 'react-router-dom';
import LoginPageContainer from "./Container/LoginPageContainer";
import ChatContainer from "./Container/ChatContainer";
import ChatComponent from "./Component/ChatComponent";
import RockPaperScissors from "./Component/GameComponent/RockPaperScissors";
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';

const GamePage = styled.div`
    display:flex;
    flex-direction:row;
`;

function app() {
    const { isAuthenticated } = useContext(UserContext);
    return (
        <BrowserRouter>
            <Route path="/" component={ChatContainer} />
            <Route exact path="/" component={LoginPageContainer} />
            {isAuthenticated && <Route exact path="/chat" render={() => <GamePage>
                <RockPaperScissors />
                <ChatComponent />
            </GamePage>} />}
        </BrowserRouter>
    );
}

export default app;
