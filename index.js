const express = require('express');
const middleware = require('./middleware/jwt-middleware');

const api = require('./routes/api');
const login = require('./routes/login');
const index = require('./routes/index');

const cors = require('cors');
const bodyParser = require('body-parser');

const host = '0.0.0.0';
const port = process.env.PORT || 3000;
const app = express(); 

app.use(cors());
// app.use(bodyParser.json({limit: '900mb'}));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Linking content from frontent folder
app.use(express.static(__dirname + '/frontend'));

// ROUTES
app.use('/api', middleware, api); // API middleware protected endpoints
app.use('/login', login); // Login page
app.use('', index); // Landing page

app.listen(port, () => {
    console.log('El servidor inicio en el puerto ' + port);
});