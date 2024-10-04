const { TimeCode } = require("../../db/models");

class TimeCodeService {
  static getTimeCodesByStringIdService = async (stringId) => {
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
  };

  static createTimeCodeService = async (stringId, time) => {
    try {
      const timeCode = await TimeCode.create({ stringId, time });
      return timeCode ? timeCode.get() : null;
    } catch ({ message }) {
      console.error(message);
    }
  };
}

module.exports = TimeCodeService;
