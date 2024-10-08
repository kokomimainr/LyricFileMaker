"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "TimeCodes",
      [
        { stringId: 1, time: "00:00:10" },
        { stringId: 1, time: "00:00:30" },
        { stringId: 2, time: "00:01:00" },
        { stringId: 2, time: "00:01:20" },
        { stringId: 3, time: "00:01:40" },
        { stringId: 3, time: "00:02:00" },
        { stringId: 4, time: "00:02:20" },
        { stringId: 4, time: "00:02:40" },
        { stringId: 5, time: "00:03:00" },
        { stringId: 5, time: "00:03:20" },
        { stringId: 6, time: "00:03:40" },
        { stringId: 6, time: "00:04:00" },
        { stringId: 7, time: "00:04:20" },
        { stringId: 7, time: "00:04:40" },
        { stringId: 8, time: "00:05:00" },
        { stringId: 8, time: "00:05:20" },
        { stringId: 9, time: "00:05:40" },
        { stringId: 9, time: "00:06:00" },
        { stringId: 10, time: "00:06:20" },
        { stringId: 10, time: "00:06:40" },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("TimeCodes", null, {});
  },
};
