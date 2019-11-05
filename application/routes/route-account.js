const express = require('express');
var router = express.Router();

var User = require('../models/model-user');

router.get('/', function(req, res){

    res.render('view-account', {
        title: 'account',
        user: req.session.user
    });
});

module.exports = router;