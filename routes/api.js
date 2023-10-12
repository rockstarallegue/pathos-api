const { request, response, Router } = require('express');
var express = require('express');
var router = express.Router();

var u_controller = require('../controllers/user.controller'); 

// USERS
// Metodo de LOGIN en [login.js] (routes/login.js)
router.get('/user/', u_controller.GET);

module.exports = router;
