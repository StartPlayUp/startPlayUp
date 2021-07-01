import React, {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import {UserState,PlayState} from "../gameSetting";

function AssassinPlayer() {
    const history = useHistory()
    const userState = useContext(UserState)
    const [kill, setKill] = useState('');
    const onChange = e => {
        setKill(e.target.value);
    };
    const onClick = e => {
        const value = e.target.value
        history.push({
            pathname: '/endGame',
            state: {
                value: value
            }
        })
    };
    return (
        <div>
            <h3>멀린을 찾으세요</h3>
            {userState.map((user, index) => (
                <label key={index}>
                    {user.nickname}
                    <input type="radio"
                           name={'vote'}
                           value={user.role}
                           onChange={onChange}
                    />
                    <br/>
                </label>
            ))}
            <button onClick={onClick} value={kill}>암살</button>
        </div>
    )
}

export default AssassinPlayer;