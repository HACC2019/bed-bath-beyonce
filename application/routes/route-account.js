const express = require('express');
var router = express.Router();

var User = require('../models/model-user');

router.get('/', function(req, res){

    res.render('view-account', {
        title: 'account',
        user: req.session.user
    });
});

router.post('/change', function(req, res){

    User.findOne({_id: req.session.user._id}, function(err, result){
        if(err) throw err;

    });
});

module.exports = router;