import shuffle from "lodash.shuffle";
import {expandRoles, mustHaveRoles, needPlayers} from "./gameSetting";

const gameStart = () => {
    const PlayersNumber = user.length;
    const page = MAIN_FRAME
    switch (user.length) {
        case 5 :
            game.takeStage = needPlayers._5P;
            break;
        case 6:
            game.takeStage = needPlayers._6P;
            break;
        case 7:
            game.takeStage = needPlayers._7P;
            break;
        case 8:
        case 9:
        case 10:
            game.takeStage = needPlayers._8to10P;
            break;
        default:
            alert('error');
    }
    if (PlayersNumber >= 5) {
        const temp = [
            ...mustHaveRoles,
            ...expandRoles.slice(0, PlayersNumber - 5),
        ];
        const roles = shuffle(temp);
        // eslint-disable-next-line array-callback-return
        user.map((Player, index) => {
            Player.role = roles[index];
        });
        dispatch({type: "page", page})
        console.log(state.page)
    } else {
        alert('error')
    }
};