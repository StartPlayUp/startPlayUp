// test for pm2
// let isDisableKeepAlive = false
// app.use(function (req, res, next) {
//     if (isDisableKeepAlive) {
//         res.set('Connection', 'close')
//     }
//     next()
// })
//
// default server port 4000
// test for pm2
// process.on('SIGINT', function () {
//     isDisableKeepAlive = true
//     app.close(function () {
//         console.log('server closed')
//         process.exit(0)
//     })
// })
// server.listen(process.env.PORT || 4000, () => {
//     process.send('ready');
//     console.log('server is running on port 4000')
// });
// //

const admin = require('firebase-admin');
const serviceAccount = require('./key.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const cors = require('cors');
const socketModule = require("./Common/socketMoudle");
const morgan = require('morgan');
const passportModule = require('./Common/passport');
const passport = require('passport');
const flash = require('connect-flash');
const expressSession = require('express-session');
const config = require('./config');
const cookieParser = require('cookie-parser');
const LocalStrategy = require('passport-local').Strategy;
const routerApp = require('./routes/app');
const path = require('path');
const nodemailer = require("nodemailer");
const mailConfig = require('./config').mailConfig;
// require('dotenv').config()
const redis = require('redis');
const redisAdapter = require('socket.io-redis');
const REDIS_PORT = 6379;
const REDIS_HOST = "localhost";
const client = redis.createClient({ host: REDIS_HOST, port: REDIS_PORT })
const pubClient = redis.createClient({ host: REDIS_HOST, port: REDIS_PORT })
const subClient = pubClient.duplicate();
const connectredis = require("connect-redis");
const RedisStore = connectredis(expressSession)


app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.secret));
app.use(flash());
app.use(
    expressSession({ // 옵션은 반드시 넣어줘야 한다.
        resave: false, // 매번 세션 강제 저장
        saveUninitialized: false, // 빈 값도 저장
        secret: config.secret, // cookie 암호화 키. dotenv 라이브러리로 감춤
        cookie: {
            httpOnly: false, // javascript로 cookie에 접근하지 못하게 하는 옵션
            secure: false, // https 프로토콜만 허락하는 지 여부
        },
        store: new RedisStore({
            client,
            ttl: 6000,
        }),
    }),
);


app.use(passport.initialize());
app.use(passport.session());
passportModule(passport);

// use morgan Library
app.use(morgan('dev'))

// cors exception
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

// using json parse
app.use(jsonParser)

// use socket IO

io.adapter(redisAdapter({ host: REDIS_HOST, port: REDIS_PORT }));
socketModule({ io });

// const transporter = nodemailer.createTransport(mailConfig);

// transporter.sendMail({
//     from: '"Fred Foo 👻" <StartPlayUp@gmail.com>', // sender address
//     to: "gbs04087@gmail.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
// })



//  react에서 빌드한 기본 파일 추가
app.use(express.static(path.join(__dirname, "..", "frontend", "build")));
app.use(express.static("public"));
routerApp(app);



// api page
app.use('/api', require('./routes/api'))

// default server port 4000
// test for pm2

server.listen(process.env.PORT || 4000, () => {
    console.log('server is running on port 4000')
});
//

// server.listen(process.env.PORT || 4000, () => console.log('server is running on port 4000'));