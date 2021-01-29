const { Project, User, Task, UserProject} = require('../models')

class Controller {
    static getRootHandler (req,res) {
        let userId = +req.session.user;
        User.findByPk(userId, {
            include:  [ Project , Task ] 
        })
        .then((data)=> {
            console.log(JSON.stringify(data, null, 2));
            res.render('home', {
                user: data,
                projects: data.Projects,
                task: data.Tasks
            })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static getAddProject(req,res){
        console.log('masuk ke controller');
        let userId = req.session.user;
        User.findAll()
        .then((data)=> {
            console.log(userId);
            console.log(JSON.stringify(data, null, 2));

            res.render('addproject', {
                currentUser: 3,
                users: data
            })
        })
        .catch(err=> {res.send(err)});
    }

    static postAddProject (req, res) {
        let userId = req.session.user;
        let { name } = req.body;
        let newprojectid;
        Project.create({
            name: name
        })
        .then((project) => {
            newprojectid = project.id;
            return UserProject.create({
                UserId: userId,
                ProjectId: project.id
            })
        })
        .then((data)=>{
            // console.log('masuk postadd cuy')
            // console.log(data);
            res.redirect(`/project/${newprojectid}`)
        })
        .catch((err)=>{
            res.send(err);
        })
    }

    static getAddCollaborator(req, res){
        let projectid = req.params.projectid;
        let project;
        let userId = req.session.user;
        let validation = req.query.userpresence;
        
        Project.findByPk(projectid)
        .then((data)=> {
            project= data;
            return User.findAll()
        })
        .then((users)=>{

            res.render('formaddcolab',{
                projectname: project.name,
                projectid: projectid,
                users: users,
                currentUser : userId,
                validation : validation
            })
        })
        .catch(err=>res.send(err));
    }

    static postAddCollaborator (req,res){
        let projectid = req.params.projectid;
        let { collaborator } = req.body
        User.findOne({
            where:{
                username: collaborator
            }
        })
        .then((data)=>{
            if (!data) {
                res.redirect(`/project/addcollaborator/${projectid}?userpresence=no`)
            } else {
                return UserProject.create({
                    UserId: data.id,
                    ProjectId: projectid
                })
            }
        })
        .then(()=> {
            res.redirect(`/project/${projectid}`)
        })
        .catch(err => {
            console.log(err);
            res.send(err)
        })
    }

    static getDelProject(req,res){
        let projectid  = req.params.projectid
        Project.destroy({
            where: {
                id: projectid
            }
        })
        .then(()=>{
            res.redirect(`/home`);
        })
    }

    static getEditProject(req, res){
        let userid = req.session.user;
        let projectid  = req.params.projectid
        Project.findByPk(projectid, {
            include:  [ User ] 
        })
        .then((project)=> {
            res.render('editproject',{
                project: project,
                userid: userid
            })
        })
    }

    static postEditProject(req,res){
        let name = req.body.name;
        let projectid = req.params.projectid
        Project.update({name},{
            where: {id : projectid}
        })
        .then(res.redirect('/home'))
        .catch(err=>res.send(err))
    }

    static getShowProject(req,res){
        let projectid= req.params.projectid;
        Project.findOne({
            where: {id: projectid},
            include: [ User, Task ]
          })
        .then((project)=>{
            console.log(JSON.stringify(project.Users, null, 2));
            res.render('projectpage', {
                project: project,
                collaborators: project.Users
            })

        })
    }

    static getAddTask(req,res){
        let projectid = req.params.projectid;
        let validation = req.query.error;
        User.findByPk(req.session.user)
        .then((data)=> {
            res.render('formAddTask',{
                projectid: projectid,
                validation:validation,
                task: {
                    status: '',
                    name: '',
                    Assignee: data.username
                }
            }) 
        })
        .catch((err)=> res.send(err));
    }

    static postAddTask(req, res){
        let projectid = req.params.projectid;
        
        let newTask = {
            task_name: req.body.name,
            status: req.body.status
        }
        
    }

}

module.exports = Controller;