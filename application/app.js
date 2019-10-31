const express = require('express');
const bodyParser = require('body-parser');
const expressSession = require('express-session');

//Start express server
const app = express();
const port = 6066;

//Set middleware
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.listen(port);
console.log(`Now listening on port ${port}`);