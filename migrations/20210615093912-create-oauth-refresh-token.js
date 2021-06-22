'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OauthRefreshTokens', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      oauthAccessTokenId: {
        allowNull: false,
        type: Sequelize.UUID,
        references : {
          model: 'OauthAccessTokens',
          key: 'id'
        }
      },
      revoked: {
        type: Sequelize.BOOLEAN
      },
      expiresAt: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('OauthRefreshTokens');
  }
};