const express = require('express');
var router = express.Router();

//Import user schema to read and write to that collection in database
var User = require('../models/model-user');

router.get('/', function(req, res){

    //Display login page with the following variables to be used by ejs or jquery
    res.render('view-login', {
        title: 'login',
        signin_errors: JSON.stringify(req.session.signin_errors),
        signin_data: JSON.stringify(req.session.signin_data),
        signup_errors: JSON.stringify(req.session.signup_errors),
        signup_data: JSON.stringify(req.session.signup_data),
        user: req.session.user
    });

    //Clear errors and saved data after page has been rendered
    req.session.signin_errors = null;
    req.session.signin_data = null;
    req.session.signup_errors = null;
    req.session.signup_data = null;
    req.session.save()
});

//Handles request for signing in
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

    //Check fields from form so that they pass the specified validation
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

    //Store errors
    var errors = req.getValidationResult();

    errors.then(function(result) {
        //Store errors as array for easy handling
        //Each field will only throw one error
        req.session.signin_errors = result.array({ onlyFirstError: true });

        //If errors exist, remain on signup page with errors shown
        if (req.session.signin_errors.length > 0) {
            console.log('signin contains errors:');
            console.log(req.session.signin_errors);
            res.redirect('/login');
        } 
        //If no errors, user session set and return to homepage
        else {
            User.findOne({email: req.body.email}, function(err, result) {
                if (err) throw err;
                req.session.user = result;
                res.redirect('/');
            });
        }
    });
});

//Handles request for signing up 
router.post('/signup', function(req, res){
    //Save filled form data
    req.session.signup_data = [
        {
            name: 'accounttype',
            value: req.body.accounttype
        },
        {
            name: 'fname',
            value: req.body.fname
        },
        {
            name: 'lname',
            value: req.body.lname
        },
        {
            name: 'email',
            value: req.body.email
        },
        {
            name: 'password',
            value: req.body.password
        },
        {
            name: 'confirmpassword',
            value: req.body.confirmpassword
        },
        {
            name: 'school',
            value: req.body.school
        },
        {
            name: 'organization',
            value: req.body.organization
        }
    ];

    //Check fields from form so that they pass the specified validation
    req.check('email', 'Email is required').notEmpty();
    req.check('email', 'Invalid email address').isEmail();
    req.check('email', 'Email already exists').custom(function(value) {
        return new Promise(function(resolve, reject) {
            User.findOne({email: value}, function(err, result) {
                if (err) throw err;
                if (result == null) {
                    resolve();
                } else {
                    reject();
                }
            });
        });
    });
    req.check('fname', 'First Name is required').notEmpty();
    req.check('lname', 'Last Name is required').notEmpty();
    req.check('password', 'Password is required').notEmpty();
    req.check('password', 'Password must be at least 8 characters').isLength({min: 8});
    req.check('password', 'Password must be less than 73 characters').isLength({max: 72});
    req.check('confirmpassword', 'Passwords do not match').equals(req.body.password);
    if(req.body.accounttype == 'professional' || req.body.accounttype == 'student'){
        req.check('school', 'School is required').notEmpty();
    }
    if(req.body.accounttype == 'organization'){
        req.check('organization', 'Organization is required').notEmpty();
    }
    
    //Store errors
    var errors = req.getValidationResult();

    errors.then(function(result){
        //Store errors as array for easy handling
        //Each field will only throw one error
        req.session.signup_errors = result.array({ onlyFirstError: true });

        //If errors exist, remain on signup page with errors shown
        if (req.session.signup_errors.length > 0) {
            console.log('signup contains errors:');
            console.log(req.session.signup_errors);
            res.redirect('/login');
        } 
        //If no errors, create a new user in the database and redirect to scuccess page
        else {
            var user = new User({
                email: req.body.email,
                password: req.body.password,
                fname: req.body.fname,
                lname: req.body.lname,
                school: req.body.school,
                organization: req.body.organization,
                account_type: req.body.accounttype
            });
        
            user.save(function(err, result) {
                if (err) throw err;
                console.log(`MongoDB >> ${result.email} saved to database`);
                res.redirect('/success');
            });     
        }
    });
});

module.exports = router;