const { request, response } = require('express');
var express = require('express');
var router = express.Router();

var s_controller = require('../controllers/secret.controller'); 

router.get('/pioneer/', s_controller.GET_PIONEER_SECRET);

module.exports = router;
