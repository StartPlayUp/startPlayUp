module.exports = ({io}) => {
    io.on('connection', socket => {
        require("./VoiceRoom/room")({io,socket});
        require("./chat/chat")({io,socket});
    });
};


