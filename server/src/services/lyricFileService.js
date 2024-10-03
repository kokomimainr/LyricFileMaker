import { LyricFile } from "../db/models";

export class lyricFileService {
  static async getAllLyricFiles() {
    try {
      const lyricFiles = await LyricFile.findAll();
      return lyricFiles ? lyricFiles.map((lyricFile) => lyricFile.get()) : null;
    } catch ({ message }) {
      console.error(message);
    }
  }

  static async getLyricFilesByUserId(userId) {
    try {
      const lyricFiles = await LyricFile.findAll({ where: { userId } });
      return lyricFiles ? lyricFiles.map((lyricFile) => lyricFile.get()) : null;
    } catch ({ message }) {
      console.error(message);
    }
  }

  static async getLyricFile(lyricFileId) {
    try {
      const lyricFile = await LyricFile.findOne({ where: { id: lyricFileId } });
      return lyricFile ? lyricFile.get() : null;
    } catch ({ message }) {
      console.error(message);
    }
  }

  static async createLyricFile(userId, trackName, public) {
    try {
      const lyricFile = await LyricFile.create({ userId, trackName, public });
      return lyricFile ? lyricFile.get() : null;
    } catch ({ message }) {
      console.error(message);
    }
  }

  static async updateLyricFile(lyricFileId, userId, trackName, public) {
    try {
      const lyricFile = await LyricFile.update(
        { trackName, public },
        { where: { id: lyricFileId, userId } }
      );
      return lyricFile ? lyricFile.get() : null;
    } catch ({ message }) {
      console.error(message);
    }
  }


  static async deleteLyricFile(lyricFileId, userId) {
    try {
      await LyricFile.destroy({ where: { id: lyricFileId, userId } });
      return true;
    } catch ({ message }) {
      console.error(message);
    }
  }
}


