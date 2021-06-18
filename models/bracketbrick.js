const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BracketBrick extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  BracketBrick.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BracketBrick',
  });

  BracketBrick.beforeCreate( async (user) => {
      user.id = await uuidv4()
      user.password = await bcrypt.hash(user.password, 8)
  })

  BracketBrick.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());

    delete values.password;
    return values;
  }

  return BracketBrick;
};