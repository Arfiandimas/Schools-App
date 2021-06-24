'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OauthClient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  OauthClient.init({
    name: DataTypes.STRING,
    secret: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'OauthClient',
    paranoid: true,
  });
  return OauthClient;
};