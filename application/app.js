const express = require('express');
const bodyParser = require('body-parser');
const expressSession = require('express-session');

//Routes
const homepage = require('./routes/route-homepage');

//Start express server
const app = express();
const port = 6066;

//Set middleware
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(assetsPath));

//Set routes pathways
app.use('/')

//Set server to listen to listen on defined port and log startup console
app.listen(port);
console.log(`Now listening on port ${port}`);