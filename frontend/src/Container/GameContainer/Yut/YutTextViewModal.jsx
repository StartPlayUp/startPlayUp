import React, { useContext, createContext, useState, useEffect, useReducer, memo, useMemo, Children, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { YutViewContext } from 'Container/GameContainer/Yut/YutStore';
import { NUMBER_TO_MATCH_KOREA_YUT_TYPE } from "./Constants/yutGame";
// import { TextModal } from "./YutStore";


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

const delayAnimation = keyframes`
    from{
        opacity:0;
        background-color:rgba(0, 0, 0, 0.1);
    }
    99%{
        opacity:0;
    }
    to{
        opacity:0;
        background-color:rgba(0, 0, 0, 0.1);
    }
`;

const StyledDivYutText = styled.div`
    animation: ${yutViewAnimation} 2s linear;
    animation-delay: 1s;
    animation-fill-mode: forwards;
    font-family: "Arial Black", sans-serif;
    font-size: 20vh;
    font-weight: bold;
    color:#03fc6f;
    text-shadow: 4px 4px 0px #bdbdbd;
`;

const StyledDivYutModal = styled.div`
	position:absolute;
    left:0;
    top:0;

    display: flex;
    justify-content: center;
    align-items: center;

    width:100%;
    height:100%;

    animation:${delayAnimation} 1s linear;
	z-index: 99;
    background-color:rgba(0, 0, 0, 0.1);


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

export const TextModal = createContext('');

const TextView = ({ children }) => {
    const [textModal, setTextModal] = useState("");
    const textViewTimeoutSetting = useRef(null);
    const [textView, dispatch] = useReducer(reducer, { show: false, text: "" })
    const [forceUpdate, setForceUpdate] = useState(0);

    // let textViewTimeoutSetting;
    const textViewShowOff = async () => {
        dispatch({ type: 'SHOW_OFF' });
        clearTimeout(textViewTimeoutSetting.current);
        textViewTimeoutSetting.current = null;
    }

    const onclickHandler = () => {
        textViewShowOff()
    }

    const textModalValue = useMemo(() => (
        {
            textModal, setTextModal, setTextModalHandler: (text) => {
                textViewShowOff();
                setForceUpdate(prev => prev + 1);
                dispatch({ type: 'SHOW_ON', text: text });
                textViewTimeoutSetting.current = setTimeout(() =>
                    textViewShowOff(), 3200
                );
            }
        }
    ), [textModal]);

    return (
        <>
            {textView.show && <StyledDivYutModal onClick={onclickHandler}>
                <StyledDivYutText key={forceUpdate}>
                    {textView.text}
                </StyledDivYutText>
            </StyledDivYutModal>}
            <TextModal.Provider value={textModalValue}>
                {children}
            </TextModal.Provider>
        </>
    )
}
export default TextView;