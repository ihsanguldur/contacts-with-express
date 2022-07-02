class CustomError extends Error {
    constructor(status, message){
        super(message);
        this.status = status;
        this.name = 'customError';
    }
}

module.exports = CustomError;