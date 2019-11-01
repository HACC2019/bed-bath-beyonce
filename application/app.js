const express = require('express');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const connection = require('./models/connection')

//Routes
const homepage = require('./routes/route-homepage');
const login = require('./routes/route-login');

//Start express server
const app = express();

//Connect with MongoDB
const path ='mongodb+srv://cluster0-6qtxk.mongodb.net/test'
connection();

//Setting view engine to use handlebars
app.engine('hbs', expressHandlebars({extname: '.hbs', defaultLayout: 'view-layout', layoutsDir: './views/'}));
app.set('view engine', 'hbs');

//Setting other middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('./assets'));

//Set routes pathways
app.use('/', homepage);
app.use('/login', login);

//Set server to listen to listen on defined port and log startup console
const port = 6066;
app.listen(port);
console.log(`Now listening on port ${port}`);