const express = require('express');
var router = express.Router();

//Import user schema to read and write to that collection in database
var User = require('../models/model-user');

router.get('/', function (req, res) {

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

router.post('/signup', function (req, res) {
    //Save filled form data
    req.session.signup_data = [
        {
            name: 'accounttype',
            value: req.body.accounttype
        },
        {
            name: 'title',
            value: req.body.title
        },
        {
            name: 'description',
            value: req.body.description
        },
        {
            name: 'school',
            value: req.body.school
        },
        {
            name: 'sdate',
            value: req.body.sdate
        },
        {
            name: 'edate',
            value: req.body.edate
        }
    ]});
