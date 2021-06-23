const { v4: uuidv4 } = require('uuid')
const faker = require('faker')
const bcrypt = require('bcrypt')

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let newData = []

    const firstData = {
      id: uuidv4(),
      name : 'Brighton',
      email: 'brighton@gamil.com',
      password: await bcrypt.hash('password', 8),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    newData.push(firstData)

    for (let index = 0; index < 5; index++) {
        const seedData = {
          id: uuidv4(),
          name : faker.name.findName(),
          email: faker.internet.email(),
          password: await bcrypt.hash('password', 8),
          createdAt: new Date(),
          updatedAt: new Date()
        }
        newData.push(seedData)
    }

    return await queryInterface.bulkInsert('BracketBricks', newData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('BracketBricks', null, {});
  }
};
