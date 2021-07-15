import {ExpeditionClick} from "../MVC/AVALON_Controller";
import React from "react";

function expeditionFrame() {
    return (
        <>
            <div>
                {
                    context.playerData.map((user, index) => (
                        <ul key={index}>
                            {user.selected ?
                                <div>
                                    <li>{user.nickname}</li>
                                    {angels.includes(user.role) ?
                                        <AngelsVote value={index}/>
                                        :
                                        <EvilsVote value={index}/>}
                                </div>
                                : null}
                            {user.selected = false}
                        </ul>
                    ))
                }
                <button onClick={() => ExpeditionClick}>결과</button>
            </div>
        </>
    );
}
