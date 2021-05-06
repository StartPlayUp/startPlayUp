import React, {createContext, useMemo, useReducer} from "react";
import Container from './Container';
import {LOGIN} from './Constants/actionTypes';
import {testDB} from "./Common/testDB";
import { Route } from 'react-router-dom';
import LoginPageContainer from "./Container/LoginPageContainer";
import ChatContainer from "./Container/ChatContainer";
import ChatComponent from "./Component/ChatComponent";


const initialState = {
    user: "",
    isAuthenticated: false,
};
const reducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
            const res = testDB.filter((i) => i.id === action.id && i.password === action.password);
            console.log("[DEBUG] : STORE LOGIN");
            if (res.length > 0) {
                action.history.push("/chat");
                return {
                    ...state,
                    user: res[0].nickname,
                    isAuthenticated: true
                }
            } else {
                return {
                    ...state,
                    user: "Guest"
                };
            }

        default:
            return state;
    }
};
export const UserContext = createContext({
    // user: "",
    // isAuthenticated: false,
    // dispatch: () => {
    // }
});

function store() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {user, isAuthenticated} = state;
    const value = useMemo(() => ({
        user: user,
        isAuthenticated: isAuthenticated,
        dispatch: dispatch
    }), [user, isAuthenticated]);
    // dispatch는 실행중 변경하지 않기에 useMemo를 통해 제함.
    return (
        <UserContext.Provider value={value}>
            <Route  path="/" component={ChatContainer}/>
            <Route exact path="/login" component={LoginPageContainer}/>
            {isAuthenticated && <Route exact path="/chat" component={ChatComponent}/>}
        </UserContext.Provider>
    );
}

export default store;
