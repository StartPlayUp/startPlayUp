import React, { useContext, useState, useEffect, useReducer, memo } from "react";
import styled, { keyframes } from "styled-components";
import { YutViewContext } from 'Container/GameContainer/Yut/YutStore';
import { sumYutArrayToMatchType } from 'Container/GameContainer/Yut/Reducer/yutStoreReducerAction'
import { NUMBER_TO_MATCH_KOREA_YUT_TYPE } from "./Constants/yutGame";

const yutViewAnimation = keyframes`
	from{
		transform: scale(2);
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
	display:flex;
	justify-content: center;
	align-items: center;
	width:99%;
    height:99%;
    left:0;
    top:0;
	animation:${yutViewAnimation} 1.2s linear;
	animation-fill-mode:forwards;
	z-index: 99;
	font-size: 50vh;
	color:black;
    background-color:rgba(0, 0, 0, 0.5);

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

const YutTextView = () => {
    const { yutView } = useContext(YutViewContext);
    const [yutTextView, dispatch] = useReducer(reducer, { show: false, text: "" })
    const yutTypeIndex = sumYutArrayToMatchType(yutView);
    let yutTextViewTimeoutSetting;
    const setShowOffFunction = () => {
        clearTimeout(yutTextViewTimeoutSetting);
        dispatch({ type: 'SHOW_OFF' });
    }


    useEffect(() => {
        dispatch({ type: 'SHOW_ON', text: NUMBER_TO_MATCH_KOREA_YUT_TYPE[yutTypeIndex] });
        yutTextViewTimeoutSetting = setTimeout(() => dispatch({ type: 'SHOW_OFF' }), 1000);
        return (() => {
            setShowOffFunction()
        })
    }, [yutView])

    const onclickHandler = () => {
        setShowOffFunction()
    }

    return (
        <>
            {yutTextView.show && <StyledYutResultView onClick={onclickHandler}>{yutTextView.text}</StyledYutResultView>}
        </>
    )
}
export default memo(YutTextView);