const express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('view-homepage', {layout: false});
});

module.exports = router;