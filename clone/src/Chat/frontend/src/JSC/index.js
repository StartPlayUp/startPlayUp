import React from "react";
import App from "./store"
import { BrowserRouter } from 'react-router-dom';
import Store from "./store"

function app() {
    return (
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    );
}

export default app;
