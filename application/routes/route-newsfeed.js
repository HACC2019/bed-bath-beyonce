const express = require('express');
var router = express.Router();

router.get('/', function(req, res){

    res.render('/view-newsfeed', {
        title: 'newsfeed',
        user: req.session.user
    });
});

module.exports = router;