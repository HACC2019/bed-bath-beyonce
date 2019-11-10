const express = require('express');
var router = express.Router();

var Project = require('../models/model-project');

router.get('/', function(req, res){

    res.render('view-project', {
        title: 'project',
        project: {
            name: '<NAME>',
            start_date: '<DATE>',
            end_date: '<DATE2>',
            address: '<ADDRESS>',
            description: '<DESCRIPTION>'
        },
        user: req.session.user
    });
});

router.get('/:id', function(req, res){

    Project.findOne({_id: req.params.id}, function(err, result){
        if(err) throw err;
        if(result == null){
            console.log('MongoDB >> Project page not found');
        }
        else{
            res.render('view-project', {
                title: 'project',
                project: result,
                user: req.session.user
            });
        }
    });
});

module.exports = router;