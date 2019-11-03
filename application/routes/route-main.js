const express = require('express');
var router = express.Router();

router.get('/', function(req, res){

    res.redirect('/home-page');
});

router.get('/home-page', function(req, res){

    res.render('view-home-page', {
        title: 'home-page'
    });
});

router.get('/contact', function(req, res){

    res.render('view-contact', {
        title: 'contact'
    });
});

router.get('/landing-page', function(req, res){

    res.render('view-landing-page', {
        title: 'landing-page'
    });
});

router.get('/project-page', function(req, res){

    res.render('view-project-page', {
        title: 'project-page'
    });
});

router.get('/projects-with-sidebar', function(req, res){

    res.render('view-projects-with-sidebar', {
        title: 'projects-with-sidbar'
    });
});

router.get('/Success', function (req, res) {

    res.render('view-success', {
        title: 'success'
    });
       
});

module.exports = router;