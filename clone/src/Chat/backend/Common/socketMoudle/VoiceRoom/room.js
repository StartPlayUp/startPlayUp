module.exports = ({io, socket}) => {
    let currentRoomId;
    socket.on("join room", roomID => {
        currentRoomId = roomID;
        let setUsersInThisRoom = io.sockets.adapter.rooms.get(roomID);
        let usersInThisRoom = setUsersInThisRoom === undefined ? [] : Array.from(setUsersInThisRoom);
        socket.join(roomID);
        socket.emit("all users", usersInThisRoom); // Set으로 받아오기에 값을 array로 바꿔줬음.
    });

    socket.on("sending signal", ({signal, callerID, userToSignal}) => {
        io.to(userToSignal).emit('user joined', {signal, callerID});
    });

    socket.on("returning signal", ({callerID, signal}) => {
        io.to(callerID).emit('receiving returned signal', {signal: signal, id: socket.id});
    });

    socket.on('disconnect', () => {
        socket.broadcast.to(currentRoomId).emit("disconnect user", socket.id);
        socket.leave(socket.rooms);
    });
};
