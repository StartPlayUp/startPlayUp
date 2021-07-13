import React, { Fragment, useState, useEffect, useContext, useReducer, memo } from "react";
import { PlayerData } from "Container/GameContainer/Yacht/YatchStore";

const Player=()=>{
    const playerData=useContext(PlayerData);
    console.log(playerData);
    function select(e){
        playerData.selectData(e)
    }
    return(
        <PlayerData.Consumer>
            {({playerData})=>(
                <Fragment>
                    {Object.keys(playerData).map((i,index)=>(
                      <div keys={index}>
                        {Object.keys(playerData[i].selectPoint).map((j, index) => (
                            <div keys={index}>
                                {index === 5 ?
                                 (<div>
                                    {j}:
                                        < button
                                            disabled={playerData[i].selectPoint[j][1]}
                                            name={j}
                                            onClick={select}
                                            value={playerData[i].selectPoint[j][0]}
                                        >{playerData[i].selectPoint[j][0]}</button>
                                        <div>bonus : {playerData[i].bonus[0]} </div>
                                        </div>
                                        )
                                         :
                                (<div>
                                    {j}:
                                        < button
                                            disabled={playerData[i].selectPoint[j][1]}
                                            name={j}
                                            onClick={select}
                                            value={playerData[i].selectPoint[j][0]}
                                        >{playerData[i].selectPoint[j][0]}</button></div>)}
                                
                            </div>
                        ))}
                            result : {playerData[i].result}
                      </div> 
                    ))}
                </Fragment>
            )}
        </PlayerData.Consumer>
    )
}
export default Player;