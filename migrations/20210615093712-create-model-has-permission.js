'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ModelHasPermissions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      modelType: {
        allowNull: false,
        type: Sequelize.STRING
      },
      modelId: {
        allowNull: false,
        type: Sequelize.UUID
      },
      permissionId: {
        allowNull: false,
        type: Sequelize.UUID,
        references : {
          model: 'Permissions',
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
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ModelHasPermissions');
  }
};