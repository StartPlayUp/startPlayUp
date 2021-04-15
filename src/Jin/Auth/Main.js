import React from 'react';
import {Route} from 'react-router-dom';

const Main = () =>{
    const naver = new naver.LoginWithNaverId({
        clientId: 'ZLFAGtItFGDqMKyhBgU9',
        access_token: naver.oauthParams.access_token
    })
    console.log(naver.oauthParams.access_token)
    naver.get_naver_userprofile("naverSignInCallback()");
    // 네이버 사용자 프로필 조회 이후 프로필 정보를 처리할 callback function
    const naverSignInCallback =() =>{
        console.log(naver_id_login.getProfileData('email'));
        console.log(naver_id_login.getProfileData('nickname'));
    }
    
    return(
        <div>
            
        </div>
    );
};

export default Main;