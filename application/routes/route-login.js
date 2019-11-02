const express = require('express');
var router = express.Router();

var User = require('../models/model-user');

router.get('/', function(req, res){

    res.render('view-login', {
        title: 'login',
        signin_errors: JSON.stringify(req.session.signin_errors),
        signin_data: JSON.stringify(req.session.signin_data) 
    });
});

router.post('/signin', function(req, res){

    //Save filled form data
    req.session.signin_data = [
        {
            name: 'email',
            value: req.body.email
        },
        {
            name: 'password',
            value: req.body.password
        }
    ];

    //Form validation
    req.check('email', 'Email is required').notEmpty();
    req.check('email', 'Invalid email address').isEmail();
    req.check('email', 'Email not found').custom(function(value) {
        return new Promise(function(resolve, reject) {
            User.findOne({email: value}, function(err, result) {
                if (err) throw err;
                if (result == null) {
                    reject();
                } else {
                    resolve();
                }
            });
        });
    });
    req.check('password', 'Password is required').notEmpty();
    req.check('password', 'Password does not match email').custom(function(value) {
        return new Promise(function(resolve, reject) {
            User.findOne({email: req.body.email}, function(err, result){
                if (err) throw err;
                if(result == null){
                    reject();
                }
                else{
                   if(result.password == value){
                       resolve();
                   }
                   else{
                       reject();
                   }
                }
            }); 
        });   
    });

    var errors = req.getValidationResult();
    errors.then(function(result) {
        req.session.signin_errors = result.array({ onlyFirstError: true });
        if (req.session.signin_errors.length > 0) {
            console.log('signin contains errors:');
            console.log(req.session.signin_errors);
            res.redirect('/login');
        } 
        else {
            req.session.login_success = true;
            User.findOne({email: req.body.email}, function(err, result) {
                if (err) throw err;
                req.session.user = result;
                res.redirect('/');
            });
        }
    });
});

module.exports = router;