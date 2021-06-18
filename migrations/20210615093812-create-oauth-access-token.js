'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OauthAccessTokens', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
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
        type: Sequelize.UUID
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
    await queryInterface.dropTable('OauthAccessTokens');
  }
};