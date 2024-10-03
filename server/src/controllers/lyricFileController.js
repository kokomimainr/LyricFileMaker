const { LyricFileService } = require("../services/lyricFileService");

exports.getAllLyricFiles = async (req, res) => {
  try {
    const lyricFiles = await LyricFileService.getAllLyricFiles();
    res.status(200).json({ message: "Success", lyricFiles: lyricFiles });
  } catch ({ message }) {
    res.status(500).json({ message: message });
  }
};

exports.getLyricFilesByUserId = async (req, res) => {
  try {
    const { id } = res.locals.user;
    const lyricFiles = await LyricFileService.getLyricFilesByUserId(id);
    res.status(200).json({ message: "Success", lyricFiles: lyricFiles });
  } catch ({ message }) {
    res.status(500).json({ message: message });
  }
};

exports.getLyricFile = async (req, res) => {
  try {
    const { lyricFileId } = req.params;
    const lyricFile = await LyricFileService.getLyricFile(lyricFileId);
    res.status(200).json({ message: "Success", lyricFile: lyricFile });
  } catch ({ message }) {
    res.status(500).json({ message: message });
  }
};

exports.createLyricFile = async (req, res) => {
  try {
    const { id } = res.locals.user;
    const { trackName, public } = req.body;
    const lyricFile = await LyricFileService.createLyricFile(
      id,
      trackName,
      public
    );
    res.status(201).json({ message: "Success", lyricFile: lyricFile });
  } catch ({ message }) {
    res.status(500).json({ message: message });
  }
};

exports.updateLyricFile = async (req, res) => {
  try {
    const { id } = res.locals.user;
    const { lyricFileId } = req.params;
    const { trackName, public } = req.body;
    const lyricFile = await LyricFileService.updateLyricFile(
      lyricFileId,
      id,
      trackName,
      public
    );
    res.status(200).json({ message: "Success", lyricFile: lyricFile });
  } catch ({ message }) {
    res.status(500).json({ message: message });
  }
};

exports.deleteLyricFile = async (req, res) => {
  try {
    const { id } = res.locals.user;
    const { lyricFileId } = req.params;
    await LyricFileService.deleteLyricFile(lyricFileId, id);
    res.status(200).json({ message: "Success" });
  } catch ({ message }) {
    res.status(500).json({ message: message });
  }
};
