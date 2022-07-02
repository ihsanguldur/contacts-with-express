'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasMany(models.PhoneNumber, {
                as: 'phonenumbers',
                foreignKey: 'userId',
                onDelete: 'cascade',
                onUpdate: 'cascade',
                hooks: true
            });
            User.hasMany(models.UserContacts, {
                as: 'usercontacts',
                foreignKey: 'userId',
                onDelete: 'cascade',
                onUpdate: 'cascade',
                hooks: true
            });
            User.hasMany(models.UserContacts, {
                as: 'contactsuser',
                foreignKey: 'contactId',
                onDelete: 'cascade',
                onUpdate: 'cascade',
                hooks: true
            });

            /*User.belongsToMany(User, {through : 'UserContacts'});*/
        }
    }

    User.init({
        firstName: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        company: DataTypes.STRING(40),
        deletedAt: {
            type: DataTypes.DATE
        }
    }, {
        sequelize,
        modelName: 'User',
        paranoid: true
    });
    /*sequelize.sync({ force: true});*/
    return User;
};