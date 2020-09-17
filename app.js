const express = require('express');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
//Database
const db = require('./config/database');

//Test the Database connection
db.authenticate()
    .then(() => console.log('Database Connected....'))
    .catch(err => console.log('Error: '+ err))

const app =  express();

//Handlebars
app.engine('handlebars',exphbs({defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars)}));
app.set('view engine', 'handlebars');

//Body Parser
app.use(bodyParser.urlencoded({ extended: false}));

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Index Route
app.get('/', (req,res) => res.render('index', {layout: 'landing'}));

//Gig routes
app.use('/gigs', require('./routes/gigs'));

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server Started at port ${PORT}`));