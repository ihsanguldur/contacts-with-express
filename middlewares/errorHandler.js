const {errorPresenter} = require("../utils/presenter");

let status = 500;
let message = 'Something Gone Wrong.';

//TODO: hata alınca son hata mesajında takılıyor bak buna.
const errorHandler = (err, req, res, next) => {
    if (err.name === 'customError') {
        status = err.status;
        message = err.message;
    }else if (err.name === 'SequelizeValidationError') {
        status = 400;
        message = 'Please Check Your Inputs.';
    }else if (err.name === 'SequelizeUniqueConstraintError') {
        status = 400;
        message = err.errors[0].value + ' is Already in Use.'
    }else if (err.name === 'JsonWebTokenError'){
        status = 401;
        message = err.message;
    }
    return errorPresenter(res, message, status);
}

module.exports = errorHandler;

