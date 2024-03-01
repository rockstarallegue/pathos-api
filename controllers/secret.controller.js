const {
    response
} = require('express');

const config = require('../config/jwt');

const jwt = require('jsonwebtoken');
var msg = require('../helpers/messages')

const bcrypt = require('bcrypt');
const saltRounds = 10;

const pathos = require("pathos-proto-infra"); // Importamos el paquete
var fs = require("fs");

const checker = require("../checker");


/**
 * GET_PIONEER_SECRET
 * [Function that returns the pioneer's secret]
 * @return response/error 
 */
module.exports.GET_PIONEER_SECRET = (request, response) => {
    // Creating the pioneer if it doesn't exists (remains the same)
    const pioneer = pathos.makePioneer();
    var secret_obj = {}
    // console.log("PIONEER BUFFER: ", pioneer)

    checker.checkDir("files/"+pioneer+"/secrets/")
    // No pioneer secret
    if(checker.checkEmptyDir("files/"+pioneer+"/secrets/")){
        const secret = pathos.makeSecret();
        console.log("PIONEER SECRET BUFFER: ", secret)

        secret_obj = pathos.getSecretObj(secret);
    }
    else{
        secret_obj = checker.checkFiles('files/'+pioneer+'/secrets/')[0];
    }

    const pioneer_obj = pathos.getPioneerObj(pioneer);

    response.json({
        message: "GET PIONEER SECRET",
        pioneer: pioneer_obj,
        results: secret_obj
    })
}
