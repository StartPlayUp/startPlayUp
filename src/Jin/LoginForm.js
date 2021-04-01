import React,{useState} from 'react';
import styled from 'styled-components';
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
    const onReset=()=>{
        setInputs({
            email: '',
            password: ''
        })
    };
    return(
      <p>
          <Input name="email" placeholder="Email" onChange={onChange} value={email}/>
          <p></p>
          <Input name="password" placeholder="Password" onChange={onChange} value={password}/>
          <p></p>
          <Button onClick={onReset}>로그인</Button>
          <div>
              <b>값: </b>
              {email}({password})
          </div>
      </p>  
    );
}

export default LoginForm;