const { String, TimeCode } = require( "../../db/models");

class StringService {
  static getStringsByLyricFileIdService = async(lyricFileId) => {
    try {
      const strings = await String.findAll({
        where: {
          lyricFileId,
        },
        include: [{
          model: TimeCode, // Указываем модель, которую хотим включить   // Убедитесь, что используете правильный алиас, если он задан
        }],
      });
      return strings ? strings.map((string) => string.get()) : null;
    } catch ({ message }) {
      console.error(message);
    }
  }

  static createStringService = async(lyricFileId, stringNumber, text) => {
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

module.exports = StringService;
