const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    const {SECRET_KEY, EXPIRE} = process.env;
    return jwt.sign({id}, SECRET_KEY, {expiresIn: EXPIRE});
}

module.exports = generateToken;