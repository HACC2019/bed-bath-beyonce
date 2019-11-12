const express = require('express');
var router = express.Router();

var Project = require('../models/model-project');
var Comment = require('../models/model-comment');

router.get('/:id', function(req, res){

    Project
        .findOne({_id: req.params.id})
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

    if(req.session.user){
        var comment = new Comment({
            posted_by: req.session.user._id,
            project: req.params.id,
            date_posted: new Date(),
            text: req.body.comment_text
        });

        comment.save(function(err, comment_result){
            if(err) throw err;

            Project
                .findOne({_id: req.params.id})
                .exec(function(err, project_result){
                    if(err) throw err;

                    project_result.comments.push(comment_result._id);
                    project_result.save(function(err){
                        if(err) throw err;

                        console.log('MongoDB >> Comment posted');
                        res.redirect(`/project/${req.params.id}`);
                    });
                });
        });
    }
    else{
        console.log('Must be logged in to add a comment');
    }

    
        
    
});

module.exports = router;