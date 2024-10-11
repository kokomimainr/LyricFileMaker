const TimeCodeService = require("../services/timeCodeService");

exports.getTimeCode = async (req, res) => {
  try {
    const { stringId } = req.params;
    const timeCode = await TimeCodeService.getTimeCode(stringId);
    res.status(200).json({ message: "Success", timeCode: timeCode });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
};

exports.createTimeCode = async (req, res) => {
  try {
    const { stringId, time } = req.body;
    const timeCode = await TimeCodeService.createTimeCodeService(
      stringId,
      time
    );
    res.status(201).json({ message: "Success", timeCode: timeCode });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
};

exports.updateTimeCode = async (req, res) => {
  try {
    const { stringId } = req.params;
    const { time } = req.body;
    const timeCode = await TimeCodeService.updateTimeCodeService(
      stringId,
      time
    );
    res.status(200).json({ message: "Success", timeCode: timeCode });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
};
