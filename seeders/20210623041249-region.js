const path = require('path');
const fs = require('fs')

const db = require('./../models')

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let sqlFileProvinces = './region/provinces_from_rajaongkir.sql'
    let sqlFileRegencies = './region/regencies_from_rajaongkir.sql'
    let sqlFileDistricts = './region/districs_from_rajaongkir.sql'
    let sqlPathProvinces = path.join(__dirname, sqlFileProvinces)
    let sqlPathRegencies = path.join(__dirname, sqlFileRegencies)
    let sqlPathDistricts = path.join(__dirname, sqlFileDistricts)
    let sqlProvinces = fs.readFileSync(sqlPathProvinces, 'utf-8')
    let sqlRegencies = fs.readFileSync(sqlPathRegencies, 'utf-8')
    let sqlDistricts = fs.readFileSync(sqlPathDistricts, 'utf-8')
    await db.sequelize.query(sqlProvinces)
    await db.sequelize.query(sqlRegencies)
    await db.sequelize.query(sqlDistricts)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
