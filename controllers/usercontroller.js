const { Project, User, Task, UserProject} = require('../models')
const { compare } = require('../helpers/bcrypt');
const nodemailtodo = require('../helpers/send_email');

class UserController{
    static getLogin(req, res) {
        let error = req.query.error
        res.render('login',{
            error: error
        })
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
                res.redirect('/user/login?error=true')
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
            console.log('sudah created lho');
            nodemailtodo(req.body.email);
            res.redirect('/user/login')
        })
        .catch((err)=> {
            res.send(err);
        })
        
    }
}

module.exports = UserController;