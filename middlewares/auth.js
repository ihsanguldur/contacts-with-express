const jwt = require('jsonwebtoken');
const CustomError = require('../utils/CustomError');

const protect = (req, res, next) => {
    const {SECRET_KEY} = process.env;
    const bearer = req.headers['authorization'].split(' ')[1];
    jwt.verify(bearer, SECRET_KEY, (err, decoded) => {
        if(err) {
            return next(new CustomError(401, 'You Are not Authorized.'));
        }
        req.user = {id: decoded.id};
        return next();
    });
}

module.exports = {
    protect
}