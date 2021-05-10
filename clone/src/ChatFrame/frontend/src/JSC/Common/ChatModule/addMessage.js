export const chatAddMessage = ({ nickname, inputMessage, chatList, setChatList }) => {
    let time = new Date();
    console.log("[debug] chat Add Message : ", nickname, inputMessage, chatList);

    if (!chatList.length || nickname !== chatList[chatList.length - 1].nickname || time - chatList[chatList.length - 1].chatTime > 30000) {
        setChatList([...chatList, {
            nickname: nickname,
            textList: [inputMessage],
            chatTime: time
        }]);
    } else {
        let tmp = [...chatList];
        tmp[tmp.length - 1].textList.push(inputMessage);
        tmp.chatTime = time;
        setChatList(tmp);
        console.log(chatList.chatTime);
    }
}

export const chatAddMessageRef = ({ nickname, inputMessage, chatListRef, setChatList }) => {
    let time = new Date();
    if (!chatListRef.current.length || nickname !== chatListRef.current[chatListRef.current.length - 1].nickname || time - chatListRef.current[chatListRef.current.length - 1].chatTime > 3000) {
        setChatList([...chatListRef.current, {
            nickname: nickname,
            textList: [inputMessage],
            chatTime: time
        }]);
    } else {
        let tmp = [...chatListRef.current];
        tmp[tmp.length - 1].textList.push(inputMessage);
        tmp.chatTime = time;
        console.log("[debug] : chatAddMessageRef : ", time);

        setChatList(tmp);
    }
}


