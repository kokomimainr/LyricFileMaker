"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "LyricFiles",
      [
        { userId: 1, trackName: 'Bohemian Rhapsody - Queen', public: true },
        { userId: 1, trackName: 'Imagine - John Lennon', public: true },
        { userId: 2, trackName: 'Hotel California - Eagles', public: true },
        { userId: 2, trackName: 'Smells Like Teen Spirit - Nirvana', public: true },
        { userId: 3, trackName: 'Shape of You - Ed Sheeran', public: true },
        { userId: 3, trackName: 'Rolling in the Deep - Adele', public: true },
        { userId: 1, trackName: 'Billie Jean - Michael Jackson', public: true },
        { userId: 1, trackName: 'Someone Like You - Adele', public: true },
        { userId: 2, trackName: 'Stairway to Heaven - Led Zeppelin', public: true },
        { userId: 2, trackName: 'Sweet Child O Mine - Guns N Roses', public: true },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("LyricFiles", null, {});
  },
};
