import React, {useContext, useState} from "react";
import {GameContext} from "../Store";

function Vote(props) {
    const game = useContext(GameContext)
    const [vote, setVote] = useState('agree');
    const [click, setClick] = useState(false);
    const onChange = e => {
        setVote(e.target.value);
    };

    const onClick = e => {
        if (e.target.value === 'agree') {
            setVote('agree')
        } else if (e.target.value === 'oppose') {
            setVote('oppose')
        }
        const usingPlayers = game.gameState.usingPlayers
        usingPlayers[props.index].toGo = vote
        game.gameState.usingPlayers = usingPlayers
        setClick(true);
    };
    return (
        <div>
            {click ?
                <div>{vote === 'agree' ? '찬성' : '반대'}</div> :
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
                        disabled={click}
                        value={vote}>
                        확인
                    </button>
                </div>
            }
        </div>
    )
}

export default Vote