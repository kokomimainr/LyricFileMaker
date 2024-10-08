"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LyricFile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "userId",
      });

      this.hasMany(models.String, {
        foreignKey: "lyricFileId",
      });
      
      this.hasMany(models.Favorites, {
        foreignKey: "lyricFileId",
      });

      this.hasMany(models.Comments, {
        foreignKey: "lyricFileId",
      });

      this.hasOne(models.PublicationRequest, {
        foreignKey: "lyricFileId",
      });
    }
  }
  LyricFile.init(
    {
      trackName: DataTypes.TEXT,
      public: DataTypes.BOOLEAN,
      userId: DataTypes.NUMBER,
      cover: DataTypes.TEXT
    },
    {
      sequelize,
      modelName: "LyricFile",
    }
  );
  return LyricFile;
};
