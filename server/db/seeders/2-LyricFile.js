"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "LyricFiles",
      [
        {
          trackName: "Track 1",
          public: true,
          userId: 1,
        },
        {
          trackName: "Track 2",
          public: true,
          userId: 2,
        },
        {
          trackName: "Track 3",
          public: true,
          userId: 3,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("LyricFiles", null, {});
  },
};
