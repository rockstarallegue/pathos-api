module.exports = {
    loginSuccessfully: {
        "MesageType": "Success",
        "Message": "Sucessfull login",
        "Component": "Token/Authentication",
        "Authenticated": true
    },
    tokenNotFound: {
        "MesageType": "Error",
        "Message": "Token is missing",
        "Component": "Token/Authentication",
        "Authenticated": false
    },
    invalidToken: {
        "MesageType": "Error",
        "Message": "The given token is invalid",
        "Component": "Token/Authentication",
        "Authenticated": false
    },
    inc_node_missing_content: {
        "Component": "INCEPTION CONTROLLER :: NODE",
        "Message": "content is missing"
    },
    inc_node_succ: {
        "Component": "INCEPTION CONTROLLER :: NODE",
        "Message": "node incepted successfully"
    },
    seed_entity_type_succ: {
        "Component": "SEEDER CONTROLLER :: ENTITY TYPE",
        "Message": "entity type seeded successfully"
    },
}