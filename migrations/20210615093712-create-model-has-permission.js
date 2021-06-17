'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ModelHasPermissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      modelType: {
        allowNull: false,
        type: Sequelize.STRING
      },
      modelId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      permissionId: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ModelHasPermissions');
  }
};