import WebHeader from '../mainPage/webHeader'
import React from 'react';

function WaitingRoom(){
    return(
        <div id="gamePage">
            {<header>{WebHeader()}</header>}
            <div id="waitingRoom">
                <div id="title">
                    <span className="gameTitle">Mafia</span>
                    <span> 선착순 8명 빠르게 구해요 ~~~ !!</span>
                </div>
                <hr/>
                <div id="options">
                    <div className="optionsLeft">
                        <button>시작</button>
                        <button>준비</button>
                        <button>관전</button>
                    </div>
                    <div className="optionsRight">
                        <button>나가기</button>
                    </div>
                </div>
                <hr/>
                <div id="list">
                    <div className="users-list">
                        <h3>userName / ready-state / kickout</h3>
                        <h3>userName / ready-state / kickout</h3>
                        <h3>userName / ready-state / kickout</h3>
                        <h3>userName / ready-state / kickout</h3>
                    </div>
                    <div className="chatting-list">
                        <h1>chatting list</h1>
                        <h1>chatting list</h1>
                        <h1>chatting list</h1>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default WaitingRoom;