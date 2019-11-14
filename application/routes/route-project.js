const express = require('express');
var router = express.Router();

var Project = require('../models/model-project');
var Comment = require('../models/model-comment');
var Badge = require('../models/model-badge');

router.get('/:id', function(req, res){

    Project
    //find project based on _id
    .findOne({_id: req.params.id})
    //populate retreived project with data from comments collection and users associated
    .populate({
        path: 'comments',
        populate: {path: 'posted_by'}
    })
    .exec(function(err, result_project){
        if(err) throw err;
        if(result_project == null){
            console.log('MongoDB >> Project page not found');
        }
        else{
            Project
            //find 4 project documents that aren't the project that is currently displayed
            .find({_id:{$ne: req.params.id}})
            .limit(4)
            .exec(function(err, result_other_projects){
                if(err) throw err;
                res.render('view-project', {
                    title: 'project',
                    project: result_project,
                    other_projects: result_other_projects,
                    user: req.session.user
                });
            });
        }
    });
});

router.post('/:id/comment', function(req, res){

    //if user is logged in, enable comment posting
    if(req.session.user){

        //create a comment to be stored to the db
        var comment = new Comment({
            posted_by: req.session.user._id,
            project: req.params.id,
            date_posted: new Date(),
            text: req.body.comment_text
        });

        //save the comment to the comment collection
        comment.save(function(err, comment_result){
            if(err) throw err;

            Project
            .findOne({_id: req.params.id})
            .exec(function(err, project_result){
                if(err) throw err;
                //add saved comment to the project array for comments to be populated later
                project_result.comments.push(comment_result._id);
                project_result.save(function(err){
                    if(err) throw err;
                    console.log('MongoDB >> Comment posted');
                    res.redirect(`/project/${req.params.id}`);
                });
            });
        });
    }
    //if user is not logged in, disable comment posting
    else{
        console.log('Must be logged in to add a comment');
    } 
});

router.get('/:id/badge', function(req, res){
    Project.findOne({_id: req.params.id})
    .populate('badges')
    .exec(function(err, project_result){
        if(err) throw err;
        res.send(project_result);
    });
});

router.post('/:id/badge', function(req, res){

    Project
    .findOne({_id: req.params.id})
    .populate('badges')
    .exec(function(err, project_result){
        if(err) throw err;
        Badge
        .findOne({title: req.body.badge})
        .exec(function(err, badge_result){
            if(err) throw err;
            var dup = false;
            project_result.badges.forEach(function(item, index, arr){
                if(item._id.equals(badge_result._id)){
                    arr.splice(index, 1);
                    dup = true;
                }
            });
            if(dup){
                project_result.save(function(err, updated_result){
                    if(err) throw err;
                    res.send(updated_result);
                });
            }
            else{
                project_result.badges.push(badge_result);
                project_result.save(function(err, updated_result){
                    if(err) throw err;
                    res.send(updated_result);
                });
            }
            
        });
    });
});

module.exports = router;