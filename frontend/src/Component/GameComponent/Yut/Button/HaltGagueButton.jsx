import React, { useContext, useState, memo, useEffect } from 'react';

import actionHandler from 'Container/GameContainer/Yut/Action/actionHandler'
import { INIT_LAST_YUT_DATA } from 'Container/GameContainer/Yut/Constants/actionType';


const App = ({ handlerType, nickname, dispatch, state, peers, halted, name, action, buttonEvent, count, buttonStyle }) => {
    const hatledButtonStyle = {
        'borderRadius': '30px',
        'fontSize': '1.25em',
        'borderColor': 'black',
        'color': 'white',
        'backgroundColor': 'brown',
        'height': '50px',
        'width': '240px',
        'border': 'solid 3px black',
        'flexGrow': '1',
    };

    // const [trigger, setTrigger] = useState(true);

    // const onclickHandler = () => {
    //     if (handlerType !== undefined) {
    //         dispatch({ type: INIT_LAST_YUT_DATA });
    //         setTrigger(prev => !prev);
    //     }
    // }

    // useEffect(() => {
    //     actionHandler[handlerType]({ dispatch, state, peers, nickname, action, count });
    // }, [trigger])

    const onclickHandler = () => {
        if (handlerType !== undefined && !state.halted) {
            // handle 타입이 들어왔고
            // halted 값으로 현재 차례이면 아래 함수 동작
            actionHandler[handlerType]({ dispatch, state, peers, nickname, action, count });
        }
    }

    return (
        <button onMouseDown={buttonEvent.startCount} onMouseUp={buttonEvent.stopCount} onMouseLeave={buttonEvent.stopCount} style={buttonStyle} disabled={halted === true && true} onClick={onclickHandler}>
            {name}
        </button >
    )
}

export default memo(App);