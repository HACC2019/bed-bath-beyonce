const express = require('express');
var router = express.Router();

var Project = require('../models/model-project');
var User = require('../models/model-user');
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
            .sort({date_posted: -1})
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

//determines whether the user is joined to a project or not
router.get('/:id/join-state', function(req, res){

    if(req.session.user != null){
        User
        .findOne({_id: req.session.user._id})
        .exec(function(err, user_result){
            if(err) throw err;
            var joined = false;
            user_result.projects_joined.forEach(function(project){
                if(project.equals(req.params.id)){
                    joined = true;
                }
            });
            if(joined){
                res.send('true');
            }
            else{
                res.send('false');
            }
        }); 
    }
    else{
        res.send('signin');
    }
});

//used to add a user to a project
router.get('/:id/join-yes', function(req, res){
    if(req.session.user != null){
        User
        .findOne({_id: req.session.user._id})
        .exec(function(err, user_result){
            if(err) throw err;

            var joined = false;
            user_result.projects_joined.forEach(function(project){
                if(project.equals(req.params.id)){
                    joined = true;
                }
            });
            if(!joined){
                user_result.projects_joined.push(req.params.id);
                user_result.save(function(err, updated_user_result){
                    if(err) throw err;
                    req.session.user = updated_user_result;
                    res.send('User was added to this project');
                });
            }
            else{
                res.send('User already added to project');
            }
        });
    }
});

//used to remove a user from a project
router.get('/:id/join-no', function(req, res){
    if(req.session.user != null){
        User
        .findOne({_id: req.session.user._id})
        .exec(function(err, user_result){
            if(err) throw err;

            user_result.projects_joined.forEach(function(project, index, arr){
                if(project.equals(req.params.id)){
                    arr.splice(index, 1);
                }
            });

            user_result.save(function(err, updated_user_result){
                req.session.user = updated_user_result;
                res.send('User was removed from this project');
            });
        });
    }
});

module.exports = router;