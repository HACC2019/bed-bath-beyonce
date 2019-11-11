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
            projects: result,
            user: req.session.user
        });
    });
});

router.post('/search', function(req, res){
    if(req.body.query == ''){
        Project.
        find({})
        .sort({date_posted: -1})
        .exec(function(err, result){
            if(err) throw err;
            res.render('view-project-list', {
                title: 'project-list',
                projects: result,
                user: req.session.user
            })
        });
    }
    else{
        Project
        .find({$text: {$search: req.body.query}}, {score: {$meta:'textScore'}})
        .sort({score:{$meta: 'textScore'}})
        .sort({name: 1, date_posted: -1})
        .exec(function(err, result){
            if(err) throw err;
            res.render('view-project-list', {
                title: 'project-list',
                projects: result,
                user: req.session.user
            });
        });
    }
});
module.exports = router;