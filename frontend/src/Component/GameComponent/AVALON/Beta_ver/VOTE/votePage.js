const votePage = () => {
    let agree = 0;
    let oppose = 0;
    user.map(e => e.toGo === 'agree' ? ++agree : ++oppose)
    if (agree >= oppose) {
        const page = EXPEDITION_FRAME
        game.voteStage = 0;
        dispatch({type: "page", page})
    } else {
        const page = MAIN_FRAME
        if (game.voteStage === 4) {
            game.takeStage[game.expeditionStage] = 'fail';
            game.expeditionStage += 1;
            game.voteStage = 0;
        } else {
            game.voteStage += 1;
        }
        dispatch({type: "page", page})
    }
    game.represent += 1;
    game.represent %= user.length;
    nextPage()
}
const nextPage = () => {
    const expedition = false
    const angelCount = game.takeStage.filter(element => 'success' === element).length;
    const evilCount = game.takeStage.filter(element => 'fail' === element).length;
    if (angelCount === 3) {
        const page = ASSASSIN_FRAME
        dispatch({type: "page", page})
    }
    if (evilCount === 3) {
        const page = END_GAME_FRAME
        const winner = 'EVILS_WIN'
        dispatch({type: "winner", winner})
        dispatch({type: "page", page})
    }
    dispatch({type: "expedition", expedition})
    game.vote = []
}