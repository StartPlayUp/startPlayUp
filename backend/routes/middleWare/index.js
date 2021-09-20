exports.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.cookie('nickname', req.user.nickname, { maxAge: 900000, httpOnly: true })
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
    if (req.user.nickname === "") {
        // res.redirect("/setNickname");
        const sendData = JSON.stringify({ redirectPath: "/setNickname" });
        res.send(sendData);
    }
    else {
        res.cookie('nickname', req.user.nickname, { maxAge: 900000, httpOnly: true })
        next();
    }
};


// exports.haveNicknameWithRedirect = function (req, res, next) {
//     if (req.user.nickname === "") {
//         res.redirect("/setNickname");
//     }
//     else {
//         res.cookie('nickname', req.user.nickname, { maxAge: 900000, httpOnly: true })
//         res.redirect("/");
//         next();
//     }
// };

exports.insertNicknameWithRedirect = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.cookie('nickname', req.user.nickname, { maxAge: 900000, httpOnly: true })
    }
    res.redirect("/");
};

exports.isNotLoggedIn = function (req, res, next) {
    if (!req.isAuthenticated()) {
        next();
    }
    else {
        // res.redirect("/");
        const sendData = JSON.stringify({ redirectPath: "/" });
        res.cookie('nickname', req.user.nickname, { maxAge: 900000, httpOnly: true })
        res.send(sendData);
    }
};
