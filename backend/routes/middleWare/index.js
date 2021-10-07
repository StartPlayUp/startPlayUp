
const configValue = require('../../config')

const insertNicknameAtCookies = (req, res) => {
    res.cookie('nickname', req.user.nickname + " " + req.user.docId, { maxAge: 900000, httpOnly: false })
}


exports.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        console.log("is Authenticated : ", req.user.nickname);
        // insertNicknameAtCookies(req, res);
        next();
    }
    else {
        console.log("is not Authenticated");
        const sendData = JSON.stringify({ redirectPath: "/" });
        res.send(sendData);
    }
};

// exports.haveNickname = function (req, res, next) {
//     console.log("req.user.docId : ", req.user)
//     // insertNicknameAtCookies(req, res);
//     next();
// };


exports.insertNicknameWithRedirectForSns = function (req, res, next) {
    if (req.isAuthenticated()) {
        console.log("req.user.docId : ", req.user)
        insertNicknameAtCookies(req, res);
    }
    // if (configValue.clientIp !== undefined) {
    //     res.redirect(configValue.clientIp);
    // }
    // else {
    //     res.redirect('/');
    // }
    res.redirect('http://localhost:3000');
};

exports.isNotLoggedIn = function (req, res, next) {
    if (!req.isAuthenticated()) {
        next();
    }
    else {
        // res.redirect("/");
        const sendData = JSON.stringify({ redirectPath: "/" });
        insertNicknameAtCookies(req, res);
        res.send(sendData);
    }
};


exports.afterLocalLoginSendData = function (req, res, next) {
    if (req.isAuthenticated()) {
        console.log("로컬로그인 : ", req.user.nickname + " " + req.user.docId)
        insertNicknameAtCookies(req, res);
        const SendData = JSON.stringify({
            nickname: req.user.nickname + " " + req.user.docId,
            redirectPath: "/main",
            success: true
        });
        res.send(SendData)
    }
    else {
        const SendData = JSON.stringify({
            redirectPath: "/",
            success: false
        });
        res.send(SendData)
    }
};
