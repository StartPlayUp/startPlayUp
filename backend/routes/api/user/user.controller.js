const fireBaseUser = require('../../../Common/fireBaseDB/user');

exports.getUser = async (req, res, next) => {
    try {
        console.log("getUser passport of session: ", req.session.passport);
        const email = req.session.passport.user;
        const { user, success } = await fireBaseUser.getUserFromEmail({ email });
        const jsonUser = JSON.stringify({ user, success });
        res.send(jsonUser)
    } catch (error) {
        const jsonUser = JSON.stringify({ user: {}, success: false });
        res.send(jsonUser)
        next(error)
    }
};

exports.getUserFromNickname = async (req, res, next) => {
    try {
        const nickname = req.query['nickname'];
        const { user, success } = await fireBaseUser.getUserFromNickname({ nickname });
        const jsonUser = JSON.stringify({ user, success });
        res.send(jsonUser)
    } catch (error) {
        const jsonUser = JSON.stringify({ user: {}, success: false });
        res.send(jsonUser)
        next(error)
    }
};

exports.report = async (req, res, next) => {
    try {
        const nickname = req.query['nickname'];
        const { success } = await fireBaseUser.updateUserReportCount({ nickname });
        const jsonUser = JSON.stringify({ success });
        res.send(jsonUser)
    } catch (error) {
        const jsonUser = JSON.stringify({ success: false });
        res.send(jsonUser)
    }
};

exports.updateGameResult = async (req, res, next) => {
    try {
        const userList = req.body['userList'];
        const { success } = await fireBaseUser.updateGameResult({ userList });
        const jsonUser = JSON.stringify({ success });
        res.send(jsonUser)
    } catch (error) {
        const jsonUser = JSON.stringify({ success: false });
        res.send(jsonUser)
    }
};

exports.checkNicknameDuplication = async (req, res, next) => {
    try {
        const nickname = req.query.nickname;
        const result = await fireBaseUser.checkNicknameDuplication({ nickname })
        const jsonResult = JSON.stringify(result);
        res.send(jsonResult)
    } catch (error) {
        next(error)
    }
}

exports.checkEmailDuplication = async (req, res, next) => {
    try {
        const email = req.query.email;
        const result = await fireBaseUser.checkEmailDuplication({ email })
        const jsonResult = JSON.stringify(result);
        res.send(jsonResult)
    } catch (error) {
        next(error)
    }
}

exports.register = async (req, res, next) => {
    try {
        const userConfig = req.body;
        const result = await fireBaseUser.createUser({ user: userConfig })
        const jsonResult = JSON.stringify(result);
        res.send(jsonResult)
    } catch (error) {
        next(error)
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const email = req.session.passport.user;
        const { success } = await fireBaseUser.deleteUserFromEmail({ email })
        req.logout();
        res.clearCookie("nickname");
        res.clearCookie("connect.sid");
        const sendData = JSON.stringify({
            redirectPath: "/",
            success
        });
        res.send(sendData);
    } catch (error) {
        next(error)
    }
};

exports.deleteUserFromEmail = async (req, res, next) => {
    // 수정중
    try {
        const email = req.body['email'];
        const deleteUserResult = await fireBaseUser.deleteUserFromEmail({ email })
        const deleteUserResultJson = JSON.stringify(deleteUserResult);
        res.send(deleteUserResultJson)
    } catch (error) {
        next(error)
    }
};

exports.deleteUserFromNickname = async (req, res, next) => {
    try {
        const nickname = req.body['nickname'];
        const deleteUserResult = await fireBaseUser.deleteUserFromNickname({ nickname })
        const deleteUserResultJson = JSON.stringify(deleteUserResult);
        res.send(deleteUserResultJson)
    } catch (error) {
        next(error)
    }
};

exports.joinSns = async (req, res, next) => {
    try {
        const nickname = req.params['nickname'];
        const deleteUserResult = await fireBaseUser.joinSnsUser({ nickname })
        const deleteUserResultJson = JSON.stringify(deleteUserResult);
        res.send(deleteUserResultJson)
    } catch (error) {
        next(error)
    }
};

exports.setNickname = async (req, res, next) => {
    try {
        const nickname = req.body['nickname'];
        console.log(req.user)
        const { id, provider } = req.user.sns;
        const setNicknameResult = await fireBaseUser.setNickname({ nickname, id, provider })
        if (setNicknameResult.success) {
            const resReturnObject = JSON.stringify({ success: true });
            res.send(resReturnObject)
        }
        else {
            const resReturnObject = JSON.stringify({ redirectPath: "/setNickname", success: false });
            res.send(resReturnObject)
        }
    } catch (error) {
        next(error)
    }
};

