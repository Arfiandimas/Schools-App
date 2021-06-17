'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ModelHasPermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ModelHasPermission.belongsTo(models.Permission, {foreignKey: 'permissionId'})

      ModelHasPermission.belongsTo(models.School, {
        foreignKey : 'modelId',
        constraints: false
      })
      
      ModelHasPermission.belongsTo(models.SchoolEmployee, {
        foreignKey : 'modelId',
        constraints: false
      })
    }
  };
  ModelHasPermission.init({
    modelType: DataTypes.STRING,
    modelId: DataTypes.INTEGER,
    permissionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ModelHasPermission',
  });
  return ModelHasPermission;
};