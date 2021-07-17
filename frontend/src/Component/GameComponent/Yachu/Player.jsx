import React, { Fragment, useState, useEffect, useContext, useReducer, memo } from "react";
import { PlayerData } from "Container/GameContainer/Yacht/YatchStore";

const Player=()=>{
    const state=useContext(PlayerData);
    const myName = localStorage.getItem('nickname');
    function select(e){
        if (state.halt === true) {
            const { name, value } = e.target;
            state.selectData(name,value)
        }else{
            alert("니턴 아님")
        }
    }
    return(
        <PlayerData.Consumer>
            {({state,nowTurn})=>(
                <Fragment>
                    {Object.keys(state.playerData).map((i,index)=>(
                      <div key={index}>
                        {Object.keys(state.playerData[i].selectPoint).map((j, dex) => (
                            <div key={dex}>
                                {nowTurn==i ? 
                                    (<div>
                                        { dex === 5 ?
                                            (<div>
                                                {j}:
                                                < button
                                                    disabled={state.playerData[i].selectPoint[j][1]}
                                                    name={j}
                                                    onClick={select}
                                                    value={state.playerData[i].selectPoint[j][0]}
                                                >{state.playerData[i].selectPoint[j][0]}</button>
                                                <div>bonus : {state.playerData[i].bonus[0]} </div>
                                            </div>
                                            )
                                            :
                                            (<div>
                                                {j}:
                                                < button
                                                    disabled={state.playerData[i].selectPoint[j][1]}
                                                    name={j}
                                                    onClick={select}
                                                    value={state.playerData[i].selectPoint[j][0]}
                                                >{state.playerData[i].selectPoint[j][0]}</button></div>)}</div>)
                                :
                                    (<div>{ dex === 5 ?
                                        (<div>
                                            {j}:
                                            < div>{state.playerData[i].selectPoint[j][0]}</div>
                                            <div>bonus : {state.playerData[i].bonus[0]} </div>
                                        </div>
                                        )
                                        :
                                        (<div>
                                            {j}:
                                            < div>{state.playerData[i].selectPoint[j][0]}</div></div>)}</div>)}
                                </div>
                        ))}
                            result : {state.playerData[i].result}
                      </div> 
                    ))}
                </Fragment>
            )}
        </PlayerData.Consumer>
    )
}
export default Player;