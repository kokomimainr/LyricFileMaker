"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "TimeCodes",
      [
        {
          stringId: 1,
          time: "[00:01:00]",
        },
        {
          stringId: 2,
          time: "[00:02:00]",
        },
        {
          stringId: 3,
          time: "[00:03:00]",
        },
        {
          stringId: 4,
          time: "[00:04:00]",
        },
        {
          stringId: 5,
          time: "[00:05:00]",
        },      
        {
          stringId: 6,
          time: "[00:06:00]",
        },
        {
          stringId: 7,
          time: "[00:07:00]",
        },
        {
          stringId: 8,
          time: "[00:08:00]",
        },
        {
          stringId: 9,
          time: "[00:09:00]",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("TimeCodes", null, {});
  },
};
