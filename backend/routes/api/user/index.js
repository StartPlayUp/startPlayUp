const router = require('express').Router()
const controller = require('./user.controller')
const { isLoggedIn, isNotLoggedIn, haveNickname } = require('../../middleWare');


router.get('/getUser', isLoggedIn, haveNickname, controller.getUser);
// router.get('/getUserFromNickname', controller.getUserFromNickname);
router.get('/report', isLoggedIn, haveNickname, controller.report);
router.post('/updateGameResult', isLoggedIn, haveNickname, controller.updateGameResult);

router.post('/createUser', isNotLoggedIn, controller.register);

// router.post('/deleteUserFromEmail', isLoggedIn, controller.deleteUserFromEmail);
// router.post('/deleteUserFromNickname', isLoggedIn, controller.deleteUserFromNickname);

router.post('/deleteUser', isLoggedIn, controller.deleteUser);


router.get('/checkEmailDuplication', controller.checkEmailDuplication);
router.get('/checkNicknameDuplication', controller.checkNicknameDuplication);

router.get('/joinSns', isLoggedIn, haveNickname, controller.joinSns)
router.post('/setNickname', isLoggedIn, controller.setNickname)


// router.post('/joinSns', isLoggedIn,
//     (req, res, next) => {
//         console.log(req.user);

//         next();
//     }
// );


module.exports = router