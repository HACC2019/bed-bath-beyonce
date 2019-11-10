const express = require('express');
var router = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './assets/uploads');
    },
    filename: function(req, file, cb){
        cb(null, `${file.originalname}`);
    }
});
const upload = multer({storage: storage});

//Import project schema to read and write to that collection in database
var Project = require('../models/model-project');

router.get('/', function(req, res){

    res.render('view-add-project', {
        title: 'add project',
        user: req.session.user
    });
});

router.post('/submit', upload.single('photo'), function(req, res){
    
    if(req.file){
        console.log(req.file);
    }
    else{
        console.log('PHOTO NOT FOUND');
    }

    if(req.session.user){
        var project = new Project({
            posted_by: req.session.user._id,
            title: req.body.title,
            description: req.body.description,
            start_date: req.body.sdate,
            end_date: req.body.edate,
            location: req.body.location,
        });

    }
});

module.exports = router;