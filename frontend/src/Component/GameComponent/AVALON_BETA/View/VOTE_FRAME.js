import React, {useContext, useState} from "react";
import {GameContext} from "../Store";
import {Title} from "../Styled";
import Vote from "./Vote";
import {PeersContext} from "../../../../Routes/peerStore";
import {GAME_CHECK} from "../MVC/AVALON_Reducer";
import WaitingView from "./animation/WaitingView";

function VOTE_FRAME() {
    const {dispatch, gameState} = useContext(GameContext)
    const {peers} = useContext(PeersContext)
    const nickname = localStorage.getItem('nickname')
    const gameData = {...gameState}
    const [vote, setVote] = useState('agree');
    console.log('vote')
    const onChange = e => {
        setVote(e.target.value);
    };
    const onClick = e => {
        if (e.target.value === 'agree') {
            setVote('agree')
        } else if (e.target.value === 'oppose') {
            setVote('oppose')
        }
        gameData.usingPlayers[gameData.voteTurn].toGo = vote
        gameData.voteTurn += 1
        dispatch({type: GAME_CHECK, gameData, peers})
    };
    return (
        <>
            <div>VOTE</div>
            <div>
                {gameData.voteTurn!==gameData.usingPlayers.length&&
                    <Title>
                        {nickname === gameData.usingPlayers[gameData.voteTurn].nickname ?
                            <div>
                                <form>
                                    <label>찬성<input
                                        type="radio"
                                        name={'vote'}
                                        value={'agree'}
                                        onChange={onChange}/>
                                    </label>
                                    <label>반대 <input
                                        type="radio"
                                        name={'vote'}
                                        value={'oppose'}
                                        onChange={onChange}/>
                                    </label>
                                </form>
                                <button
                                    onClick={onClick}
                                    value={vote}>
                                    확인
                                </button>
                            </div> : <WaitingView/>
                        }
                    </Title>
                }
            </div>
        </>
    )
}

export default VOTE_FRAME