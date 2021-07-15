const expeditionClick = () => {
    const expedition = true
    dispatch({type: "expedition", expedition})
    if (game.expeditionStage === 4 && user.length >= 7) {
        if (game.vote.filter(element => 'fail' === element).length >= 2) {
            game.takeStage[game.expeditionStage] = 'fail';
        } else {
            game.takeStage[game.expeditionStage] = 'success'
        }
    } else {
        game.vote.includes('fail') ?
            game.takeStage[game.expeditionStage] = 'fail' :
            game.takeStage[game.expeditionStage] = 'success'
    }
    game.expeditionStage += 1;
}