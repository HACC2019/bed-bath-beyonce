const express = require('express');
var router = express.Router();

var Project = require('../models/model-project');

router.get('/', function(req, res){
    Project.find({})
    .sort({date_posted: -1})
    .exec(function(err, result){
        if(err) throw err;
        res.render('view-project-list', {
            title: 'project-list',
            user: req.session.user,
            projects: result
        });
    });
});

module.exports = router;