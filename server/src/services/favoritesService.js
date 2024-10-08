const { Favorites, LyricFile } = require("../../db/models");

class FavoriteService {
  static addFavorite = async (userId, lyricFileId) => {
    try {
      const favorite = await Favorites.create({
        lyricFileId: lyricFileId,
        userId: userId,
      });
      return favorite ? favorite.get() : null;
    } catch ({ message }) {
      console.error(message);
    }
  };

  static getAllFavorites = async (userId) => {
    try {
      const favorites = await Favorites.findAll({
        where: {
          userId,
        },
        include: [
          {
            model: LyricFile,
          },
        ],
      });
      return favorites ? favorites.map((favorite) => favorite.get()) : null;
    } catch ({ message }) {
      console.error(message);
    }
  };

  static deleteFavorite = async (userId, lyricFileId) => {
    try {
      const favorite = await Favorites.findOne({
        where: {
          userId,
          lyricFileId,
        },
      });
      const isDeleted = await favorite.destroy();
      return isDeleted ? favorite.get().id : 0;
    } catch ({ message }) {
      console.error(message);
    }
  };
}

module.exports = FavoriteService;
