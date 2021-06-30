import React, {useContext, useState} from "react";
import {useLocation} from 'react-router-dom';
import {UserState} from "../gameSetting";

function GameEnd() {
    const userState = useContext(UserState)
    const location = useLocation();
    let value
    try {
        value = location.state.value
    } catch {
        value = 'Evil_Win'
    }
    return (
        <div>
            {
                value === 'Evil_Win' ?
                    <h3>악마가 이겼습니다.</h3> :
                    value === 'Merlin' ? <h3>악마가 이겼습니다.</h3> : <h3>천사가 이겼습니다.</h3>
            }
            {userState.map((user, index) => (
                <div key={index}>
                    <li>{user.nickname} : {user.role}</li>
                    <br/>
                </div>
            ))}
        </div>
    )
}

export default GameEnd