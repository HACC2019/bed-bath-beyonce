const express = require('express');
var router = express.Router();

var User = require('../models/model-user');

router.get('/', function(req, res){

    res.render('view-account', {
        title: 'account',
        user: req.session.user,
        account_errors: JSON.stringify(req.session.account_errors),
    });

    req.session.account_errors = null;
    req.session.save();
});

router.post('/change', function(req, res){

    User.findOne({_id: req.session.user._id})
    .then(function(result){
        if (req.body.fname != '') {
            result.fname = req.body.fname;
        }
        if (req.body.lname != '') {
            result.lname = req.body.lname;
        }
        if (req.body.organization!= '') {
            result.organization = req.body.organization;
        }
        if (req.body.school != '') {
            result.school = req.body.school;
        }
        if (req.body.password != '') {
            req.check('password', 'Password must be at least 8 characters').isLength({ min: 8 });
            req.check('password', 'Password must be less than 73 characters').isLength({ max: 72 });            
        }
        req.check('confirmpassword', 'Passwords do not match').equals(req.body.password);
        
        if (req.body.email != '') {
            result.email = req.body.email;
            req.check('email', 'Invalid email address').isEmail();
            req.check('email', 'Email already exists').custom(function (value) {
                return new Promise(function (resolve, reject) {
                    User.findOne({ email: value }, function (err, result) {
                        if (err) throw err;
                        if (result == null) {
                            resolve();
                        } else {
                            reject();
                        }
                    });
                });
            });
        }
        var errors = req.getValidationResult();

        errors.then(function (errors) {
            req.session.account_errors = errors.array({ onlyFirstError: true });
            if (req.session.account_errors.length > 0) {
                console.log('account changes contains errors');
                res.redirect('/account');
            }
            else {
                result.save()
                    .then(function (result) {
                        req.session.user = result;
                        res.redirect('/account');
                    });
            }
        });
    });

    

});

module.exports = router;