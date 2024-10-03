const { TimeCode } = require("../../db/models");

class TimeCodeService {
  static async getTimeCodesByStringId(stringId) {
    try {
      const timeCodes = await TimeCode.findAll({
        where: {
          stringId,
        },
      });

      return timeCodes ? timeCodes.map((tc) => tc.get()) : null;
    } catch ({ message }) {
      console.error(message);
    }
  }

  static async createTimeCode(stringId, time) {
    try {
      const timeCode = await TimeCode.create({ stringId, time });
      return timeCode ? timeCode.get() : null;
    } catch ({ message }) {
      console.error(message);
    }
  }
}

module.exports = new TimeCodeService();

