'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class School extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      School.hasMany(models.SchoolEmployee)
      School.hasMany(models.Student)
      School.hasMany(models.ModelHasPermission, {
        foreignKey : 'modelId',
        constraints : false,
        scope : {
          modelType : 'School' 
        }
      })

    }
  };
  
  School.init({
    name: DataTypes.STRING,
    logo: DataTypes.STRING,
    npsn: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'School',
  });
  return School;
};