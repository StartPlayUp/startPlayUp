// import React, {useContext, useState} from "react";
// import {GameContext} from "../Store";
// import {GAME_CHECK, SET_COMPONENT, VOTE_ONCLICK} from "../MVC/AVALON_Reducer";
// import {PeersContext} from "../../../../Routes/peerStore";
// function Vote(props) {
//     const {dispatch, gameState} = useContext(GameContext)
//     const {peers} = useContext(PeersContext)
//     const gameData = {...gameState}
//     const [vote, setVote] = useState('agree');
//     const [click, setClick] = useState(false);
//     console.log('vote')
//     const onChange = e => {
//         setVote(e.target.value);
//     };
//     const onClick = e => {
//         if (e.target.value === 'agree') {
//             setVote('agree')
//         } else if (e.target.value === 'oppose') {
//             setVote('oppose')
//         }
//         gameData.usingPlayers[props.index].toGo = vote
//         gameData.voteTurn += 1
//         setClick(true);
//         dispatch({type: GAME_CHECK, gameData, peers})
//     };
//     return (
//         <div>
//             {click ?
//                 <div>{vote === 'agree' ? '찬성' : '반대'}</div> :
//                 <div>
//                     <form>
//                         <label>찬성<input
//                             type="radio"
//                             name={'vote'}
//                             value={'agree'}
//                             onChange={onChange}/>
//                         </label>
//                         <label>반대 <input
//                             type="radio"
//                             name={'vote'}
//                             value={'oppose'}
//                             onChange={onChange}/>
//                         </label>
//                     </form>
//                     <button
//                         onClick={onClick}
//                         disabled={click}
//                         value={vote}>
//                         확인
//                     </button>
//                 </div>
//             }
//         </div>
//     )
// }
//
// export default Vote