import {SetPage} from "../MVC/AVALON_Controller";
import React from "react";

return (
    <>
        <div>VOTE</div>
        <div>
            <Title>
                {context.playerData.map((user, index) => <Vote key={index} index={index}/>)}
            </Title>
            <button onClick={() => SetPage(Pages.VOTE_RESULT)}>결과</button>
        </div>

    </>
);