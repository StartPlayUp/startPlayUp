module.exports = ({ io }) => {
    let roomMatchingUsers = {}
    let voiceRoomMatchingUsers = {}
    try {
        io.on('connection', socket => {
            require("./Room/room")({ io, socket, roomMatchingUsers });
            require("./Room/voiceRoom")({ io, socket, voiceRoomMatchingUsers });
            require("./chat/chat")({ io, socket });
            socket.on('disconnect', () => {
                console.log("disconnect");
                socket.broadcast.to(socket.roomID).emit("disconnect user", socket.id, socket.nickname);
                socket.broadcast.to(socket.voiceRoomID).emit("disconnect voice user", socket.id, socket.nickname);
                roomMatchingUsers[socket.roomID] !== undefined && roomMatchingUsers[socket.roomID].filter((i) => i !== socket.nickname)
                voiceRoomMatchingUsers[socket.roomID] !== undefined && voiceRoomMatchingUsers[socket.voiceRoomID].filter((i) => i !== socket.voiceNickname)
                socket.leave(socket.rooms);
            });
        });
    }
    catch (e) {
        console.error("error : ", error)
    }

};


