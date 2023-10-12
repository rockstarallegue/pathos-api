const { request, response } = require('express');
var express = require('express');
var router = express.Router();

router.get('/', (request, response) => {
    response.send('index');
});

module.exports = router;
