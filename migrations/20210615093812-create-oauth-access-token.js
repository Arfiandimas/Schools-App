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
      oauthClientId: {
        allowNull: false,
        type: Sequelize.STRING,
        references : {
          model: 'OauthClients',
          key: 'id'
        }
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
      expiresAt: {
        allowNull: false,
        type: Sequelize.DATE
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
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('OauthAccessTokens');
  }
};