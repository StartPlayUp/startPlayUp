const passport = require('passport');
const { isLoggedIn } = require('../../middleWare');
const router = require('express').Router()
//api/auth/login/naver
router.get('/login/naver',
    passport.authenticate('naver')
);

// naver 로그인 연동 콜백
router.get('/login/naver/callback',
    passport.authenticate('naver', {
        successRedirect: '/',
        failureRedirect: '/api/auth/login',
    })
);
//api/auth/login/kakao
// kakao 로그인
router.get('/login/kakao',
    passport.authenticate('kakao')
);
// kakao 로그인 연동 콜백
router.get('/login/kakao/callback',
    passport.authenticate('kakao', {
        successRedirect: '/',
        failureRedirect: '/api/auth/login'
    })
);


// 로컬 로그인
router.post('/login/local',
    passport.authenticate('local', {
        successRedirect: '/main',
        failureRedirect: '/api/auth/login',
    })
);



router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    res.redirect('/');
});



module.exports = router;