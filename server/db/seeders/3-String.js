"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Strings",
      [
        {
          text: "Is this the real life? Is this just fantasy?",
          stringNumber: 1,
          lyricFileId: 1,
        },
        {
          text: "Caught in a landslide, no escape from reality.",
          stringNumber: 2,
          lyricFileId: 1,
        },
        {
          text: "Imagine there’s no heaven, it’s easy if you try.",
          stringNumber: 1,
          lyricFileId: 2,
        },
        {
          text: "No hell below us, above us only sky.",
          stringNumber: 2,
          lyricFileId: 2,
        },
        {
          text: "On a dark desert highway, cool wind in my hair.",
          stringNumber: 1,
          lyricFileId: 3,
        },
        {
          text: "Warm smell of colitas, rising up through the air.",
          stringNumber: 2,
          lyricFileId: 3,
        },
        {
          text: "With the lights out, it’s less dangerous.",
          stringNumber: 1,
          lyricFileId: 4,
        },
        {
          text: "Here we are now, entertain us.",
          stringNumber: 2,
          lyricFileId: 4,
        },
        {
          text: "The club isn’t the best place to find a lover.",
          stringNumber: 1,
          lyricFileId: 5,
        },
        { text: "So the bar is where I go.", stringNumber: 2, lyricFileId: 5 },
        { text: "We could have had it all.", stringNumber: 1, lyricFileId: 6 },
        { text: "Rolling in the deep.", stringNumber: 2, lyricFileId: 6 },
        {
          text: "She’s just a girl, and she’s on fire.",
          stringNumber: 1,
          lyricFileId: 7,
        },
        { text: "This girl is on fire.", stringNumber: 2, lyricFileId: 7 },
        {
          text: "There’s a lady who’s sure all that glitters is gold.",
          stringNumber: 1,
          lyricFileId: 8,
        },
        {
          text: "And she’s buying a stairway to heaven.",
          stringNumber: 2,
          lyricFileId: 8,
        },
        {
          text: "She’s got a smile that it seems to me.",
          stringNumber: 1,
          lyricFileId: 9,
        },
        {
          text: "Reminds me of childhood memories.",
          stringNumber: 2,
          lyricFileId: 9,
        },
        {
          text: "When I look into her eyes.",
          stringNumber: 1,
          lyricFileId: 10,
        },
        {
          text: "I can see a love restrained.",
          stringNumber: 2,
          lyricFileId: 10,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Strings", null, {});
  },
};
