'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
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

      this.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  }
  Comments.init({
    lyricFileId: DataTypes.NUMBER,
    userId: DataTypes.NUMBER,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};