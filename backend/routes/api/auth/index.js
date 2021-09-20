const passport = require('passport');
const { isLoggedIn, haveNickname, insertNicknameWithRedirect } = require('../../middleWare');
const router = require('express').Router();

// http://localhost:4000/api/auth/login/naver
router.get('/login/naver',
    passport.authenticate('naver')
);

//naver 로그인 연동 콜백
router.get('/login/naver/callback',
    passport.authenticate('naver'),
    insertNicknameWithRedirect,
);
//api/auth/login/kakao
// kakao 로그인
router.get('/login/kakao',
    passport.authenticate('kakao')
);
// kakao 로그인 연동 콜백
router.get('/login/kakao/callback',
    passport.authenticate('kakao'),
    insertNicknameWithRedirect,
);


// 로컬 로그인

router.post('/login/local',
    passport.authenticate('local'),
    (req, res, next) => {
        if (req.isAuthenticated()) {
            res.cookie('nickname', req.user.nickname, { maxAge: 900000, httpOnly: true })
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
    }
);



router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    const sendData = JSON.stringify({
        redirectPath: "/",
        success: true
    });
    res.send(sendData);
});



module.exports = router;