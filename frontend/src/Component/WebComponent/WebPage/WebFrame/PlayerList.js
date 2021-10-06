import React, { useEffect, useState } from "react";
import * as S from '../Style/WebFrameStyle'
import axios from "axios";
import { useLocation } from "react-router";
import { getEnvIp } from "Common/envModule"

const PlayerList = ({ roomId }) => {
    axios.defaults.withCredentials = true;
    const [users, setUsers] = useState([])
    const nickname = localStorage.getItem('nickname')
    useEffect(async ({ roomId }) => {
        const getRoomConfig = {
            method: 'post',
            url: getEnvIp().SERVER_IP + '/api/room/getRoom',
            data: {
                roomId,
            }
        }
        try {
            const roomObject = await axios(getRoomConfig);
            return roomObject.data;
        } catch (error) {
            console.error(error)
            return {}
        }
    }, [])
    return (
        users.map((user, index) => (
            <S.UserList>
                <S.Users width={'5vw'}>{`${index + 1} : ${user.nickname.substring(0, user.indexOf(' '))}`}</S.Users>
            </S.UserList>
        ))
    )
}
export default PlayerList