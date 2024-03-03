const {
    response
} = require('express');

// mysql connection
var config = require('../helpers/config');
var pool = config.pool;

// messages
var msg = require('../helpers/messages')

// the pathchain
const pathchain = require("pathchain");

/**
 * INCEPT_ENTITY
 * [Function that incepts new entities into the pathchain]
 * @return response/error 
 */
module.exports.INCEPT_ENTITY = (body, response) => {
    console.log("Entity body: ", body);
}


/**
 * INCEPT_NODE
 * [Function that incepts new nodes into the pathchain]
 * 
 * @param body.owner [optional]
 * @param body.ancestor [optional]
 * @param body.content [required]
 * 
 * @return response/error 
 */
module.exports.INCEPT_NODE = (body, response) => {
    
    console.log("Node body: ", body);

    // origin verification
    if(body.owner == null || body.owner == ""){
        body.owner = pathchain.makePioneer();
    }

    if(body.content == null || body.content == ""){
        return msg.inc_node_missing_content;
    }

    // the node creation
    body.id = pathchain.makeNode(body.owner, body.content);

    // ancestor verification
    if(body.ancestor == null || body.ancestor == ""){
        body.ancestor = body.id;
    }

    // the actual inception
    var sql = "INSERT INTO node VALUES ('" + body.id + "', '" + body.owner + "', '" + body.ancestor + "')";
    pool.query(sql, function (err, result) {
        if (err) throw err;
        console.log("node inserted");
    });

    response.json({
        message: msg.inc_node_succ,
    })
}
