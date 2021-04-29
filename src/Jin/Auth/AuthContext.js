import React, { Component, useLayoutEffect, useState } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';

const AuthStore=React.createContext(); //context 객체 생성

const AuthProvider =(props)=>{ //AuthProvider 컴포넌트를 생성
    const [contextState, setContextState] = useState({ //useState를 사용해 Context값을 변경하려고 합니다.
        checkAuth:false, //로그인 상태를 기록합니다. false는 로그아웃 되어있는 상태입니다.
        error:false
    });

    const {children} = props; //children에게 값을 전달합니다.
    const testDB = [{email:"test@gmail",password:"1234"}]; //테스트를 위한 하드코딩 된 이메일과 비밀번호 입니다.
    const onLogin = (model,history)=>{
        setContextState({
            ...contextState, //
        });
        console.log("이메일"+model.email)
        console.log("비밀번호"+model.password)
        
        const res = testDB.filter((i)=>i.email===model.email&&i.password===model.password);
        if(res.length>0){
            localStorage.setItem('email',model.email); //새로고침 하더라도 계속 유지 될 수 있도록 웹 스토리지에 저장합니다.
            localStorage.setItem('password',model.password); //마찬가지로 비밀번호도 저장합니다.
            setContextState({
                ...contextState,
                checkAuth:true,
                error:false
            }
            );
            history.push('/Main');
        }else{
            setContextState({
                checkAuth:false,//전달 받은 이메일 비밀번호가 같지 않은 경우입니다.
                error:true//에러를 트루로 변경합니다.
            });
        }
        console.log(contextState.checkAuth)
    };
    const onKakao=(res,history)=>{  //카카오 로그인 할 때 전달 받은 res 객체 중 id 요소를 파악하도록 합니다.
        setContextState({
            ...contextState,
        });
        const KakaoID = res.profile.id  //res 객체 중 id 배열에 접근합니다.
        let user= []    //파이어스토어 객체의 요소를 담을 배열입니다.
        const db = firebase.firestore();    //파이어스토어를 실행합니다.
        db
            .collection("User").doc("sTu4bsMTdK633pMGcFu9").get() //User테이블에 있는 sTu4bsMTdK633pMGcFu9 문서에 있는 내용을 읽어옵니다.
            .then((doc) => {
                if (doc.exists) {   //doc이 존재하면 아래 내용을 실행합니다.
                    for (user in doc.data()) {   //for문을 통해 sTu4bsMTdK633pMGcFu9문서 내용 하나씩 불러옵니다.
                        console.log("test:", doc.data()[user])
                        console.log(KakaoID)
                        if(KakaoID==doc.data()[user]){  //카카오 로그인을 통해 받아온 id 번호와 DB에 있는 id 번호를 비교합니다.
                            setContextState({
                                ...contextState,//존재 하는 경우 로그인이 성공 했음을 알립니다.
                                checkAuth:true,
                                error:false
                            });
                            history.push('/Main');//메인 페이지로 넘어가게 됩니다.
                            localStorage.setItem('email', KakaoID)
                            console.log("카카오 아이디를 찾았다.")
                        }
                        console.log(contextState.checkAuth)
                    }
                    console.log("Document data:", doc.data());
                }
                else {
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Eorror getting document:", error);
            })
    }
    return(
        <AuthStore.Provider value={{  //Provider 태그 안에서 쓸 수 있도록 합니다.
            onLogin,
            onKakao,
            checkAuth: contextState.checkAuth
        }}>
            {children}
        </AuthStore.Provider>
    );
}
    /*
    const onLogout = () =>{ //로그아웃을 하는 컴포넌트 입니다.
        localStorage.removeItem('email');//로그아웃을 했기 때문에 이메일, 비밀번호를 지웁니다.
        localStorage.removeItem('password');
        setContextState({ //로그인 상태를 변경합니다. checkAuth의 상태를 변경해 로그아웃 상태임을 알려줍니다.
            ...contextState,
            checkAuth:false,
            error:false
        });
    };*/
    /*
    const signIn =model=>{ //회원가입 하는 컴포넌트 입니다. 향후에 구현할 예정입니다.
        setContextState({
            ...contextState,
        });
        
    }
    */
/*
const AuthRoute=({ component: Component, ...rest})=>(//다른 페이지를 띄워주기 위한 컴포넌트 입니다.
    <AuthContext.Consumer>
        {({ checkAuth})=>{
            let content = '';

            if (checkAuth){
                content =(
                    <Route
                        render={props => (
                            <Component {...props} />
                        )}
                        {...rest}
                    />
                );
            }
        }
        }
    </AuthContext.Consumer>
);

export { AuthContext,AuthProvider,AuthRoute };
*/
export {AuthStore,AuthProvider};
