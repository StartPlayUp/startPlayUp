import React,{useState,useContext, Fragment, useEffect} from 'react';
import styled from 'styled-components';
import { Route,useHistory} from 'react-router-dom';
import { Main } from './Auth';
import { AuthStore, AuthProvider} from './Auth/AuthContext';
import { signInWithGoogle} from '../util/firebase_config';
import { getSuggestedQuery } from '@testing-library/dom';
import firebase from 'firebase';
import KakaoLogin from "react-kakao-login";
import NaverLogin from "react-login-by-naver";
import 'firebase/firestore';


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
    let history = useHistory();
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
        e.preventDefault();
        AuthCon.onLogin(inputs,history)
        
    };
    const DBConnect=(e)=>{  //파이어 스토어가 잘 연동 되었는지 테스트 하는 용도입니다.
        e.preventDefault();
        const db = firebase.firestore();
        db
            .collection("User").doc("sTu4bsMTdK633pMGcFu9").get()
            .then((doc)=>{
                if(doc.exists){
                    console.log("Document data:",doc.data());
                }
                else{
                    HTMLFormControlsCollection.log("No such document!");
                }
            }).catch((error)=>{
                console.log("Eorror getting document:", error);
            })
        
    }
    return(
        <AuthStore.Consumer>
        {({checkAuth})=>(
                (checkAuth ? <div/>  :
            <form>
                <Input name="email" onChange={onChange} value = {email}/>
                <p />
                <Input name="password" onChange={onChange} value = {password}/>
                <Button onClick={logOn}>Login</Button>
                <button onClick={DBConnect}>firestore테스트용</button>
                <NaverLogin //네이버 로그인 모듈 사용
                    clientId="ZLFAGtItFGDqMKyhBgU9" //발급 받은 클라이언트 ID
                    callbackUrl="http://localhost:3000/Main"    //콜백 URL
                    render={(props) => <div onClick={props.onClick}>Naver로 로그인</div>}  //로그인 버튼 생성
                    onSuccess={(naverUser) => console.log(naverUser)}   //성공시
                    onFailure={() => console.error(result)} //실패한 경우
                ></NaverLogin>
                <KakaoLogin
                    jsKey={"3eba9d0656f87b8cb00ae9e1e9f6ca31"}
                    onSuccess={(res) => AuthCon.onKakaoLogin(res,history)}   //AuthContext에 있는 카카오 로그인 함수를 실행 하도록 합니다.
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
export default LoginForm;
//(res)=>DBUpload(res)
/*
                        (naverUser) => console.log(naverUser)
const DBUpload = (res) => {
    firestore
        .Collection("User")
        .get()
        .then(res => res.json())
        .then((res) => {

        })

}
*/
//<button onClick={signInWithGoogle}>구글로 로그인하기</button>