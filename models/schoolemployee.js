const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt')

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SchoolEmployee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SchoolEmployee.belongsTo(models.School, {foreignKey: 'schoolId'})
      SchoolEmployee.hasMany(models.ModelHasPermission, {
        foreignKey : 'modelId',
        constraints : false,
        scope : {
          modelType : 'SchoolEmployee' 
        }
      })

    }
  };
  SchoolEmployee.init({
    schoolId: DataTypes.UUID,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SchoolEmployee',
    paranoid: true,
  });

  SchoolEmployee.beforeCreate( async (schoolemployee) => {
      schoolemployee.id = await uuidv4()
      schoolemployee.password = await bcrypt.hash(schoolemployee.password, 8)
  })

  SchoolEmployee.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());

    delete values.password;
    return values;
  }

  return SchoolEmployee;
};