const { v4: uuidv4 } = require('uuid')

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('OauthClients', [{
      id: uuidv4(),
      name: 'jwt',
      secret: 'lkjhgfdsaqwertyuiopmnbvcxzzxcvbnmpoiuytrewqasdfghjkl',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('OauthClients', null, {});
  }
};
