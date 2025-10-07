const jwt = require("jsonwebtoken");
const secret = require("../config.js");

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

    const token = req.headers.authorization;
    
    try {
        const words = token.split(" ");
        const jwtToken = words[1];

        const response = jwt.verify(jwtToken, secret);

        if(response.username) {
            req.username = response.username        // making username accessible to all the other endpoints which might need it
            next();
        } 
    } catch(err) {
        res.status(403).json({
            msg : "You are not an authenticated user"
        })
    }
}

module.exports = userMiddleware;