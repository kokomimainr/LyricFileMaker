"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Favorites", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      lyricFileId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "LyricFiles",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
    await queryInterface.addIndex("Favorites", ["lyricFileId", "userId"], {
      unique: true,
      name: "unique_favorite_lyricFileId_userId",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("Favorites", "unique_favorite_lyricFileId_userId");
    await queryInterface.dropTable("Favorites");
  },
};
