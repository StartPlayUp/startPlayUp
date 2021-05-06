export const chatAddMessage =({nickname,inputMessage,chatList,setChatList})=>{
    let time = new Date();
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
