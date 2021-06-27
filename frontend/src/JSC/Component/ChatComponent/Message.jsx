import React, { memo } from 'react';
import styled, { css } from 'styled-components'

const MessageContainer = styled.div`
  display:flex;
  justify-content:${props => props.who !== "me" ? "flex-start" : "flex-end"};
  flex-direction: row;
  width:${props => props.width};
  height:${props => props.height};
`;
const Time = styled.div`
  color:black;
  display:flex;
  justify-content:${props => props.who === "me" ? "flex-start" : "flex-end"};
  margin-left:${props => props.me ? "0px" : "10px"};
  margin-right:${props => props.me ? "0px" : "10px"};
`;

const Messages = styled.div`
  display:flex;
  flex-direction: column;
  align-self:${props => props.who !== 'me' ? "flex-start" : "flex-end"};
  color:${props => props.who === 'me' && "white"};
  margin:10px 40px 10px 40px;
  ${(props) =>
    props.who === "another" &&
    css`
      &:before {
        border-top:10px solid rgb(228,228,228);
        border-left: 10px solid transparent;
        border-right: 0 solid transparent;
        border-bottom: 0 solid transparent;
        content:"";
        position:relative;
        top:55px;
        width:0;
      }
    `}
  
  ${(props) =>
    props.who === "me" &&
    css`
      &:before {
        border-top:10px solid rgb(54, 197, 98);
        border-left: 0 solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 0 solid transparent;
        content:"";
        width:0;
        align-self: flex-end;
        position:relative;
        top: 30px;
      }
    `}

`;
const NickName = styled.div`
    color:black;
    font-size: large; /*폰트 크기 조정 */
    padding-left:10px; /* 닉네임에 크기 조절 */
`;

const Message = styled.span`
    align-self: ${props => props.who !== "me" ? "flex-start" : "flex-end"};
    background-color:${props => props.who !== 'me' ? "rgb(228,228,228)" : "rgb(54, 197, 98)"};
    margin: 10px;
    padding: 10px;
    border-radius: 8px;
`;


function App({ chatObject, who }) {
  return (
    <>
      <MessageContainer who={who}>
        <Messages className="text" who={who}>
          {who === "me" || <NickName className="nickName">{chatObject.nickname}</NickName>}
          {chatObject.textList.map((i, index) => <Message who={who} key={"" + chatObject.nickname + index}>{i}</Message>)}
          <Time>{chatObject.chatTime.toString().slice(4, 25)}</Time>
        </Messages>
      </MessageContainer>
    </>
  );
}

export default memo(App);
