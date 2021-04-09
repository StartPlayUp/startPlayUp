import React,{useState} from 'react';
import styled from 'styled-components';
import {Route} from 'react-router-dom';
import { Main } from './Auth';
import {AuthContext} from './Auth/AuthContext';

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
    const Auth = React.createContext(AuthContext);
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
        Auth.onLogin=inputs;
        if (Auth.checkAuth){
            console.log("로그인 성공")
        }
        else{
            console.log("로그인 실패")
        }
    }
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
    return(
                <form >
                    <Input name="email" onChange={onChange} value = {email}/>
                    <p/>
                    <Input name="password" onChange={onChange} value = {password}/>
                    <Button onClick={logOn} >Login</Button>
                </form>
    );
    
    
}

export default LoginForm;