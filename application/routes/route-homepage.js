const express = require('express');
var router = express.Router();

var User = require('../models/model-user');

router.get('/', function(req, res){

    var user = new User({
        fname: 'Chris',
        mname: 'D',
        lname: 'Sparks'
    });

    user.save(function(err, result){
        if(err) throw err;
        console.log('Fake user has been made');
    });

    res.render('view-homepage', {layout: false});
});

module.exports = router;