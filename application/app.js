const express = require('express');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const expressSession = require('express-session');
const connection = require('./models/connection')

//Routes
const main = require('./routes/route-main');
const login = require('./routes/route-login');
const projectPage = require('./routes/route-project-page');

//Start express server
const app = express();

//Connect with MongoDB
connection();

//Setting view engine to use handlebars
app.engine('hbs', expressHandlebars({extname: '.hbs', defaultLayout: 'layout', layoutsDir: './views/'}));
app.set('view engine', 'hbs');

//Setting other middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressValidator());
app.use(expressSession({
    secret: 'max',
    saveUninitialized: false,
    resave: false
}));
app.use(express.static('./assets'));

//Set routes pathways
app.use('/', main);
app.use('/login', login);
app.use('/project-page', projectPage);

//Set server to listen to listen on defined port and log startup console
const port = 6066;
app.listen(port);
console.log(`DOE application listening on port ${port}`);