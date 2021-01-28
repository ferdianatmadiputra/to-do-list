const router = require('express').Router();
const Controller = require('../controllers/controller.js');
const usersRoutes = require('./user.js');
const auth = require('../middleware/auth');

router.use('/user', usersRoutes);

router.use(auth);
router.get('/home', Controller.getRootHandler);
router.get('/project/new', Controller.getAddProject);
router.post('/project/new', Controller.postAddProject);
router.get('/project/:projectid', Controller.getShowProject)
router.get('/project/addcollaborator/:projectid', Controller.getAddCollaborator);
router.post('/project/addcollaborator/:projectid', Controller.postAddCollaborator);
router.get('/project/delete/:projectid', Controller.getDelProject);
router.get('/project/editname/:projectid', Controller.getEditProject);
router.post('/project/editname/:projectid', Controller.postEditProject);

//start dari form create task
router.get('/addtask', Controller.getAddTask);



module.exports = router;