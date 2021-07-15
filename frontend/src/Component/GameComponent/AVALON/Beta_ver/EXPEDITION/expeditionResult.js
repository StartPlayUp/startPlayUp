import {NextPage} from "../MVC/AVALON_Controller";
import React from "react";

function expeditionResult() {
    return (
        <div>
            <div>
                {
                    context.expeditionStage === 4 && context.playerData.length >= 7 ?
                        <div>
                            {context.vote.filter(element => 'fail' === element).length >= 2 ? '원정 실패' : '원정 성공'}
                            <div>성공 개수 : {context.vote.filter(element => 'success' === element).length}</div>
                            <div>실패 개수 :{context.vote.filter(element => 'fail' === element).length}</div>
                        </div> :
                        <div>
                            {context.vote.includes('fail') ? '원정 실패' : '원정 성공'}
                            <div>성공 개수 : {context.vote.filter(element => 'success' === element).length}</div>
                            <div>실패 개수 :{context.vote.filter(element => 'fail' === element).length}</div>
                        </div>
                }
            </div>
            <button onClick={() => NextPage}>다음</button>
        </div>
    )
}
