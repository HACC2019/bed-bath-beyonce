const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const expressSession = require('express-session');
const connection = require('./models/connection')

//Routes
const main = require('./routes/route-main');
const homepage = require('./routes/route-homepage');
const login = require('./routes/route-login');
const account = require('./routes/route-account');
const project = require('./routes/route-project');
const addProject = require('./routes/route-add-project');

//Start express server
const app = express();

//Connect with MongoDB
connection();

//Setting view engine to use handlebars
//app.engine('hbs', expressHandlebars({extname: '.hbs', defaultLayout: 'layout', layoutsDir: './views/'}));
app.set('view engine', 'ejs');

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
app.use('/homepage', homepage);
app.use('/login', login);
app.use('/account', account);
app.use('/project', project);
app.use('/add-project', addProject);

//Set server to listen to listen on defined port and log startup console
const port = 6066;
app.listen(port);
console.log(`DOE application listening on port ${port}`);