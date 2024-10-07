const { LyricFile } = require("../../db/models");

class LyricFileService {
  static getAllLyricFilesService = async (user) => {
    try {
      const lyricFiles = await LyricFile.findAll();
      return lyricFiles ? lyricFiles.map((lyricFile) => lyricFile.get()) : null;
    } catch ({ message }) {
      console.error(message);
    }
  };

  static getLyricFilesByUserIdService = async (userId) => {
    try {
      const lyricFiles = await LyricFile.findAll({ where: { userId } });
      return lyricFiles ? lyricFiles.map((lyricFile) => lyricFile.get()) : null;
    } catch ({ message }) {
      console.error(message);
    }
  };

  static getLyricFileService = async (lyricFileId) => {
    try {
      const lyricFile = await LyricFile.findOne({ where: { id: lyricFileId } });
      return lyricFile ? lyricFile.get() : null;
    } catch ({ message }) {
      console.error(message);
    }
  };

  static createLyricFileService = async (userId, trackName) => {
    try {
      const lyricFile = await LyricFile.create({
        userId,
        trackName,
      });
      return lyricFile ? lyricFile.get() : null;
    } catch ({ message }) {
      console.error(message);
    }
  };

  static updateLyricFileService = async (
    lyricFileId,
    userId,
    trackName,
    isPublic
  ) => {
    try {
      const lyricFile = await LyricFile.update(
        { trackName, public: isPublic },
        { where: { id: lyricFileId, userId } }
      );
      return lyricFile ? lyricFile.get() : null;
    } catch ({ message }) {
      console.error(message);
    }
  };

  static deleteLyricFileService = async (lyricFileId, userId) => {
    try {
      await LyricFile.destroy({ where: { id: lyricFileId, userId } });
      return true;
    } catch ({ message }) {
      console.error(message);
    }
  };
}

module.exports = LyricFileService;
