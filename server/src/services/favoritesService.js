const { Favorites, LyricFile } = require("../../db/models");

class FavoriteService {
  static addFavorite = async (userId, lyricFileId) => {
    try {
      console.log('Я тут', userId, lyricFileId);
      const favorite = await Favorites.create({
        lyricFileId: lyricFileId,
        userId: userId,
      });
      return favorite.get();
    } catch ({ message }) {
      console.error(message);
    }
  };

  static getAllFavorites = async (userId) => {
    try {
      console.log('Я тут', userId);
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
      return favorites.map((favorite) => favorite.get());
    } catch ({ message }) {
      console.error(message);
    }
  };

  static deleteFavorite = async (userId, lyricFileId) => {
    try {
      const favorite = await Favorites.destroy({
        where: {
          userId,
          lyricFileId,
        },
      });
      return favorite;
    } catch ({ message }) {
      console.error(message);
    }
  };
}

module.exports = FavoriteService;
