const { v4: uuidv4 } = require('uuid')
const faker = require('faker')

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let newData = []
    for (let index = 0; index < 2; index++) {
      const seedData = {
        id: uuidv4(),
        name: faker.random.arrayElement(['attendance', 'grade']),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      newData.push(seedData)
  }

  return await queryInterface.bulkInsert('Permissions', newData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Permissions', null, {});
  }
};
