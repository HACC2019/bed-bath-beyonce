const express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('view-homepage');
});

module.exports = router;