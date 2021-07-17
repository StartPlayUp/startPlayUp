import React, { Fragment, useState, useEffect, useContext } from "react";
import { TimerData } from 'Container/GameContainer/Yacht/YatchStore';
const Timer=()=>{
    return (
        <TimerData.Consumer>
            {({minutes,seconds})=>(
                <Fragment>
                    <div>남은 시간 {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>
                </Fragment>
            )}
        </TimerData.Consumer>
    )
}
export default Timer;
