const {PhoneNumber, UserContacts} = require('../models');
const {successPresenter} = require('../utils/presenter');
const asyncHandler = require('express-async-handler');
const CustomError = require('../utils/CustomError');
const {isPhoneValid} = require("../utils/validator");

const createContact = asyncHandler(async (req, res, next) => {
    const {id} = req.user;
    const {phone} = req.body;

    if (!isPhoneValid([{phone}])) {
        return next(new CustomError(400, 'Check Your Phone Numbers'));
    }

    const contactId = await PhoneNumber.
        findOne({where: {phone: phone}}).
        then(result => {
            return result.userId;
        }).
        catch(err => {
            return next(new CustomError(400, 'There is no User with this Phone Number.'));
    });

    if (contactId === id){
        return next(new CustomError(400, 'Are You so Lonely???'));
    }

    const userContact = await UserContacts.create({userId : id, contactId}, {returning : true});

    return successPresenter(res, 'Contact Created.', userContact);
});

const listContacts = asyncHandler(async (req, res, next) => {
    const {id} = req.user;
    const contacts = [];

    const userContacts = await UserContacts.findAll({where : {userId : id}, include:['contacts']});

    userContacts.forEach(c => {
        contacts.push(c.contacts);
    });

    return successPresenter(res, 'Contacts Listed.', contacts);

});

module.exports = {
    createContact,
    listContacts
}