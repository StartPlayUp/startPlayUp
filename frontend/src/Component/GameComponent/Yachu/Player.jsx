import React, { Fragment, useState, useEffect, useContext, useReducer, memo } from "react";
import { PlayerData } from "Container/GameContainer/Yacht/YatchStore";
import styled from 'styled-components';
const Table=styled.table`
    border:2px solid;
    background-color: white;
    width:45%;
    height: 70%;
    tr{
        border-bottom:1px solid;
        text-align: center;
    }
`
const DivTr=styled.div`
    border-bottom:1px solid;
    border-right:1px solid;
    font-size: 1.7vw;
    height:4vh;
    tr,td{
        width: 100%;
        border-bottom:0px solid;
        text-align: center;
    }
`
const DivSpecial=styled.div`
    border-bottom:1px solid;
    border-right:1px solid;
    font-size: 2.3vw;
    font-weight: bold;
    height:6vh;
    tr,td{
        width: 100%;
        border-bottom:0px solid;
        text-align: center;
    }
`
const Button=styled.button`
    background-color: white;
    font-size: 1.4vw;
    height:4.3vh;
`
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
                    <Table>
                        <thead>
                            <tr>
                                <th>점수표</th>
                                {Object.keys(state.playerData).map((i, index) => (<th keys={index}>{state.playerData[i].nickname}</th>))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    {Object.keys(state.playerData[0].selectPoint).map((j, dex) => (
                                        <div key={dex}>
                                            {dex === 5 ? <div><DivTr><tr><td>{j}</td></tr></DivTr><DivSpecial><tr><td>bonus</td></tr></DivSpecial></div> : <DivTr>{j}</DivTr>}
                                        </div>
                                    ))}
                                    <DivSpecial><td>result</td></DivSpecial>
                                </td>
                                {Object.keys(state.playerData).map((i, index) => (
                                    <td key={index}>
                                        {Object.keys(state.playerData[i].selectPoint).map((j, dex) => (
                                            <div key={dex}>
                                                {nowTurn == i ?
                                                    (<div>
                                                        {dex === 5 ?
                                                            (<div>
                                                                <Button
                                                                    disabled={state.playerData[i].selectPoint[j][1]}
                                                                    name={j}
                                                                    onClick={select}
                                                                    value={state.playerData[i].selectPoint[j][0]}
                                                                >{state.playerData[i].selectPoint[j][0]}</Button>
                                                                <div>{state.playerData[i].bonus[0]} </div>
                                                            </div>
                                                            )
                                                            :
                                                            (<td>
                                                                <Button
                                                                    disabled={state.playerData[i].selectPoint[j][1]}
                                                                    name={j}
                                                                    onClick={select}
                                                                    value={state.playerData[i].selectPoint[j][0]}
                                                                >{state.playerData[i].selectPoint[j][0]}</Button></td>)}</div>)
                                                    :
                                                    (<div>{dex === 5 ?
                                                        (<td>
                                                            {state.playerData[i].selectPoint[j][0]}
                                                            <div>{state.playerData[i].bonus[0]} </div>
                                                        </td>
                                                        )
                                                        :
                                                        (<div>
                                                            {state.playerData[i].selectPoint[j][0]}</div>)}</div>)}
                                            </div>
                                        ))}
                                        <tr>
                                            <td>{state.playerData[i].result}</td>
                                        </tr>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </Table>
                </Fragment>
            )}
        </PlayerData.Consumer>
    )
}
export default Player;

/*
<Table>
                    <thead>
                        <tr>
                            <th>점수표</th>
                            {Object.keys(state.playerData).map((i, index) => (<th keys={index}>{index}</th>))}
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            {Object.keys(state.playerData[0].selectPoint).map((j, dex) => (
                                <div key={dex}>
                                    {dex === 5 ? <div><tr><td>{j}</td></tr><td>bonus</td></div> : <div>{j}</div>}
                                </div>
                            ))}
                            <td>result</td>
                        </td>
                        {Object.keys(state.playerData).map((i, index) => (
                            <td key={index}>
                                {Object.keys(state.playerData[i].selectPoint).map((j, dex) => (
                                    <div key={dex}>
                                        {nowTurn == i ?
                                            (<div>
                                                {dex === 5 ?
                                                    (<div>
                                                        <button
                                                            disabled={state.playerData[i].selectPoint[j][1]}
                                                            name={j}
                                                            onClick={select}
                                                            value={state.playerData[i].selectPoint[j][0]}
                                                        >{state.playerData[i].selectPoint[j][0]}</button>
                                                        <div>{state.playerData[i].bonus[0]} </div>
                                                    </div>
                                                    )
                                                    :
                                                    (<td>
                                                        <button
                                                            disabled={state.playerData[i].selectPoint[j][1]}
                                                            name={j}
                                                            onClick={select}
                                                            value={state.playerData[i].selectPoint[j][0]}
                                                        >{state.playerData[i].selectPoint[j][0]}</button></td>)}</div>)
                                            :
                                            (<div>{dex === 5 ?
                                                (<td>
                                                    {state.playerData[i].selectPoint[j][0]}
                                                    <div>{state.playerData[i].bonus[0]} </div>
                                                </td>
                                                )
                                                :
                                                (<div>
                                                    {state.playerData[i].selectPoint[j][0]}</div>)}</div>)}
                                    </div>
                                ))}
                                <tr>

                                    <td>{state.playerData[i].result}</td>
                                </tr>
                            </td>

                        ))}
                        </tr>
                    </tbody>
                    </Table>
*/