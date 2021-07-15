import React from "react";

function end() {
    return (
        <>
            <h1>{context.winner}</h1>
            <h3>ENDGAME</h3>
            <hr/>
            {context.playerData.map((player, index) => (
                <ul key={index}>
                    <p>player_nickname : <b>{player.nickname}</b></p>
                    <p>role : <b>{player.role}</b></p>
                    <hr/>
                </ul>
            ))}
        </>
    )
}