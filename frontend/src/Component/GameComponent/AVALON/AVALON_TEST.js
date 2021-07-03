import React, {useContext , useReducer} from "react";
import {
    needPlayers,
    mustHaveRoles,
    expandRoles,
    angels,
    PlayerContext, GameContext
} from "./gameSetting";
import {PublicFrame, Title, User} from "./MainPage/Styled";
import shuffle from "lodash.shuffle";
import MerlinPlayer from "./Ability/MerlinPlayer";
import PercivalPlayer from "./Ability/PercivalPlayer";
import Vote from "./RepresentVote/Vote";
import AngelsVote from "./ExpeditionVote/AngelsVote";
import EvilsVote from "./ExpeditionVote/EvilsVote";
import TakeStage from "./gamePage/mainView/TakeStage";
import VoteStage from "./MainPage/VoteStage";

const START_FRAME = 0;
const MAIN_FRAME = 1;
const VOTE_FRAME = 2;
const EXPEDITION_FRAME = 3;
const ASSASSIN_FRAME = 4;
const END_GAME_FRAME = 5;

const initialState = {
    mainFrameClick: false,
    playerCheckedNumber: 0,
    voteCount: 0,
    voteResult: false,
    expedition: false,
    winner: '',
    page: START_FRAME,
    kill: '',
}

export const reducer = (state, action) => {
    console.log(state)
    switch (action.type) {
        case "mainFrameClick":
            return {...state, mainFrameClick: action.mainFrameClick}
        case "playerCheckedNumber" :
            return {...state, playerCheckedNumber: state.playerCheckedNumber + action.playerCheckedNumber}
        case "checkedReset":
            return {...state, playerCheckedNumber: 0}
        case "voteCount":
            return {...state, voteCount: action.voteCount}
        case "voteResult":
            return {...state, voteResult: action.voteResult}
        case "expedition":
            return {...state, expedition: action.expedition}
        case "winner":
            return {...state, winner: action.winner}
        case "page":
            return {...state, page: action.page}
        case "kill":
            return {...state, kill: action.killedPlayer}
        default :
            return state
    }
}

function AVALON_TEST() {
    const user = useContext(PlayerContext)
    const game = useContext(GameContext)
    const [state, dispatch] = useReducer(reducer, initialState)

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
            alert(`${game.takeStage[game.expeditionStage]}명을 선택해야합니다.`);
        }
    }
    const mainFrameClicked = () => {
        const mainFrameClick = true
        dispatch({type: "mainFrameClick", mainFrameClick})
    }
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
            user.map((user, index) => {
                user.role = roles[index];
            });
            dispatch({type: "page", page})
            console.log(state.page)
        } else {
            alert('error')
        }
    };
    if (state.page === START_FRAME) {
        return (
            <button onClick={gameStart}>게임 시작</button>
        )
    }
    if (state.page === MAIN_FRAME) {
        return (
            <>
                <div>Main</div>
                <TakeStage/>
                <VoteStage/>
                <PublicFrame>
                    {!state.mainFrameClick ?
                        user.map((user, index) => (
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
                                {index === game.represent ?
                                    <button onClick={mainFrameClicked}>원정 인원 정하기</button> : null}
                            </User>
                        )) :
                        <div>
                            {user.map((user, index) => (
                                <ul key={index}>
                                    <label>{user.nickname}
                                        <input
                                            onChange={voteOnChange}
                                            type="checkbox"
                                            name={'checkbox'}
                                            value={index}/>
                                    </label>
                                </ul>
                            ))}
                            <button onClick={voteOnClick}>결정</button>
                        </div>
                    }
                </PublicFrame>
            </>
        );
    }
    if (state.page === VOTE_FRAME) {
        let voteResult = true
        return (
            <div>
                <div>VOTE</div>
                {!state.voteResult ?
                    <div>
                        <Title>
                            {user.map((user, index) => <Vote key={index} index={index}/>)}
                        </Title>
                        <button onClick={() => dispatch({type: "voteResult", voteResult})}>결과</button>
                    </div> :
                    <div>
                        {voteResult = false}
                        {
                            user.map((user, index) => (
                                <ul key={index}>
                                    <li>{`nickname : ${user.nickname}`}</li>
                                    <li>{`vote : ${user.toGo === 'agree' ? '찬성' : '반대'}`}</li>
                                </ul>
                            ))}
                        <button onClick={() => ((votePage)(dispatch({type: "voteResult", voteResult})))}>다음</button>
                    </div>
                }
            </div>
        )
    }
    if (state.page === EXPEDITION_FRAME) {
        const page = MAIN_FRAME
        return (
            <>
                {!state.expedition ?
                    <div>
                        {
                            user.map((user, index) => (
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
                        <button onClick={expeditionClick}>Click</button>
                    </div> :
                    <div>
                        {
                            game.expeditionStage === 4 && user.length >= 7 ?
                                <div>
                                    {game.vote.filter(element => 'fail' === element).length >= 2 ? '원정 실패' : '원정 성공'}
                                    <div>성공 개수 : {game.vote.filter(element => 'success' === element).length}</div>
                                    <div>실패 개수 :{game.vote.filter(element => 'fail' === element).length}</div>
                                </div> :
                                <div>
                                    {game.vote.includes('fail') ? '원정 실패' : '원정 성공'}
                                    <div>성공 개수 : {game.vote.filter(element => 'success' === element).length}</div>
                                    <div>실패 개수 :{game.vote.filter(element => 'fail' === element).length}</div>
                                </div>
                        }
                        <button onClick={() => ((nextPage)(dispatch({type: "page", page})))}>다음</button>
                    </div>
                }
            </>
        )
    }
    if (state.page === ASSASSIN_FRAME) {
        return (
            <>
                <h3>ASSASSIN</h3>
                {user.map((user, index) => (
                    <label key={index}>
                        {user.nickname}
                        <input type="radio"
                               name={'vote'}
                               value={user.role}
                               onChange={assassinOnChange}
                        />
                        <br/>
                    </label>
                ))}
                <button onClick={killPlayer}>kill</button>
            </>
        )
    }
    if (state.page === END_GAME_FRAME) {
        return (
            <>
                <h1>{state.winner}</h1>
                <h3>ENDGAME</h3>
                <hr/>
                {user.map((player, index) => (
                    <ul key={index}>
                        <p>player_nickname : <b>{player.nickname}</b></p>
                        <p>role : <b>{player.role}</b></p>
                        <hr/>
                    </ul>
                ))}
            </>
        )
    }
}

export default AVALON_TEST