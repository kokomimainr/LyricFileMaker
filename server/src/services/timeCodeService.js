const { TimeCode } = require("../../db/models");

class TimeCodeService {
  static getTimeCode = async (stringId) => {
    try {
      const timeCode = await TimeCode.findOne({
        where: {
          stringId,
        },
      });
      return timeCode ? timeCode.get() : null;
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

  static updateTimeCodeService = async (stringId, time) => {
    try {
      const timeCode = await TimeCode.update({ time }, { where: { stringId } });
      return timeCode ? true : null;
    } catch ({ message }) {
      console.error(message);
    }
  };
}

module.exports = TimeCodeService;
