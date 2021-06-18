const { v4: uuidv4 } = require('uuid');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OauthAccessToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  OauthAccessToken.init({
    payload: DataTypes.STRING,
    secretKey: DataTypes.STRING,
    modelType: DataTypes.STRING,
    modelId: DataTypes.UUID,
    scope: DataTypes.STRING,
    revoked: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'OauthAccessToken',
  });

  OauthAccessToken.beforeCreate( async (oauthAccessToken) => {
      oauthAccessToken.id = await uuidv4()
  })

  return OauthAccessToken;
};