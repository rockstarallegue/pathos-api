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
}