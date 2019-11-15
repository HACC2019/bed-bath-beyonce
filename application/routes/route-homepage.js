const express = require('express');
var router = express.Router();

var Project = require('../models/model-project');

router.get('/', function(req, res){
    Project.find({})
    .sort({date_posted: -1})
    .limit(4)
    .exec(function(err, result){
        if(err) throw err;
        res.render('view-homepage', {
            title: 'homepage',
            user: req.session.user,
            projects: result
        });
    });
});

router.get('/calendar', function(req, res){
    Project
    .find({})
    .sort({start_date: 1})
    .exec(function(err, project_result){
        if(err) throw err;
        res.send(project_result);
    });
});

module.exports = router;