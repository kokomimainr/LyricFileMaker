const FavoriteService = require("../services/favoritesService");

exports.addFavorite = async (req, res) => {
    try {
        const { id } = res.locals.user;
        const { lyricFileId } = req.params;
        const favorite = await FavoriteService.addFavorite(id, lyricFileId);
        res.status(201).json({ message: "Success", favorite: favorite });
    } catch ({ message }) {
        res.status(500).json({ message: message });
    }
};
exports.getAllFavorites = async (req, res) => {
    try {
        const { id } = res.locals.user;
        const favorites = await FavoriteService.getAllFavorites(id);
        res.status(200).json({ message: "Success", favorites: favorites });
    } catch ({ message }) {
        res.status(500).json({ message: message });
    }
};

exports.deleteFavorite = async (req, res) => {
    try {
        const { id } = res.locals.user;
        const { lyricFileId } = req.params;
        const deletedId = await FavoriteService.deleteFavorite(id, lyricFileId);
        res.status(200).json({ message: "Success", deletedId });
    } catch ({ message }) {
        res.status(500).json({ message: message });
    }
}