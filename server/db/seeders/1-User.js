"use strict";
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "John Doe",
          email: "example@example.com",
          password: await bcrypt.hash('123', 10),
        },
        {
          username: "Jane Doe",
          email: "Jane@example.com",
          password: await bcrypt.hash('123', 10),
        },
        {
          username: "Bob Doe",
          email: "1@1.com",
          password: await bcrypt.hash('1', 10),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Users', null, {});
  },
};
