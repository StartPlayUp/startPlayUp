import React, {useContext} from "react";
import {SetPage} from "../AVALON_Controller";
import {voteStageColor} from "../gameSetting";
import {initContext, Pages} from "../AVALON_Reducer";
import {PublicFrame, VoteStageFrame} from "../../MainPage/Styled";
import MerlinPlayer from "../../Ability/MerlinPlayer";
import PercivalPlayer from "../../Ability/PercivalPlayer";

function Main_View() {
    const context = useContext(initContext)
    const colors = voteStageColor.slice(context.voteStage, 5);
    return (
        <>
            <div>Main</div>
            <PublicFrame>
                {
                    context.takeStage.map((stage, index) => (
                        <Frame key={index}>
                            <h3>{stage}</h3>
                        </Frame>
                    ))
                }
            </PublicFrame>
            <VoteStageFrame>
                {
                    colors.map((color, index) => (
                        <Circle color={color} key={index}/>
                    ))
                }
            </VoteStageFrame>
            <PublicFrame>
                {
                    context.playerData.map((user, index) => (
                        <User key={index}>
                            <ul>
                                <li>{`nickname : ${user.nickname}`}</li>
                                <li>{`role : ${user.role}`}</li>
                                <br/>
                                {user.role === 'Merlin' ?
                                    <MerlinPlayer index={index}/> : null
                                }
                                {user.role === 'Percival' ?
                                    <PercivalPlayer index={index}/> : null
                                }
                            </ul>
                            {index === context.represent ?
                                <button onClick={() => SetPage(Pages.MAIN_VOTE)}>원정 인원 정하기</button>
                                : null}
                        </User>
                    ))
                }
            </PublicFrame>
        </>
    );
}

export default Main_View