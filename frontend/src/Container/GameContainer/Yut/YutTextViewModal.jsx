import React, { useContext, createContext, useState, useEffect, useReducer, memo } from "react";
import styled, { keyframes } from "styled-components";
import { YutViewContext } from 'Container/GameContainer/Yut/YutStore';
import { sumYutArrayToMatchType } from 'Container/GameContainer/Yut/Reducer/yutStoreReducerAction'
import { NUMBER_TO_MATCH_KOREA_YUT_TYPE } from "./Constants/yutGame";
import { TextModal } from "./YutStore";

const yutViewAnimation = keyframes`
	from{
		transform: scale(1.2);
		opacity:1;
	}
	30%{
		transform: scale(1);
		opacity:1;
	}
	80%{
		opacity:1;
	}
	to{
		opacity:0;
	}
`;

const StyledYutResultView = styled.div`
	position:absolute;
    left:0;
    top:0;

    width:99%;
    height:99%;

	display:flex;
	justify-content: center;
	align-items: center;

	animation:${yutViewAnimation} 1.2s linear;
	animation-fill-mode:forwards;

	z-index: 99;
    /* background-color:rgba(0, 0, 0, 0.1); */

    font-family: "Arial Black", sans-serif;
    font-size: 20vh;    
    font-weight: bold;
    color:#03fc6f;
    text-shadow: 4px 4px 0px #bdbdbd;

    // 스크롤 표시 안하게 더 해봐야함.
    overflow:hidden; // 스크롤 표시 안함
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar{
        display:none;
    }
`;


const reducer = (state, action) => {
    switch (action.type) {
        case 'SHOW_ON':
            return { ...state, show: true, text: action.text };
        case 'SHOW_OFF':
            return { ...state, show: false, text: "" };
        default:
            return state;
    }
}

const TextView = () => {
    // const { yutView } = useContext(YutViewContext);
    const { textModal, setTextModal } = useContext(TextModal);
    const [textView, dispatch] = useReducer(reducer, { show: false, text: "" })
    // const yutTypeIndex = sumYutArrayToMatchType(yutView);


    let textViewTimeoutSetting;
    const textViewShowOffHandler = () => {
        clearTimeout(textViewTimeoutSetting);
        dispatch({ type: 'SHOW_OFF' });
    }


    // useEffect(() => {
    //     dispatch({ type: 'SHOW_ON', text: NUMBER_TO_MATCH_KOREA_YUT_TYPE[yutTypeIndex] });
    //     textViewTimeoutSetting = setTimeout(() => dispatch({ type: 'SHOW_OFF' }), 1000);
    //     return (() => {
    //         textViewShowOffHandler()
    //     })
    // }, [yutView])


    useEffect(() => {
        dispatch({ type: 'SHOW_ON', text: textModal });
        textViewTimeoutSetting = setTimeout(() => dispatch({ type: 'SHOW_OFF' }), 1000);
        return (() => {
            textViewShowOffHandler()
        })
    }, [textModal])

    const onclickHandler = () => {
        textViewShowOffHandler()
    }

    return (
        <>
            {textView.show && <StyledYutResultView onClick={onclickHandler}>{textView.text}</StyledYutResultView>}
        </>
    )
}
export default TextView;