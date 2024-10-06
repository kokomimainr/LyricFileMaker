'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PublicationRequest extends Model {
    
    static associate(models) {

      this.belongsTo(models.User, {
        foreignKey: 'userId',
      });

      this.belongsTo(models.LyricFile, {
        foreignKey: 'lyricFileId',
      });
    }
  }
  PublicationRequest.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      }
    },
    lyricFileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "LyricFiles",
        key: "id",
      }
    },
  }, {
    sequelize,
    modelName: 'PublicationRequest',
  });
  return PublicationRequest;
};