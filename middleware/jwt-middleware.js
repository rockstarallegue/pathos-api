const express = require('express');
const jwt = require('jsonwebtoken');
const middleware = express.Router();

const config = require('../config/jwt')
var msg = require('../helpers/messages')

middleware.use((req, res, next) => {
    //Authorization
    const token = req.headers['x-access-token']
    if (token) {
        // We check if the token is legit
        const decode = jwt.verify(token, config.key, (err, decoded) => {
            if(err)
                return res.status(401).json(msg.invalidToken)
            else   
                next() // Executes code when properly authenticated
        })
        
    }else{
        return  res.status(401).send(msg.tokenNotFound); // Missing token
    }
})

module.exports = middleware
