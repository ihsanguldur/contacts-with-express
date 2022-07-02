'use strict';
const {
    Model
} = require('sequelize');
const {UserContacts} = require("./index");
module.exports = (sequelize, DataTypes) => {
    class UserContacts extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            UserContacts.belongsTo(models.User, {
                as: 'userid',
                foreignKey: 'userId',
                onDelete: 'cascade',
                onUpdate: 'cascade',
                hooks: true
            });

            UserContacts.belongsTo(models.User, {
                as: 'contacts',
                foreignKey: 'contactId',
                onDelete: 'cascade',
                onUpdate: 'cascade',
                hooks: true
            });
        }
    }

    UserContacts.init({
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: 'cascade',
            onUpdate: 'cascade',
            references: {
                model: 'users',
                key: 'id'
            }
        },
        contactId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: 'cascade',
            onUpdate: 'cascade',
            references: {
                model: 'users',
                key: 'id'
            }
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        deletedAt: {
            type: DataTypes.DATE
        }
    }, {
        sequelize,
        modelName: 'UserContacts',
        paranoid : true
    });

    UserContacts.removeAttribute('id');
    return UserContacts;
};