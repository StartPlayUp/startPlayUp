const passport = require('passport');
const { isLoggedIn, insertNicknameWithRedirectForSns, afterLocalLoginSendData } = require('../../middleWare');
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
    afterLocalLoginSendData
);



router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    const sendData = JSON.stringify({
        redirectPath: "/",
        success: true
    });
    res.send(sendData);
});



module.exports = router;