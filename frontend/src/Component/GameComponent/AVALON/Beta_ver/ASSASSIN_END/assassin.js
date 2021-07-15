const assassinOnChange = e => {
    const killedPlayer = e.target.value
    dispatch({type: "kill", killedPlayer})
}
const killPlayer = () => {
    const page = END_GAME_FRAME
    const winner = state.killedPlayer === 'merlin' ? '악의 승리' : '선의 승리'
    dispatch({type: "winner", winner})
    dispatch({type: "page", page})
}