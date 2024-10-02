"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Strings",
      [
        {
          text: "String 1",
          stringNumber: 1,
          lyricFileId: 1,
        },
        {
          text: "String 2",
          stringNumber: 2,
          lyricFileId: 1,
        },
        {
          text: "String 3",
          stringNumber: 3,
          lyricFileId: 1,
        },
        {
          text: "String 1",
          stringNumber: 1,
          lyricFileId: 2,
        },
        {
          text: "String 2",
          stringNumber: 2,
          lyricFileId: 2,
        },
        {
          text: "String 3",
          stringNumber: 3,
          lyricFileId: 2,
        },
        {
          text: "String 1",
          stringNumber: 1,
          lyricFileId: 3,
        },
        {
          text: "String 2",
          stringNumber: 2,
          lyricFileId: 3,
        },
        {
          text: "String 3",
          stringNumber: 3,
          lyricFileId: 3,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Strings", null, {});
  },
};
