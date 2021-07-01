import React, {useContext, useEffect, useState} from "react";
import {UserState, PlayState, needPlayers, mustHaveRoles, expandRoles, voteStageColor, angels} from "./gameSetting";
import {Circle, Frame, PublicFrame, Title, User, VoteStageFrame} from "./MainPage/Styled";
import shuffle from "lodash.shuffle";
import MerlinPlayer from "./Ability/MerlinPlayer";
import PercivalPlayer from "./Ability/PercivalPlayer";
import Vote from "./RepresentVote/Vote";
import AngelsVote from "./ExpeditionVote/AngelsVote";
import EvilsVote from "./ExpeditionVote/EvilsVote";

const START = 0;
const MAIN_FRAME = 1;
const VOTE = 2;
const EXPEDITION = 3;
const ASSASSIN = 4;
const END_GAME = 5;

function AVALON_TEST() {
    const user = useContext(UserState)
    const game = useContext(PlayState)
    const [mainFrameClick, setMainFrameClick] = useState(false)
    const [playerCount, setPlayerCount] = useState(0);
    const [voteCount, setVoteCount] = useState(0);
    const [voteResult, setVoteResult] = useState(false)
    const [expedition, setExpedition] = useState(false);
    const [winner, setWinner] = useState('')
    const [page, setPage] = useState(START);
    const [kill, setKill] = useState('')

    useEffect(() => {

    })
    const voteOnChange = e => {
        user[e.target.value].selected = e.target.checked;
        e.target.checked ? setPlayerCount(playerCount + 1) : setPlayerCount(playerCount - 1);
    }
    const voteOnClick = () => {
        if (playerCount === game.takeStage[game.expeditionStage]) {
            setVoteCount(voteCount + 1);
            setMainFrameClick(false);
            setPlayerCount(0)
            setPage(VOTE)
        } else {
            alert(`${game.takeStage[game.expeditionStage]}명을 선택해야합니다.`);
        }
    }
    const votePage = () => {
        let agree = 0;
        let oppose = 0;
        user.map(e => e.toGo === 'agree' ? ++agree : ++oppose)
        if (agree >= oppose) {
            game.voteStage = 0;
            setPage(EXPEDITION)
        } else {
            if (game.voteStage === 4) {
                game.takeStage[game.expeditionStage] = 'fail';
                game.expeditionStage += 1;
                game.voteStage = 0;
            } else {
                game.voteStage += 1;
            }
            setPage(MAIN_FRAME)
        }
        game.represent += 1;
        game.represent %= user.length;
        nextPage()
    }
    const nextPage = () => {
        const angelCount = game.takeStage.filter(element => 'success' === element).length;
        const evilCount = game.takeStage.filter(element => 'fail' === element).length;
        if (angelCount === 3) {
            setPage(ASSASSIN)
        }
        if (evilCount === 3) {
            setWinner('EVILS_WIN')
            setPage(END_GAME)
        }
        setExpedition(false)
        game.vote = []
    }

    const expeditionClick = () => {
        setExpedition(true)
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

    if (page === START) {
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
        const onClick = () => {
            const PlayersNumber = user.length;
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
                setPage(MAIN_FRAME)
            } else {
                alert('error')
            }
        };
        return (
            <button onClick={onClick}>게임 시작</button>
        )
    }

    if (page === MAIN_FRAME) {
        const colors = voteStageColor.slice(game.voteStage, 5);
        const clicked = () => {
            setMainFrameClick(true)
        }

        return (
            <>
                <div>Main</div>

                <PublicFrame>
                    {
                        game.takeStage.map((stage, index) => (
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
                    {!mainFrameClick ?
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
                                {index === game.represent ? <button onClick={clicked}>원정 인원 정하기</button> : null}
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
    if (page === VOTE) {
        const result = () => {
            setVoteResult(true)
        }
        return (
            <>
                <div>VOTE</div>
                {!voteResult ?
                    <div>
                        <Title>
                            {user.map((user, index) => <Vote key={index} index={index}/>)}
                        </Title>
                        <button onClick={result}>결과</button>
                    </div> :
                    <div>
                        {user.map((user, index) => (
                            <ul key={index}>
                                <li>{`nickname : ${user.nickname}`}</li>
                                <li>{`vote : ${user.toGo === 'agree' ? '찬성' : '반대'}`}</li>
                            </ul>
                        ))}
                        <button onClick={() => ((votePage)(setVoteResult(false)))}>다음</button>
                    </div>
                }
            </>
        )
    }

    if (page === EXPEDITION) {

        return (
            <>
                {!expedition ?
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
                        </div>
                        <button onClick={() => ((nextPage)(setPage(MAIN_FRAME)))}>다음</button>
                    </div>
                }
            </>
        )
    }

    if (page === ASSASSIN) {
        const onChange = e => {
            setKill(e.target.value)
        }
        const killPlayer = () => {
            const win = kill === 'merlin' ? '악의 승리' : '선의 승리'
            setWinner(win)
            setPage(END_GAME)
        }
        return (
            <>
                <h3>ASSASSIN</h3>
                {user.map((user, index) => (
                    <label key={index}>
                        {user.nickname}
                        <input type="radio"
                               name={'vote'}
                               value={user.role}
                               onChange={onChange}
                        />
                        <br/>
                    </label>
                ))}
                <button onClick={killPlayer}>kill</button>
            </>
        )
    }

    if (page === END_GAME) {
        return (
            <>
                <h1>{winner}</h1>
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