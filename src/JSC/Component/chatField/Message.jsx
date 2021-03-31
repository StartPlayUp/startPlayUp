import React from 'react';
import styled, {css} from 'styled-components'

const MessageContainer = styled.div`
  display:flex;
  justify-content:${props => props.who !== "me" ? "flex-start" : "flex-end"};
  flex-direction: row;
  width:${props => props.width};
  height:${props => props.height};
`;
const Time = styled.div`
  padding-left:${props => props.who === "me" || "20px"};
  padding-right:${props => props.who === "me" || "20px"};
  margin-left:${props => props.me ? "0px" : "20px"};
  margin-right:${props => props.me ? "0px" : "20px"};
`;

const Messages = styled.div`
  display:flex;
  flex-direction: column;
  align-self:${props => props.who !== 'me' ? "flex-start" : "flex-end"};
  color:${props=> props.who === 'me' && "white"};
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
        bottom:-45px;
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
        top: 45px;
      }
    `}

`;
const NickName = styled.div`
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


function App({chat, who}) {
    const date = new Date(chat.chatTime).toString().slice(4, 25);
    return (
        <MessageContainer who={who}>
            <Messages className="text" who={who}>
                <NickName className="nickName">{chat.nickname}</NickName>
                {chat.chatList.map((i, index) => <Message who={who} key={(chat + index)}>{i}</Message>)}
                <Time>{date}</Time>
            </Messages>
        </MessageContainer>
    );
}

export default App;
