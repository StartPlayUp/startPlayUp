import React,{useContext,useState} from 'react';
import {Route} from 'react-router-dom';
import { AuthStore, AuthProvider } from './AuthContext';
const Main = () =>{
    const test = useContext(AuthStore)
    return(
        <div>
        <p>test</p>
        <p>{email,console.log(AuthStore),console.log(test)}</p>
        <p>{password, console.log(email,password)}</p>
        </div>
    );
};

export default Main;