import { TimeCode } from "../db/models";

export class timeCodeService {
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

