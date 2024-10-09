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
          email: "aaok412@gmail.com",
          password: await bcrypt.hash('123456', 10),
          isAdmin: false,
        },
        {
          username: "Jane Doe",
          email: "Jane@example.com",
          password: await bcrypt.hash('123', 10),
          isAdmin: false,
        },
        {
          username: "Bob Doe",
          email: "1@1.com",
          password: await bcrypt.hash('1', 10),
          isAdmin: false,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Users', null, {});
  },
};
