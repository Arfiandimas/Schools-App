'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AccessTokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      payload: {
        allowNull: false,
        type: Sequelize.STRING
      },
      secretKey: {
        allowNull: false,
        type: Sequelize.STRING
      },
      modelType: {
        allowNull: false,
        type: Sequelize.STRING
      },
      modelId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      scope: {
        allowNull: false,
        type: Sequelize.STRING
      },
      revoked: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('AccessTokens');
  }
};