const { lyricFileService } = require("../services/lyricFileService");

exports.getAllLyricFiles = async (req, res) => {
  try {
    const lyricFiles = await lyricFileService.getAllLyricFiles();
    res.status(200).json({ message: "Success", lyricFiles: lyricFiles });
  } catch ({ message }) {
    res.status(500).json({ message: message });
  }
};

exports.getLyricFilesByUserId = async (req, res) => {
  try {
    const { id } = res.locals.user;
    const lyricFiles = await lyricFileService.getLyricFilesByUserId(id);
    res.status(200).json({ message: "Success", lyricFiles: lyricFiles });
  } catch ({ message }) {
    res.status(500).json({ message: message });
  }
};

exports.getLyricFile = async (req, res) => {
  try {
    const { lyricFileId } = req.params;
    const lyricFile = await lyricFileService.getLyricFile(lyricFileId);
    res.status(200).json({ message: "Success", lyricFile: lyricFile });
  } catch ({ message }) {
    res.status(500).json({ message: message });
  }
};

exports.createLyricFile = async (req, res) => {
  try {
    const { id } = res.locals.user;
    const { trackName, public } = req.body;
    const lyricFile = await lyricFileService.createLyricFile(
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
    const lyricFile = await lyricFileService.updateLyricFile(
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
    await lyricFileService.deleteLyricFile(lyricFileId, id);
    res.status(200).json({ message: "Success" });
  } catch ({ message }) {
    res.status(500).json({ message: message });
  }
};
