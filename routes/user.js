const express = require('express');
const router = express.Router();
const UserController = require('../controllers/usercontroller.js');



router.get('/register', UserController.getRegister);
router.post('/register', UserController.postRegister);
router.get('/login', UserController.getLogin);
router.post('/login', UserController.postLogin);

router.get('/logout', UserController.getLogout);


module.exports = router;