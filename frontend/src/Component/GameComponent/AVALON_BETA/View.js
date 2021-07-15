import React, {useContext} from "react";
import {Pages} from "./MVC/AVALON_Reducer";
import {angels, GameContext, PlayerContext, voteStageColor,} from "./Store";
import {Circle, Frame, PublicFrame, User, VoteStageFrame} from "./Styled";
import {Title} from "../../WebComponent/WebPage/Style/CreateRoomStyle";

function View() {
    const game = useContext(GameContext)
    const player = useContext(PlayerContext)
    const setPage = (props) => {
        game.setPage(props)
    }
    const gameStart = () => {
        console.log('gameStart')
        console.log(game.gameStart)
        game.gameStart()
    }
    const voteOnClick = () => {
        console.log('voteOnClick')
        game.voteOnClick()
    }
    const voteOnChange = () => {
        console.log('voteOnChange')
        game.voteOnChange()
    }
    const votePage = () => {
        console.log('votePage')
        game.votePage()
    }
    const nextPage = () => {
        console.log('nextPage')
        game.nextPage()
    }
    const expeditionClick = () => {
        console.log('expeditionClick')
        game.expeditionClick()
    }
    const killPlayer = () => {
        console.log('killPlayer')
        game.killPlayer()
    }
    const selectPlayer = () => {
        console.log('selectPlayer')
        game.selectPlayer()
    }
    if (game.page === Pages.START_FRAME) {
        return (
            <button onClick={gameStart}>게임 시작</button>
        )
    }
    if (game.page === Pages.MAIN_FRAME) {
        const colors = voteStageColor.slice(game.voteStage, 5);
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
                    {
                        game.playerData.map((user, index) => (
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
                                    <button onClick={() => setPage(Pages.MAIN_VOTE)}>원정 인원 정하기</button>
                                    : null}
                            </User>
                        ))
                    }
                </PublicFrame>
            </>
        );
    }
    if (game.page === Pages.MAIN_VOTE) {
        return (
            <div>
                <h3>{"원정에 참여하는 인원 수 : " + game.takeStage[game.expeditionStage] + "명"}</h3>
                {player.playerData.map((user, index) => (
                    <ul key={index}>
                        <label>{user.nickname}
                            <input
                                onChange={() => voteOnChange}
                                type="checkbox"
                                name={'checkbox'}
                                value={index}
                            />
                        </label>
                    </ul>
                ))}
                <button onClick={() => voteOnClick}>결정</button>
            </div>
        )
    }
    if (game.page === Pages.VOTE_FRAME) {
        return (
            <>
                <div>VOTE</div>
                <div>
                    <Title>
                        {game.playerData.map((user, index) => <Vote key={index} index={index}/>)}
                    </Title>
                    <button onClick={() => setPage(Pages.VOTE_RESULT)}>결과</button>
                </div>

            </>
        );
    }
    if (game.page === Pages.VOTE_RESULT) {
        return (
            <div>
                {game.playerData.map((user, index) => (
                    <ul key={index}>
                        <li>{`nickname : ${user.nickname}`}</li>
                        <li>{`vote : ${user.toGo === 'agree' ? '찬성' : '반대'}`}</li>
                    </ul>
                ))}
                <button onClick={() => votePage}>다음</button>
            </div>
        )
    }

    if (game.page === Pages.EXPEDITION_FRAME) {
        return (
            <>
                <div>
                    {
                        game.playerData.map((user, index) => (
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
                    <button onClick={() => expeditionClick}>결과</button>
                </div>
            </>
        );
    }
    if (game.page === Pages.EXPEDITION_RESULT) {
        return (
            <div>
                <div>
                    {
                        game.expeditionStage === 4 && game.playerData.length >= 7 ?
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
                <button onClick={() => nextPage}>다음</button>
            </div>
        )
    }
    if (game.page === Pages.ASSASSIN_FRAME) {
        return (
            <>
                <h3>ASSASSIN</h3>
                {game.playerData.map((user, index) => (
                    <label key={index}>
                        {user.nickname}
                        <input type="radio"
                               name={'vote'}
                               value={user.role}
                               onChange={() => selectPlayer}
                        />
                        <br/>
                    </label>
                ))}
                <button onClick={() => killPlayer}>kill</button>
            </>
        )
    }
    if (game.page === Pages.END_GAME_FRAME) {
        return (
            <>
                <h1>{game.winner}</h1>
                <h3>ENDGAME</h3>
                <hr/>
                {player.playerData.map((player, index) => (
                    <ul key={index}>
                        <p>player_nickname : <b>{player.nickname}</b></p>
                        <p>role : <b>{player.role}</b></p>
                        <hr/>
                    </ul>
                ))}
            </>
        )
    }
    return (
        <div>
            error
        </div>
    )
}

export default View