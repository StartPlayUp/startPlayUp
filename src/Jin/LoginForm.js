import React,{useState,useContext, Fragment, useEffect} from 'react';
import styled from 'styled-components';
import {Route} from 'react-router-dom';
import { Main } from './Auth';
import { AuthStore, AuthProvider} from './Auth/AuthContext';
import { signInWithGoogle} from '../util/firebase_config';
import { getSuggestedQuery } from '@testing-library/dom';


const Button = styled.button`
    display:flex;
    background:#566270;
    width:20%;
    color:white;
    font-family: Roboto;
    font-style: normal;
    font-size: 18px;
    border:none;
    text-align: center;
    justify-content: center;

`
const Input = styled.input`
    display:flex;
    width:80%;
    border-bottom-width:medium solid;
    
`

function LoginForm(){
    const AuthCon = useContext(AuthStore);
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const {email,password}=inputs;
    const onChange=(e)=>{
        const {value,name}=e.target;
        setInputs({
            ...inputs,
            [name]:value
        });
    };
    const logOn=(e)=>{
        e.preventDefault()
        AuthCon.onLogin(inputs)
        
    };
    const {naver} = window;
    const NLogin=()=>{
        initializeNaverLogin();
        UserProfile();
    }
    const initializeNaverLogin=()=>{
        const naverLogin=new naver.LoginWithNaverId({
            clientId:'ZLFAGtItFGDqMKyhBgU9',
            callbackUrl:'http://localhost:3000/Main',
            isPopup:false,
            loginButton: { color: "green", type: 3, height: 40 }
        });
        naverLogin.init();
    }
    useEffect(()=>{
        initializeNaverLogin();
    },[]);
    const UserProfile=()=>{
        window.location.href.includes('access_token')&&GetUser();
        function GetUser(){
            const location = window.location.hreft.split('=')[1];
            const token=location.split('&')[0];
            console.log("token: ", token);
            fetch(`${API}/account/sign-in`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": token
                },
            })
                .then(res => res.json())
                .then(res => {
                    localStorage.setItem("access_token", res.token);
                    setUserData({
                        email:res.email,
                        nickname: res.nickname,
                    })
                })
                .catch(err => console.log("err : ", err));
        }
    };
    return(
        <AuthStore.Consumer>
        {({checkAuth})=>(
            (checkAuth? <Route path="/Main" component={Main}/> :
            <form>
                <Input name="email" onChange={onChange} value = {email}/>
                <p/>
                <Input name="password" onChange={onChange} value = {password}/>
                <Button onClick={logOn} >Login</Button>
                <button onClick={signInWithGoogle}>구글로 로그인하기</button>
                <div onClick={NLogin} id='naverIdLogin'/>
            </form>
            )
        )
     }
        </AuthStore.Consumer>

    );

}

export default LoginForm;
        /*
    const onReset=()=>{
        setInputs({
            email: '',
            password: ''
        })
    };
    */
   /*
    return(
        
        <p>
          <Input name="email" placeholder="Email" onChange={onChange} value={email}/>
          <p></p>
          <Input name="password" placeholder="Password" onChange={onChange} value={password}/>
          <p></p>
          <Button onClick={
              <Route expact path ="/Main" component ={Main}/>
          }>로그인</Button>
          <div>
              <b>값: </b>
              {email}({password})
          </div>
        </p> 
    );
     */