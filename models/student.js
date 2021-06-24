const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt')

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
    nfcCode: DataTypes.STRING,
    class: DataTypes.STRING,
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
    paranoid: true,
  });

  Student.beforeCreate( async (student) => {
      student.id = await uuidv4()
      student.password = await bcrypt.hash(student.password, 8)
  })

  Student.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());

    delete values.password;
    return values;
  }

  return Student;
};