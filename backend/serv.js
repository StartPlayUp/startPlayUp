const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const socketModule = require("./Common/socketMoudle");

socketModule({ io });



// server.listen("http://localhost:4000", () => console.log('server is running on port 4000'));
server.listen(process.env.PORT || 4444, () => console.log('server is running on port 4444'));

