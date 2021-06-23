const { v4: uuidv4 } = require('uuid')
const faker = require('faker')
const bcrypt = require('bcrypt')

const {School} = require('../models')

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let newData = []
    for (let index = 0; index < 10000; index++) {
        let schoolId = await School.findOne({order : Sequelize.literal('rand()'), attributes: ['id']})
        let randNum = Math.floor(Math.random() * 9999999999999)
        const seedData = {
          id: uuidv4(),
          schoolId : schoolId.id,
          name : faker.name.findName(),
          nisn : randNum,
          nfcCode : randNum,
          class: faker.random.arrayElement(['IPA', 'IPS']),
          phone: faker.phone.phoneNumberFormat(),
          religion: faker.random.arrayElement(['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu', 'yang lainnya']),
          gender: faker.random.arrayElement(['laki-laki', 'Perempuan']),
          placeOfBirth: faker.address.city(),
          dateOfBirth: faker.date.between("2000-01-01", "2003-12-31"),
          address: faker.address.streetAddress(),
          email: faker.internet.email(),
          password: await bcrypt.hash('password', 8),
          createdAt: new Date(),
          updatedAt: new Date()
        }
        newData.push(seedData)
    }

    return await queryInterface.bulkInsert('Students', newData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Students', null, {});
  }
};
