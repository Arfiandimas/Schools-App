const { v4: uuidv4 } = require('uuid')
const faker = require('faker')
const bcrypt = require('bcrypt')

const {School} = require('../models')

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let newData = []
    for (let index = 0; index < 1000; index++) {
        let schoolId = await School.findOne({order : Sequelize.literal('rand()'), attributes: ['id']})
        const seedData = {
          id: uuidv4(),
          schoolId : schoolId.id,
          name : faker.name.findName(),
          email: faker.internet.email(),
          password: await bcrypt.hash('password', 8),
          createdAt: new Date(),
          updatedAt: new Date()
        }
        newData.push(seedData)
    }

    return await queryInterface.bulkInsert('SchoolEmployees', newData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SchoolEmployees', null, {});
  }
};
