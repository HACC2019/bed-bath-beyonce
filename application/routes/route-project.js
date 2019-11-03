const express = require('express');
var router = express.Router();

var Project = require('../models/model-project');

router.get('/', function(req, res){

    res.render('view-project-page', {
        title: 'project-page',
        project: {
            name: '<NAME>',
            date: '<DATE>',
            address: '<ADDRESS>',
            description: '<DESCRIPTION>'
        }
    });
});

router.get('/:id', function(req, res){

    Project.findOne({_id: req.params.id}, function(err, result){
        if(err) throw err;
        if(result == null){
            console.log('MongoDB >> Project page not found');
        }
        else{
            res.render('view-project-page', {
                title: 'project-page',
                project: result
            });
        }
    });
});

module.exports = router;