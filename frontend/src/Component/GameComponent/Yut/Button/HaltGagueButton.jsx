import React, { useContext, useState, memo, useEffect } from 'react';

import actionHandler from 'Container/GameContainer/Yut/Action/actionHandler'
import { INIT_LAST_YUT_DATA } from 'Container/GameContainer/Yut/Constants/actionType';


const App = ({ handlerType, nickname, dispatch, state, peers, halted, name, action, buttonEvent, count }) => {
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

    // const onclickHandler = () => {
    //     if (handlerType !== undefined) {
    //         dispatch({ type: INIT_LAST_YUT_DATA });
    //         actionHandler[handlerType]({ dispatch, state, peers, nickname, action, count });
    //     }
    // }

    const [trigger, setTrigger] = useState(true);

    const onclickHandler = () => {
        if (handlerType !== undefined) {
            dispatch({ type: INIT_LAST_YUT_DATA });
            setTrigger(prev => !prev);
        }
    }

    useEffect(() => {
        actionHandler[handlerType]({ dispatch, state, peers, nickname, action, count });
    }, [trigger])


    return (
        <button onMouseDown={buttonEvent.startCount} onMouseUp={buttonEvent.stopCount} onMouseLeave={buttonEvent.stopCount} style={hatledButtonStyle} disabled={halted === true && true} onClick={onclickHandler}>
            {name}
        </button >
    )
}

export default memo(App);