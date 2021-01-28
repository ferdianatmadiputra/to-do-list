const router = require('express').Router();
const Controller = require('../controllers/controller.js');

router.get('/', Controller.getRootHandler);



module.exports = router;