import React, {useContext} from "react";
import {GameContext} from "../Store";
import styled from "styled-components";
import Card_Flip from "./animation/Card_Flip";


const Box = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content : flex-start;
    flex-direction: row;
    margin : 200px 30px 30px 100px;
    
`;

function END_GAME_FRAME() {
    const {gameState} = useContext(GameContext);
    return (
        <div>
            <h1>{gameState.winner}</h1>
            <Box>
                {gameState.usingPlayers.map((player, index) => (
                    <div key={index}>
                        <br/>
                        <div>
                            <Card_Flip nickname={player.nickname} role={player.role}/>
                        </div>
                    </div>
                ))}
            </Box>
        </div>

    );
}

export default END_GAME_FRAME;
