const {
    response
} = require('express');

const jwt_config = require('../config/jwt');

var config = require('../helpers/config'); // Variable que contiene la ruta del config.js
var pool = config.pool; // Crear la conexion con los datos almacenados en config

var msg = require('../helpers/messages')

const pathchain = require("pathchain"); // Importamos el paquete

const incept = require('../controllers/inception.controller');

var fs = require("fs");

const checker = require("../checker");


/**
 * SEED_ENTITY_TYPE
 * [Function that incepts new entity types into the database]
 * @return response/error 
 */
module.exports.SEED_ENTITY_TYPE = (request, response) => {
    var bod = request.body;

    console.log("Las partes del body: ", bod);
    
    var node_inception_body = new Object();
    node_inception_body.content = bod.name;
    var node_inception = incept.INCEPT_NODE(node_inception_body);

    console.log("Node inception results:", node_inception);

    
    response.json({
        mensaje: msg.seed_entity_type_succ,
        results: "Aqui van los resultados"
    })
}
