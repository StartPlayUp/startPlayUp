import {KillPlayer, SelectPlayer} from "../MVC/AVALON_Controller";
import React from "react";

function assassinView() {
    return (
        <>
            <h3>ASSASSIN</h3>
            {context.playerData.map((user, index) => (
                <label key={index}>
                    {user.nickname}
                    <input type="radio"
                           name={'vote'}
                           value={user.role}
                           onChange={() => SelectPlayer}
                    />
                    <br/>
                </label>
            ))}
            <button onClick={() => KillPlayer}>kill</button>
        </>
    )
}
