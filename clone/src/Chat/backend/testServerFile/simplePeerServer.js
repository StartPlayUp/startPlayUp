// require('dotenv').config();
// 환경변수 설정값 가져오기. 같은 디렉토리의 .env 파일을 가져옴.

const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

const users = {};

const socketToRoom = {};

io.on('connection', socket => {// connection 연결 부분
    socket.on("join room", roomID => {// 해당 소켓이서 join room 이라는 신호를 받을 때. + roomId도 받아 해당 룸에 들어감.
        if (users[roomID]) { // 해당 룸이 만들어져 있는지 확인
            // 룸이 있을 때.
            const length = users[roomID].length;
            if (length === 4) { // 4명 일 때 다 찼다고 보냄.
                socket.emit("room full");
                return;
            }
            users[roomID].push(socket.id); // 룸에 소켓 아이디를 추가함.
        } else {
            // 룸이 없을 때.
            users[roomID] = [socket.id]; // 새로운 룸을 만들고 소켓 아이디를 추가함.
        }
        socketToRoom[socket.id] = roomID; // 소켓 아이디와 방 아이디를 매칭해서 저장.
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id); // 본인 빼고 나머지 socket id를 받아옴.

        socket.emit("all users", usersInThisRoom);// 방의 나머지 소켓아이디들을 현재 소켓에게 전송.
    });

    socket.on("sending signal", payload => { // sending signal 이라는 신호를 받았을 때.
        // 조인룸 후 룸에 들어간 user id를 가져와서 sending signal에 보내는데 해당 피어의 정보(peer) 까지 보냄.
        // 이 정보를 서버에서 받아 해당
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
        // 소켓은 payload를 받고 payload.userToSignal 값(상대 peer 들의 socket id값)으로 데이터를 보낸다.
        // 값 보낼 때
    });

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
        // 소켓은 payload를 받고 payload.calller 값(상대 peer signal 값)으로 데이터를 보낸다.
    });

    socket.on('disconnect', () => {// 연결해제
        const roomID = socketToRoom[socket.id]; // socket id가 어디 룸에 있는지 확인해서
        let room = users[roomID];
        if (room) {
            room = room.filter(id => id !== socket.id); // 해당 룸에서 제거
            users[roomID] = room; // 결과 저장.
        }
    });

});

// server.listen("http://localhost:4000", () => console.log('server is running on port 4000'));
server.listen(3000, function () {
    console.log('server on..');
});
