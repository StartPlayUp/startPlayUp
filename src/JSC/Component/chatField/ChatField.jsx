import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import Message from './Message'

const TextField = styled.div`
  display:flex;
  padding:10px;
  border: rgb(0, 0, 0);
  flex-direction: column;
  overflow-y: scroll;
  width:auto;
  height:inherit;
  background-color: white;
    &::-webkit-scrollbar{
      width: 100%;
      background-color: black;
    }
`;

const chatPushText = (chatList, setChatList) => {
    const cLst = [...chatList];
    cLst.push({
        nickname: "jsc",
        chatList: ["반가워요 123님", "반가워요 123님", "반가워요 123님"], //
        chatTime: 1616869879094
    });

    cLst.push({
        nickname: "jsc",
        chatList: ["반가워요 123님", "반가워요 123님asdf"], //
        chatTime: 1616870179095 //Sun Mar 28 2021 03:31:19 GMT+0900 (대한민국 표준시)
        // new Date 객체의 getTime() 함수로 받은 정수 값이며 이거 기준으로 300,000(5분) 차이가 날 경우 새로운 문자로 본다.
        // 같은사람이 300,000 안에 다시 문자를 보냈을 경우 같은 사람 이라고 본다.
    });
    cLst.push({
        nickname: "JangSeokChan",
        chatList: ["반가워요 123님dfsadf123님dfsadfasfdaafdsafdsafdsasdfasfdaafdsafdsafdsasdf", "반가워요 123님", "반가워요 123님"], //
        chatTime: 1616871179095 //Sun Mar 28 2021 03:31:19 GMT+0900 (대한민국 표준시)
        // new Date 객체의 getTime() 함수로 받은 정수 값이며 이거 기준으로 300,000(5분) 차이가 날 경우 새로운 문자로 본다.
        // 닉네임이 같고 300,000 안에 다시 문자를 보냈을 경우 같은 사람 이라고 본다.
    });
    setChatList(cLst);
};

function ChatField({backgroundColor,height,...props}) {
    let myNickName = "JangSeokChan";
    const [chatList, setChatList] = useState([]);
    useEffect(() => {
        chatPushText(chatList, setChatList);
    }, []);

    return (
        <TextField  className="textField" >
            {/*{chatList.map((i) => i.nickname === myNickName ? <MyText key={i.chatTime.toString()} chat={i}/> :*/}
            {/*    <AnotherText key={i.chatTime.toString()} chat={i}/>)}*/}
            {chatList.map((i) => <Message key={i.chatTime.toString()} who={i.nickname === myNickName ? "me" : "another"}
                                          chat={i}/>)}
        </TextField>
    );
}

export default ChatField;
