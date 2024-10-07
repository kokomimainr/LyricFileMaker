'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.LyricFile, {
        foreignKey: 'userId'
      })

      this.hasMany(models.Favorites, {
        foreignKey: 'userId'
      })

      this.hasMany(models.Comments, {
        foreignKey: 'userId'
      })

      this.hasMany(models.PublicationRequest, {
        foreignKey: 'userId'
      })
    }
  }
  User.init({
    username: DataTypes.TEXT,
    email: DataTypes.TEXT,
    password: DataTypes.TEXT,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};