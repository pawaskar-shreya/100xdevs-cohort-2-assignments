/**
    - What happens IRL is a user signs up and sends their usename and password. These are then stored in a db
    - The user comes back again to sign in, where they send their username and password and if both are correct and valid and exist in out db, we send them a jwt token
    - Now for every new request to the server, the user sends this authorization token in the headers and that is authenticated every time
    - The jwt only encodes the username. Never put a password in the jwt 
    - JWT saves us a db call as we do have to check for the existence of a particular username and password again and again. We just have to in memory vreify if a particular jwt was signed by the secret that only we possess.
 */


const secret = require("../config.js");
const jwt = require('jsonwebtoken');

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

    const token = req.headers.authorization;

    // authorization: Bearer afaiwemcaoweijf....
    try {
        const words = token.split(" ");
        const jwtToken = words[1];

        const response = jwt.verify(jwtToken, secret);

        if(response.username) {
            next();
        } 
    } catch(err) {
        res.status(403).json({
            msg : "You are not an authenticated admin"
        })
    }
}

module.exports = adminMiddleware;