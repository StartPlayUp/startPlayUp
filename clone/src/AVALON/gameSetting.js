import React, {createContext, useContext} from "react";
import shuffle from 'lodash.shuffle';


export const angels = ['Merlin', 'Percival', 'Citizen'];
export const evils = ['Morgana', 'Assassin', 'Heresy', 'Modred'];
export const merlinSight = ['Morgana', 'Assassin', 'Heresy'];
export const percivalSight = ['Morgana', 'Merlin'];

export const needPlayers = {
    _5P: [2, 3, 2, 3, 3],
    _6P: [2, 3, 4, 3, 4],
    _7P: [2, 3, 3, 4, 4],
    _8to10P: [3, 4, 4, 5, 5],
}
export const voteStageColor = ['white', 'white', 'white', 'white', 'red'];

const Background = {
    voteStage: 0,
    expeditionStage: 0,
    represent: 0,
    vote: [],
    takeStage: [],
}

const Players = [
    {nickname: 'user1', role: '', vote: '', toGo: '', selected: false},
    {nickname: 'user2', role: '', vote: '', toGo: '', selected: false},
    {nickname: 'user3', role: '', vote: '', toGo: '', selected: false},
    {nickname: 'user4', role: '', vote: '', toGo: '', selected: false},
    {nickname: 'user5', role: '', vote: '', toGo: '', selected: false},
    // {nickname: 'user6', role: '', vote: '', toGo: '',selected : false},
    // {nickname: 'user7', role: '', vote: '', toGo: '',selected : false},
    // {nickname: 'user8', role: '', vote: '', toGo: '',selected : false},
    // {nickname: 'user9', role: '', vote: '', toGo: '',selected : false},
]

const mustHaveRoles = ['Merlin', 'Percival', 'Citizen', 'Morgana', 'Assassin'];
const expandRoles = ['Citizen', 'Heresy', 'Citizen', 'Modred', 'Citizen'];
export const PlayState = createContext(Background);
export const UserState = createContext(Players);

function GameSetting({history}) {
    const gameState = useContext(PlayState)
    const userState = useContext(UserState)

    switch (userState.length) {
        case 5 :
            gameState.takeStage = needPlayers._5P;
            break;
        case 6:
            gameState.takeStage = needPlayers._6P;
            break;
        case 7:
            gameState.takeStage = needPlayers._7P;
            break;
        case 8:
        case 9:
        case 10:
            gameState.takeStage = needPlayers._8to10P;
            break;
        default:
            alert('error');
    }
    const onClick = () => {
        const PlayersNumber = userState.length;
        if (PlayersNumber >= 5) {
            const temp = [
                ...mustHaveRoles,
                ...expandRoles.slice(0, PlayersNumber - 5),
            ];
            const roles = shuffle(temp);
            // eslint-disable-next-line array-callback-return
            userState.map((user, index) => {
                user.role = roles[index];
            });
            history.push({
                pathname: '/avalon/main'
            })
        } else {
            alert('error')
        }
    };
    return (
        <button onClick={onClick}>게임 시작</button>
    )
}

export default GameSetting;