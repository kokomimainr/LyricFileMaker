'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class String extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.LyricFile, {
        foreignKey: 'lyricFileId'
      })

      this.hasMany(models.TimeCode, {
        foreignKey: 'stringId'
      })
    }
  }
  String.init({
    text: DataTypes.TEXT,
    stringNumber: DataTypes.NUMBER,
    lyricFileId: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'String',
  });
  return String;
};