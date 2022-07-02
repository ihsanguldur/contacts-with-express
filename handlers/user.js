const {User, PhoneNumber, UserContacts, sequelize} = require('../models');
const {successPresenter} = require('../utils/presenter');
const asyncHandler = require('express-async-handler');
const CustomError = require('../utils/CustomError');
const {isPhoneValid} = require("../utils/validator");
const {Op} = require('sequelize');

const create = asyncHandler(async (req, res, next) => {
    const {firstName, lastName, company, phoneNumbers} = req.body;

    if (firstName === '' || lastName === '' || phoneNumbers === '' || phoneNumbers === undefined || phoneNumbers.length === 0) {
        return next(new CustomError(400, 'Please Check Your Inputs.'));
    }

    if (!isPhoneValid(phoneNumbers)) {
        return next(new CustomError(400, 'Check Your Phone Numbers.'));
    }

    let uniquePhones = phoneNumbers.filter((phone, i, self) =>
        i === self.findIndex(p => (p.phone === phone.phone))
    );

    const numbers = await PhoneNumber.findAll({
        where: {
            [Op.or]: [
                ...uniquePhones
            ]
        }
    });

    let user = null;
    if (numbers.length === 0) {
        user = await User.create({
            firstName,
            lastName,
            company,
            phonenumbers: [...uniquePhones]
        }, {include: 'phonenumbers'});
    } else {
        return next(new CustomError(400, numbers[0].dataValues.phone + ' Already in Use.'));
    }

    return successPresenter(res, 'User Created.', user);
});

const searchUser = asyncHandler(async (req, res, next) => {
    const {q} = req.query;

    const users = await sequelize.query(`
        SELECT DISTINCT users.id,users.createdAt,users.updatedAt,users.deletedAt,users.firstName,users.lastName,users.company
        FROM users, phonenumbers
        WHERE
            users.deletedAt IS NULL AND
            ((
                (LOWER(users.firstName) LIKE LOWER('%${q}%')OR 
                LOWER(users.lastName) LIKE LOWER('%${q}%') OR 
                CONCAT(LOWER(users.firstName),' ',LOWER(users.lastName)) LIKE LOWER('%${q}%') OR 
                CONCAT(LOWER(users.lastName),' ',LOWER(users.firstName)) LIKE LOWER('%${q}%')) OR
                LOWER(users.company) LIKE LOWER('%${q}%')) OR
                (phonenumbers.userId = users.id AND (phonenumbers.phone LIKE '%${q}%')))`);

    if (users[0].length === 0) {
        return next(new CustomError(400, 'User Not Found.'));
    }

    return successPresenter(res, 'Users Found.', users[0]);

});

const deleteUser = asyncHandler(async (req, res, next) => {
    const {id} = req.user;

    await User.findOne({
        where: {id},
        include: ['phonenumbers', 'usercontacts']
    }).then(result => {
        result.phonenumbers.forEach(p => {
            PhoneNumber.destroy({where : {id : p.id}})
        });

        result.usercontacts.forEach(u => {
            UserContacts.destroy({where : {userId : u.userId}})
        });

        result.destroy();
    });

    return successPresenter(res, 'User Deleted.', null);
});

const updateUser = asyncHandler(async (req, res, next) => {
    let {phoneNumbers} = req.body;
    const {id} = req.user;
    let user = null;

    if(phoneNumbers === undefined){
        phoneNumbers = [];
    }

    if (!isPhoneValid(phoneNumbers)) {
        return next(new CustomError(400, 'Check Your Phone Numbers.'));
    }

    let uniquePhones = phoneNumbers.filter((phone, i, self) =>
        i === self.findIndex(p => (p.phone === phone.phone))
    );

    let phones = [];
    phoneNumbers.forEach(p => {
        phones.push({phone : p.phone});
    });

    const numbers = await PhoneNumber.findAll({
        where: {
            [Op.or]: [
                ...phones
            ]
        },
        paranoid: false
    });

    if (numbers.length === 0 ){
        await User.findOne({
            where: {id},
            include: ['phonenumbers']
        }).then(result => {
            uniquePhones.forEach(p => {
                result.phonenumbers.forEach(phone => {
                    if(phone.id === p.id){
                        PhoneNumber.update({phone : p.phone},{where : {id : p.id}});
                    }
                });
            });
            user = result.update({...req.body},{where : {id}},{returning : true, plain : true});
            return user;
        }).then(result => {
            user = result;
        });
    }else {
        return next(new CustomError(400, numbers[0].dataValues.phone + ' Already in Use.'));
    }

    return successPresenter(res, 'User Updated.', user);
});


module.exports = {
    create,
    deleteUser,
    updateUser,
    searchUser
}