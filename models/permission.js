const { v4: uuidv4 } = require('uuid')

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Permission.hasMany(models.ModelHasPermission)
      // Permission.belongsToMany(models.School, {
      //   through: {
      //     model: models.ModelHasPermission,
      //     unique: false,
      //     scope: {
      //       modelType: 'School'
      //     }
      //   },
      //   foreignKey: 'modelId',
      //   constraints: false
      // });
    }
  };
  Permission.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Permission',
    paranoid: true,
  });

  Permission.beforeCreate( async (data) => {
      data.id = await uuidv4()
  })

  return Permission;
};