const { v4: uuidv4 } = require('uuid')
const faker = require('faker')
const bcrypt = require('bcrypt')

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let newData = []

    for (let index = 0; index < 500; index++) {
        const seedData = {
          id: uuidv4(),
          name : faker.company.companyName(),
          districtId : Math.floor(Math.random() * 12) + 2930,
          logo: faker.image.business(),
          npsn: Math.floor(Math.random() * 9999999999999),
          email: faker.internet.email(),
          password: await bcrypt.hash('password', 8),
          createdAt: new Date(),
          updatedAt: new Date()
        }
        newData.push(seedData)
    }

    return await queryInterface.bulkInsert('Schools', newData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Schools', null, {});
  }
};
