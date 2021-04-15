import React,{useState,useContext, Fragment, useEffect} from 'react';
import styled from 'styled-components';
import {Route, useHistory,useLocation} from 'react-router-dom';
import { Main } from './Auth';
import { AuthStore, AuthProvider} from './Auth/AuthContext';
import { signInWithGoogle} from '../util/firebase_config';
import { getSuggestedQuery } from '@testing-library/dom';
import firebase from 'firebase';
import KakaoLogin from "react-kakao-login";
import NaverLogin from "react-login-by-naver";


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
    const history=useHistory()
    const location=useLocation();
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
                <NaverLogin
                    clientId="ZLFAGtItFGDqMKyhBgU9"
                    callbackUrl="http://localhost:3000/Main"
                    render={(props) => <div onClick={props.onClick}>Naver Login</div>}
                    onSuccess={(naverUser) => console.log(naverUser)}
                    onFailure={() => console.error(result)}
                ></NaverLogin>
                <KakaoLogin
                    jsKey={"3eba9d0656f87b8cb00ae9e1e9f6ca31"}
                    onSuccess={(res) => console.log(res)}
                    onFailure={(res) => console.log(res)}
                    getProfile={true}
                ><img src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg" /></KakaoLogin>
                
            </form>
            )
        )
     }
        </AuthStore.Consumer>

    );

}
//네이버 로그인 <div onClick={initializeNaverLogin} id='naverIdLogin'/>
    //네이버 로그인
/*
const {naver} = window;
const initializeNaverLogin=()=>{
    const naverLogin=new naver.LoginWithNaverId({
        clientId:'ZLFAGtItFGDqMKyhBgU9',
        callbackUrl:'http://localhost:3000/Main',
        isPopup:false,
        loginButton: { color: "green", type: 3, height: 40 }
    });
    naverLogin.init();
}
const getNaverToken=()=>{
    if(!location.hash) return;
    const token = location.hash.split('=')[1].split('&')[0];
    console.log('로그인 성공',token);
    console.log(window)
};
useEffect(() => {
    initializeNaverLogin();
    getNaverToken();

}, []);
*/
export default LoginForm;
 //카카오 로그인
    /*
    const KakaoLogin = () => {
        
        loginWithKakao();
     }
    
    const loginWithKakao=()=>{
        Kakao.init('3eba9d0656f87b8cb00ae9e1e9f6ca31');
        try{
            return new Promise((resolve,reject)=>{
                if(!Kakao){
                    reject("Kakao 인스턴스가 존재하지 않습니다.")
                    }
                    Kakao.Auth.login({
                        success:(auth)=>{
                            console.log('정상적으로 로그인 되었습니다.',auth)
                            .then(res=> res.json())
                            .then(res=>{
                                localStorage.setItem("Kakao_token",res.access_token);
                                if(res.access_token){
                                    console.log(res)
                                    history.push("/Main");
                                }
                            })
                        },
                        fail:(err)=>{
                            console.error(err)
                        }
                    })
                })
            }
            catch(err){
                console.error(err)
            }
        }
        */
//<button onClick={KakaoLogin}><img src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg" /></button>
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