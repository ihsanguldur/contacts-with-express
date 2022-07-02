const {User} = require('../models');
const {successPresenter} = require('../utils/presenter');
const asyncHandler = require('express-async-handler');
const CustomError = require('../utils/CustomError');
const generateToken = require('../utils/generateJWT');

const login = asyncHandler(async (req, res, next) => {
    const {id} = req.body;

    const user = await User.findByPk(id, {include : ['phonenumbers','usercontacts']});
    if(!user){
        return next(new CustomError(401, 'User Not Found.'));
    }

    const token = generateToken(id);

    return successPresenter(res, 'Logged.', {token, user});
});

module.exports = {
    login
}