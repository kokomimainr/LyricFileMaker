const { String } = require( "../../db/models");

class StringService {
  static async getStringsByLyricFileId(lyricFileId) {
    try {
      const strings = await String.findAll({
        where: {
          lyricFileId,
        },
      });

      return strings ? strings.map((string) => string.get()) : null;
    } catch ({ message }) {
      console.error(message);
    }
  }

  static async createString(lyricFileId, stringNumber, text) {
    try {
      const string = await String.create({
        lyricFileId,
        stringNumber,
        text,
      });
      return string ? string.get() : null;
    } catch ({ message }) {
      console.error(message);
    }
  }
}

module.exports = new StringService;
