const express = require('express');
var router = express.Router();

router.get('/', function(req, res){

    res.redirect('/homepage');
});

router.get('/contact', function(req, res){

    res.render('view-contact', {
        title: 'contact',
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