exports.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
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
        next();
    }
};


exports.isNotLoggedIn = function (req, res, next) {
    if (!req.isAuthenticated()) {
        next();
    }
    else {
        // res.redirect("/");
        const sendData = JSON.stringify({ redirectPath: "/" });
        res.send(sendData);
    }
};
