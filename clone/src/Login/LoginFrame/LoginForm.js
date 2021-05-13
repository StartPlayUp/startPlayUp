import React, {useState, useContext} from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import {AuthStore} from './Auth/AuthContext';
import KakaoLogin from "react-kakao-login";
import NaverLogin from "react-login-by-naver";
import NaverImage from '../../images/naverGreenLogin.PNG'
import KakaoImage from './LoginLogo/ko/kakao_login_large_narrow.png'

const Frame = styled.div`
    display : flex;
    justify-contents : center;
    flex-direction : column;
`

const Title = styled.div`
    display : flex;
    margin: 0 auto;
    font-family: Roboto;
    font-size: 32px;
    line-height: 3em;
    text-align: center;
    font-weight : lighter;
    letter-spacing : 10px;
    text-decoration : none;
    margin-bottom : 30px;
`

const LoginConnectArea = styled.div`
    margin : 50px auto;
    display : inherit;
    justify-content : center;
    align-items : center;
    flex-direction : column;
`

const Button = styled.button`
    display:flex;
    background:#566270;
    padding : 15px;
    color:white;
    font-family: Roboto;
    font-style: normal;
    font-size: 22px;
    border:none;
    text-align: center;
    justify-content: center;
`

const Input = styled.input`
    display:flex;
    margin : 0 auto 12px auto;
    width:80%;
    border-bottom-width:medium solid;
    border-style:none;
    background-color : inherit;
    placeholder : ${props => props.placeholder}
    input:focus outline:none;
    font-style: italic;
    font-size : 14px;
    border-bottom:solid 3px #E0E3DA;
    // border-collapse:collapse;
`

const InputFrame = styled.div`
    display : flex;
    flex-wrap : nowrap;
    align-item : center;
`
const InputInfo = styled.div`
    width : 100vw;
`
const LoginButtonArea = styled.div`
    width : 30vw;
    margin : 0 atuo;
    justify-content: center;
    align-item : center;
`

const Image = styled.img`
    width : auto;
    height : 6vh;
    margin-bottom : 20px;
`

function LoginForm() {
    const AuthCon = useContext(AuthStore);
    let history = useHistory();
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const {email, password} = inputs;
    const onChange = (e) => {
        const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };
    const logOn = (e) => {
        e.preventDefault();
        AuthCon.onLogin(inputs, history)
    };
    return (
        <AuthStore.Consumer>
            {({checkAuth}) => (
                (checkAuth ? <div/> :
                        <Frame>
                            <Title>StartPlayUp</Title>
                            <InputFrame>
                                <InputInfo>
                                    <Input
                                        type={'text'}
                                        name="email"
                                        onChange={onChange}
                                        placeholder={'Email'}
                                        value={email}/>
                                    <Input
                                        type={'password'}
                                        name="password"
                                        onChange={onChange}
                                        placeholder={'Password'}
                                        value={password}/>
                                </InputInfo>
                                <LoginButtonArea>
                                    <Button onClick={logOn}>Login</Button>
                                </LoginButtonArea>
                            </InputFrame>
                            <LoginConnectArea>
                                <NaverLogin //네이버 로그인 모듈 사용
                                    clientId={'HI9KL4ilNF_j6vWKWQ8P'} //발급 받은 클라이언트 ID
                                    callbackUrl="http://localhost:3000"    //콜백 URL
                                    render={(props) =>
                                        <Image
                                            src={NaverImage}
                                            onClick={props.onClick}
                                            alt='NaverLoginImage'
                                        />
                                    }  //로그인 버튼 생성

                                    onSuccess={(naverUser) => AuthCon.onNaverLogin(naverUser, history)}   //성공시
                                    onFailure={() => console.error(result)} //실패한 경우
                                />
                                <KakaoLogin
                                    jsKey={'ff442cfe2e882d30f4a2d95cb616a8cd'}
                                    onSuccess={(res) => AuthCon.onKakaoLogin(res, history)}   //AuthContext에 있는 카카오 로그인 함수를 실행 하도록 합니다.
                                    onFailure={(res) => console.log(res)}
                                    getProfile={true}
                                >
                                    <Image src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"/>
                                </KakaoLogin>
                            </LoginConnectArea>
                        </Frame>
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