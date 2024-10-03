const { StringService } = require("../services/stringService");

exports.getStrings = async (req, res) => {
  try {
    const { lyricFileId } = req.params;
    const strings = await StringService.getStringsByLyricFileId(lyricFileId);
    res.status(200).json({ message: "Success", strings: strings });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
};

exports.createString = async (req, res) => {
  try {
    const { lyricFileId, stringNumber, text } = req.body;
    const string = await StringService.createString(
      lyricFileId,
      stringNumber,
      text
    );
    res.status(201).json({ message: "Success", string: string });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
};
