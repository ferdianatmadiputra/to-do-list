const { Project, User, Task, UserProject} = require('../models')
const { compare } = require('../helpers/bcrypt');

class UserController{
    static getLogin(req, res) {
        res.render('login')
    }

    static postLogin(req,res) {
        let { username, password } = req.body;

        User.findOne({where: {
            username: username
        }})
        .then((user) => {
            if (compare(password, user.password)) {
                ////
                req.session.user = user.id;
                res.redirect(`/home`);
            } else {
                res.redirect('/user/login')
            }
        })
        .catch(err => {
            res.send(err);
        })
    }
    static getLogout(req, res) {
        req.session.user = false;
        res.redirect('/user/login');
    }

    static getRegister(req, res) {
        res.render('register')
    }
    
    static postRegister(req,res) {
        let newUser = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        }
        console.log('masuk controller')
        User.create(newUser)
        .then(()=> {
            console.log('sudah created lho')
            res.redirect('/user/login')
        })
        .catch((err)=> {
            res.send(err);
        })
        
    }
}

module.exports = UserController;