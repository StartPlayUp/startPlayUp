const router = require('express').Router()
const controller = require('./room.controller')
const { isLoggedIn, isNotLoggedIn } = require('../../middleWare');

router.post('/getRooms', controller.getRooms);
router.post('/getRoom', isLoggedIn,  controller.getRoom);
router.post('/createRoom', isLoggedIn,  controller.createRoom);
router.post('/accessRoom', isLoggedIn,  controller.accessRoom);

module.exports = router