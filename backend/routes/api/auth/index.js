const passport = require('passport');
const { isLoggedIn, insertNicknameWithRedirectForSns } = require('../../middleWare');
const router = require('express').Router();

// http://localhost:4000/api/auth/login/naver
router.get('/login/naver',
    passport.authenticate('naver')
);

//naver 로그인 연동 콜백
router.get('/login/naver/callback',
    passport.authenticate('naver'),
    insertNicknameWithRedirectForSns,
);
//api/auth/login/kakao
// kakao 로그인
router.get('/login/kakao',
    passport.authenticate('kakao')
);
// kakao 로그인 연동 콜백
router.get('/login/kakao/callback',
    passport.authenticate('kakao'),
    insertNicknameWithRedirectForSns,
);


// 로컬 로그인

router.post('/login/local',
    passport.authenticate('local'),
    (req, res, next) => {
        if (req.isAuthenticated()) {
            console.log("로컬로그인 : ", req.user.nickname + " " + req.user.docId)
            res.cookie('nickname', req.user.nickname + " " + req.user.docId, { maxAge: 900000, httpOnly: false })

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
    }
);



router.get('/logout', (req, res) => {
    req.logout();
    res.clearCookie("nickname");
    res.clearCookie("connect.sid");
    const sendData = JSON.stringify({
        redirectPath: "/",
        success: true
    });
    res.send(sendData);
});



module.exports = router;