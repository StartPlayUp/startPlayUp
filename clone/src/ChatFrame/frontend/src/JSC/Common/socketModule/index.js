
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
// export const YACHU_DICE_DATA_SEND = 'YACHU_DICE_DATA_SEND';
// export const YACHU_DICE_DATA_RECEIVE = 'YACHU_DICE_DATA_RECEIVE';
// export const YACHU_DATA_RECONNECT = 'YACHU_DATA_RECONNECT';

export const socketApi = (type, { socketRef, message, nickname, chatList, setChatList, socketOnOff = true }, callback = "") => {
    if (socketOnOff) {
        switch (type) {
            case SEND_MESSAGE:
                console.log("[Debug] socketApi in")
                socketRef.current.emit(SEND_MESSAGE, nickname, message);
                break;
            case RECEIVE_MESSAGE:
                socketRef.current.on(RECEIVE_MESSAGE, (nickname, message) => {
                    console.log("[DEBUG] receive_message on");
                    callback({ nickname, inputMessage: message, chatList, setChatList });
                });
                break;
            default:
                return;
        }
    } else {
        switch (type) {
            case RECEIVE_MESSAGE:
                console.log("[DEBUG] receive_message off");
                socketRef.current.off(RECEIVE_MESSAGE);
                break;
            default:
                return;
        }
    }
}



