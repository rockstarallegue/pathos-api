const { request, response } = require('express');
var express = require('express');
var router = express.Router();

var s_controller = require('../controllers/seeder.controller'); 

router.post('/entity-type/', s_controller.SEED_ENTITY_TYPE);

module.exports = router;
