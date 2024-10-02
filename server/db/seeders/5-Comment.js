"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Comments",
      [
        {
          userId: 1,
          lyricFileId: 1,
          content: "Comment 1",
        },
        {
          userId: 2,
          lyricFileId: 1,
          content: "Comment 2",
        },
        {
          userId: 3,
          lyricFileId: 1,
          content: "Comment 3",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Comments", null, {});
  },
};
