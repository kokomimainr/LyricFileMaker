const { timeCodeService } = require("../services/timeCodeService");

exports.getTimeCodes = async (req, res) => {
  try {
    const { stringId } = req.params;
    const timeCodes = await timeCodeService.getTimeCodesByStringId(stringId);
    res.status(200).json({ message: "Success", timeCodes: timeCodes });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
};

exports.createTimeCode = async (req, res) => {
  try {
    const { stringId, time } = req.body;
    const timeCode = await timeCodeService.createTimeCode(stringId, time);
    res.status(201).json({ message: "Success", timeCode: timeCode });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
}