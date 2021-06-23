'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Districts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      provinceId: {
        type: Sequelize.INTEGER,
        references : {
          model: 'Provinces',
          key: 'id'
        }
      },
      regencyId: {
        type: Sequelize.INTEGER,
        references : {
          model: 'Regencies',
          key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Districts');
  }
};