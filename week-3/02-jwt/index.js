const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';
const zod = require('zod');


/**
 * Generates a JWT for a given username and password.
 *
 * @param {string} username - The username to be included in the JWT payload.
 *                            Must be a valid email address.
 * @param {string} password - The password to be included in the JWT payload.
 *                            Should meet the defined length requirement (e.g., 6 characters).
 * @returns {string|null} A JWT string if the username and password are valid.
 *                        Returns null if the username is not a valid email or
 *                        the password does not meet the length requirement.
 */
function signJwt(username, password) {
    // Your code here

    const schema = zod.object({
        username : zod.string().email(),
        password : zod.string().min(6)
    });

    const parsedUser = schema.safeParse({
        username : username,
        password : password
    });

    if(parsedUser.success) {
        return jwt.sign({username, password}, jwtPassword);
    } else {
        return null;
    }
}

/**
 * Verifies a JWT using a secret key.
 *
 * @param {string} token - The JWT string to verify.
 * @returns {boolean} Returns true if the token is valid and verified using the secret key.
 *                    Returns false if the token is invalid, expired, or not verified
 *                    using the secret key.
 */
function verifyJwt(token) {
    // Your code here

    try {
        let verified = jwt.verify(token, jwtPassword);
        return true;
    } catch(err) {
        return false;
    }
}

/**
 * Decodes a JWT to reveal its payload without verifying its authenticity.
 *
 * @param {string} token - The JWT string to decode.
 * @returns {object|false} The decoded payload of the JWT if the token is a valid JWT format.
 *                         Returns false if the token is not a valid JWT format.
 */
function decodeJwt(token) {
    // Your code here

    try {
        let decoded = jwt.decode(token);

        // This step is necessary as this is where we get an error raised. Otherwise true is returned for all 3 cases. 
        // When we try to access payload of a jwt which is not valid, that is when we get an exception and hence err is thrown and then false is returned
        console.log(decoded.payload);               

        return true;
    } catch(err) {
        // console.log(err);
        return false;
    }

}


module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};
