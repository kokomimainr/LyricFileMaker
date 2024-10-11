"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PublicationRequests", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      lyricFileId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "LyricFiles",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      approved: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
    await queryInterface.addIndex("PublicationRequests", ["lyricFileId", "userId"], {
      unique: true,
      name: "unique_publicationRequest_lyricFileId_userId",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("PublicationRequests", "unique_publicationRequest_lyricFileId_userId");
    await queryInterface.dropTable("PublicationRequests");
  },
};
