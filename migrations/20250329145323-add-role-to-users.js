'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Users', 'role', {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'user', // Default role is 'user'
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Users', 'role');
    },
};