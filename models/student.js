'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Student.belongsTo(models.School, {foreignKey: 'schoolId'})
    }
  };
  Student.init({
    schoolId: DataTypes.UUID,
    name: DataTypes.STRING,
    nisn: DataTypes.STRING,
    phone: DataTypes.STRING,
    religion: DataTypes.ENUM('Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu', 'yang lainnya'),
    gender: DataTypes.ENUM('laki-laki', 'Perempuan'),
    placeOfBirth: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};