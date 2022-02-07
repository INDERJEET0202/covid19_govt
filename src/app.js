const express = require('express');
const path = require('path');
require('./db/conn');
const User = require('./models/users');
const userRouter = require('./routers/user');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter); 

const static_path = path.join(__dirname, '../public');//-->> gets index.html from public folder and renders that page, if not found then it will render the index.html from the root folder
const template_path = path.join(__dirname, '../templates/views'); 
const partials_path = path.join(__dirname, '../templates/partials'); 


app.use(express.static(static_path));
app.set('view engine', 'hbs'); //-->> sets the view engine to hbs
app.set('views', template_path);
hbs.registerPartials(partials_path);


app.get("/", (req, res) => {
    res.render('index');
})

app.get('/register', (req, res) => {
    res.render('register');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})