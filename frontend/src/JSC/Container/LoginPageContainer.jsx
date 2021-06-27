import React, { useContext, useState } from 'react'
import { useHistory } from "react-router-dom";
import styled from 'styled-components'
import { UserContext } from '../store'
import { LOGIN } from '../Constants/actionTypes'
// import firebase, {signInWithGoogle} from '../Common/firebase/config';

const UserInformationInput = styled.input`
    display:flex;
    height:40px;
`;


const LoginPageContainer = () => {
    const history = useHistory();
    // const [data, setData] = useState("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const { user, isAuthenticated, dispatch } = useContext(UserContext);
    console.log("(debug store.js) : ", user, isAuthenticated);

    const onChangeIdHandler = (e) => {
        setId(e.target.value)
    };
    const onChangePasswordHandler = (e) => {
        setPassword(e.target.value)
    };
    const onClickSendButtonHandler = () => {
        dispatch({ type: LOGIN, id, password, history });
        console.log("(debug store.js) : ", "dispatch LOGIN");
    };

    // const googleLoginHandler = () => {
    //     firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
    //         console.log({ token: idToken });
    //     })
    // }

    return (
        <>
            <div>
                <UserInformationInput value={id} onChange={onChangeIdHandler} placeholder="id" />
                <UserInformationInput type="password" value={password} onChange={onChangePasswordHandler}
                    placeholder="password" />
                <button onClick={onClickSendButtonHandler}>전송</button>
                {/* <button onClick={signInWithGoogle}>SIGN IN WITH GOOGLE</button> */}
                {/* <button onClick={googleLoginHandler}>구글 토큰보기</button> */}
            </div>
        </>
    )
};

export default LoginPageContainer;
