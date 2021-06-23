const { v4: uuidv4 } = require('uuid')
const faker = require('faker')

const {Permission} = require('../models')
const {School} = require('../models')
const {SchoolEmployee} = require('../models')

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let dataSchool = []
    let dataSchoolEmployee = []
    for (let index = 0; index < 100; index++) {
        let permissionId = await Permission.findOne({order : Sequelize.literal('rand()'), attributes: ['id']})
        let schoolId = await School.findOne({order : Sequelize.literal('rand()'), attributes: ['id']})
        const seedDataSchool = {
          id: uuidv4(),
          modelType : 'School',
          modelId : schoolId.id,
          permissionId : permissionId.id,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        dataSchool.push(seedDataSchool)
    }

    for (let index = 0; index < 200; index++) {
      let permissionId = await Permission.findOne({order : Sequelize.literal('rand()'), attributes: ['id']})
      let schoolEmployeeId = await SchoolEmployee.findOne({order : Sequelize.literal('rand()'), attributes: ['id']})
      const seedDataSchoolEmployee = {
        id: uuidv4(),
        modelType : 'SchoolEmployee',
        modelId : schoolEmployeeId.id,
        permissionId : permissionId.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      dataSchoolEmployee.push(seedDataSchoolEmployee)
  }

    await queryInterface.bulkInsert('ModelHasPermissions', dataSchool);
    return await queryInterface.bulkInsert('ModelHasPermissions', dataSchoolEmployee);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ModelHasPermissions', null, {});
  }
};
