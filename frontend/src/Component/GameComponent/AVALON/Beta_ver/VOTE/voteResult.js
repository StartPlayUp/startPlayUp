import {VotePage} from "../MVC/AVALON_Controller";
import React from "react";

return (
    <div>
        {context.playerData.map((user, index) => (
            <ul key={index}>
                <li>{`nickname : ${user.nickname}`}</li>
                <li>{`vote : ${user.toGo === 'agree' ? '찬성' : '반대'}`}</li>
            </ul>
        ))}
        <button onClick={() => VotePage}>다음</button>
    </div>
)