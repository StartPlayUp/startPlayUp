import {VoteOnChange, VoteOnClick} from "../MVC/AVALON_Controller";
import React from "react";

function Main_Vote() {
    return (
        <div>
            <h3>{"원정에 참여하는 인원 수 : " + context.takeStage[context.expeditionStage] + "명"}</h3>
            {context.playerData.map((user, index) => (
                <ul key={index}>
                    <label>{user.nickname}
                        <input
                            onChange={() => VoteOnChange}
                            type="checkbox"
                            name={'checkbox'}
                            value={index}
                        />
                    </label>
                </ul>
            ))}
            <button onClick={() => VoteOnClick}>결정</button>
        </div>
    )
}
export default Main_Vote