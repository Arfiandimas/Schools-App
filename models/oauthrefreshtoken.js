'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OauthRefreshToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  OauthRefreshToken.init({
    oauthAccessTokenId: DataTypes.UUID,
    revoked: DataTypes.BOOLEAN,
    expiresAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'OauthRefreshToken',
    paranoid: true,
  });
  return OauthRefreshToken;
};