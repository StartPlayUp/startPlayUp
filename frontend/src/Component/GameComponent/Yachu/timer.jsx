import React, { Fragment, useState, useEffect, useContext } from "react";
import { TimerData } from 'Container/GameContainer/Yacht/YatchStore';
import styled from 'styled-components';
const Time_remaining = styled.div`
    position: absolute;
    font-size: 1.6vw;
    right:1%;
    top:58%;
`
const Timer=()=>{
    const [minutes, setMinutes]=useState(3);
    const [seconds,setSeconds]=useState(0);
    const state=useContext(TimerData)
    useEffect(() => {
        const countdown = setInterval(() => {
            if (parseInt(seconds) > 0) {
                setSeconds(parseInt(seconds) - 1);
            }
            else if (parseInt(seconds) === 0) {
                if (parseInt(minutes) === 0) {
                    state.timeOver()
                } else {
                    setMinutes(parseInt(minutes) - 1);
                    setSeconds(59);
                }
            }
        }, 1000);
        return () => clearInterval(countdown);
    }, [minutes, seconds]);
    useEffect(() => {
        setMinutes(3)
        setSeconds(0)
    }, [state.nowTurn])
    return (
        <TimerData.Consumer>
            {({})=>(
                <Fragment>
                        <Time_remaining>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</Time_remaining>
                </Fragment>
            )}
        </TimerData.Consumer>
    )
}
export default Timer;
