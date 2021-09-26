import React, {useEffect} from "react";
import * as S from '../Style/WebFrameStyle'
import axios from "axios";
import {useLocation} from "react-router";
const PlayerList=()=>{
    const location = useLocation()
    const room = location.state.room
    console.log(`room : ${room}`)
    useEffect(() => {
        const getUserConfig = {
            method: 'get',
            url: `http://localhost:4000/api/user/getUser?email=${room.email}`,
        }
        axios(getUserConfig)
            .then(function (response) {
                console.log(`해당 이메일로 가입한 사용자 데이터 가져오기: ${room.email} : `, response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    },[])
    return(
        room.guestList.map((user, index)=>(
            <S.UserList>
                <S.Users width={'5vw'}>{`${index+1} : ${user.substring(0,user.indexOf(' '))}`}</S.Users>
            </S.UserList>
        ))
    )
}
export default PlayerList