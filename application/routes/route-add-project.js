const express = require('express');
var router = express.Router();

const moment = require('moment');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './assets/uploads');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});
const upload = multer({storage: storage});

//Import project schema to read and write to that collection in database
var Project = require('../models/model-project');

router.get('/', function(req, res){

    res.render('view-add-project', {
        title: 'add project',
        project_errors: JSON.stringify(req.session.project_errors),
        project_data: JSON.stringify(req.session.project_data),
        user: req.session.user
    });

    req.session.project_errors = null;
    req.session.save();
});

router.post('/submit', upload.single('photo'), function(req, res){

    //Save filled form data
    req.session.project_data = [
        {
            name: 'title',
            value: req.body.title
        },
        {
            name: 'description',
            value: req.body.description
        },
        {
            name: 'school',
            value: req.body.school
        },
        {
            name: 'address',
            value: req.body.address
        },
        {
            name: 'sdate',
            value: req.body.sdate
        },
        {
            name: 'edate',
            value: req.body.edate
        }
    ];

    req.check('photo', 'Photo is required').notEmpty();
    req.check('title', 'Title is required').notEmpty();
    req.check('description', 'Description is required').notEmpty();
    req.check('school', 'School is required').notEmpty();
    req.check('address', 'address is required').notEmpty();
    req.check('sdate', 'Start date is required').notEmpty();
    req.check('edate', 'End date is required').notEmpty();

    //Store errors
    var errors = req.getValidationResult();

    errors.then(function(result) {
        //Store errors as array for easy handling
        //Each field will only throw one error
        req.session.project_errors = result.array({ onlyFirstError: true });

        //If errors exist, remain on signup page with errors shown
        if (req.session.project_errors.length > 0) {
            // console.log('project creation contains errors:');
            // console.log(req.session.project_errors);
            res.redirect('/add-project');
        } 
        //If no errors, user session set and return to homepage
        else {
            if(req.session.user != null && req.session.user.account_type == 'professional'){
                var project = new Project({
                    posted_by: req.session.user._id,
                    title: req.body.title,
                    description: req.body.description,
                    start_date: new Date(moment(req.body.sdate).local().format()),
                    end_date: new Date(moment(req.body.edate).local().format()),
                    address: req.body.address,
                    photo: req.file.originalname,
                    date_posted: new Date()
                });
        
                project.save(function(err, result){
                    if(err) throw err;
                    console.log('MongoDB >> Project saved');
                    res.redirect('/');
                });
            }
            else{
                console.log('Must log in to use add project feature');
            }
        }
    });

});

module.exports = router;