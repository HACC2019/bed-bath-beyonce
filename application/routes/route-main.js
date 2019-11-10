const express = require('express');
var router = express.Router();

router.get('/', function(req, res){

    res.redirect('/homepage');
});

router.get('/homepage', function(req, res){

    res.render('view-homepage', {
        title: 'homepage',
        user: req.session.user
    });
});

router.get('/contact', function(req, res){

    res.render('view-contact', {
        title: 'contact',
        user: req.session.user
    });
});

router.get('/projects-with-sidebar', function(req, res){

    res.render('view-projects-with-sidebar', {
        title: 'projects-with-sidbar',
        user: req.session.user
    });
});

router.get('/logout', function(req, res){

    req.session.user = null;
    res.redirect('/');
});

router.get('/success', function(req, res) {

    res.render('view-success', {
        title: 'success',
        user: req.session.user
    });      
});


module.exports = router;