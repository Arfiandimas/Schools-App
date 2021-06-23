'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Students', {
      fields: ['nfcCode'],
      type: 'unique',
      name: 'nfcCode'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Constraits');
  }
};