const voteOnChange = e => {
    user[e.target.value].selected = e.target.checked;
    const playerCheckedNumber = e.target.checked ? 1 : -1
    dispatch({type: "playerCheckedNumber", playerCheckedNumber})
}
const voteOnClick = () => {
    if (state.playerCheckedNumber === game.takeStage[game.expeditionStage]) {
        const voteCount = state.voteCount + 1
        const page = VOTE_FRAME
        dispatch({type: "voteCount", voteCount})
        dispatch({type: "mainFrameClick"})
        dispatch({type: "checkedReset"})
        dispatch({type: "page", page})
    } else {
        alert(`${Games.takeStage[Games.expeditionStage]}명을 선택해야합니다.`);
    }
}
export default {voteOnClick,voteOnChange}