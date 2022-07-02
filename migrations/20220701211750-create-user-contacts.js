'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('UserContacts', {
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'cascade',
                onUpdate: 'cascade',
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            contactId: {
                type: Sequelize.INTEGER,
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
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            deletedAt: {
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('UserContacts');
    }
};