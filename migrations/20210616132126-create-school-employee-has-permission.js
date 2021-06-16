'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SchoolEmployeeHasPermissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      schoolEmployeeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references : {
          model: 'SchoolEmployee',
          key: 'id'
        }
      },
      permissionId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references : {
          model: 'Permission',
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
    await queryInterface.dropTable('SchoolEmployeeHasPermissions');
  }
};