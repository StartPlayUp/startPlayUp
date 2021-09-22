
const insertNickname = ({ res, nickname, docId }) => {
    res.cookie('nickname', req.user.nickname + " " + req.user.docId, { maxAge: 900000, httpOnly: false })
}


exports.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.cookie('nickname', req.user.nickname + " " + req.user.docId, { maxAge: 900000, httpOnly: false })
        next();
    }
    else {
        // res.status(403).send('로그인 필요');
        // res.redirect("/api/auth/login");
        const sendData = JSON.stringify({ redirectPath: "/" });
        res.send(sendData);
    }
};

exports.haveNickname = function (req, res, next) {
    console.log("req.user.docId : ", req.user)
    res.cookie('nickname', req.user.nickname + " " + req.user.docId, { maxAge: 900000, httpOnly: false })
    next();
};


exports.insertNicknameWithRedirectForSns = function (req, res, next) {
    if (req.isAuthenticated()) {
        console.log("req.user.docId : ", req.user)
        res.cookie('nickname', req.user.nickname + " " + req.user.docId, { maxAge: 900000, httpOnly: false })
    }
    res.redirect("http://localhost:3000/");
};

exports.isNotLoggedIn = function (req, res, next) {
    if (!req.isAuthenticated()) {
        next();
    }
    else {
        // res.redirect("/");
        const sendData = JSON.stringify({ redirectPath: "/" });
        res.cookie('nickname', req.user.nickname + " " + req.user.docId, { maxAge: 900000, httpOnly: false })
        res.send(sendData);
    }
};


exports.afterLocalLoginSendData = function (req, res, next) {
    if (req.isAuthenticated()) {
        console.log("로컬로그인 : ", req.user.nickname + " " + req.user.docId)
        res.cookie('nickname', req.user.nickname + " " + req.user.docId, { maxAge: 900000, httpOnly: false })
        const SendData = JSON.stringify({
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
