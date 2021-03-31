import React from 'react';
import styled from "styled-components";
import emoticon from "../../icon/emoticon.svg";
import paperclip from "../../icon/paperclip.svg";
import voicetalk from "../../icon/voicetalk.svg";
import calendar from "../../icon/calendar.svg";


const Img = styled.img`
  
`;
const SendChat = styled.div`
   border-top: 3px solid #ececec;
   height:75px;
   width:inherit;
   background-color: rgb(255, 255, 255);
`;

const FieldSet = styled.div`
    display:flex;
    flex-direction: row;
`;

const FieldInput = styled.input`{
    width:100%;
    height:30px;
    border:3px solid #ececec; /* <input> 태그 테두리 삭제*/
    border-radius: 30px;
    margin:5px 10px 5px 10px;
`;

const FieldSetBtn = styled.button`
    margin:10px;
    display:flex;
    align-items: center; /* 세로축 중앙 가로축 중앙 맞춤*/
    justify-content: center;
    width:60px;
    height:25px;
    overflow:hidden;
    // background-color:rgb(255, 235, 51); // 카카오톡 버튼 색
    background-color: rgb(208,208,208);
    color:white;
    border:none;
    border-radius: 30px;
    box-shadow: 0.2px 0.2px 0.1px 0.1px rgba(163, 167, 162, 0.774); /*그림자 만들기*/
    cursor:pointer;
    
`;

const SendMenuButtons = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: space-around; /*임시로 크기 정해주고 위치 맞춤*/
    align-items: center;
`;

const SendMenuButton = styled.button`
    border:0;
    outline:0;
    background-color: white;
    cursor: pointer;
`;


const sendMediaButtonList = [emoticon, paperclip, voicetalk];
const makeSendMediaButton = (mediaBtn) => {
    return (
        <SendMenuButtons className="sendMenuBtn">
            {
                mediaBtn.map((i,index) =>
                    <SendMenuButton key={mediaBtn[index]}><img src={i}/></SendMenuButton>
                )
            }
        </SendMenuButtons>
    )
};

const fieldSetBtnHandler = () =>{ // 텍스트가 들어있으면 버튼이 활성화 핸들러

};

function MyTextInput() {
    return (
        <SendChat className="sendChat">
            <form className="sendForm"  name="chat"  onSubmit={fieldSetBtnHandler}>
                <FieldSet className="fieldSet">
                    <FieldInput className="fieldInput"/>
                    <FieldSetBtn type='submit' className="fieldSetBtn">전송</FieldSetBtn>
                </FieldSet>
                <div>
                    {makeSendMediaButton(sendMediaButtonList)}
                </div>
            </form>
        </SendChat>
    );
}

export default MyTextInput;
