const { getAllFavorites, addFavorite, deleteFavorite } = require("../controllers/favoritesController");
const { verifyAccessToken } = require("../middleware/verifyToken");

const router = require("express").Router();

router
.route("/")
.get(verifyAccessToken, getAllFavorites)

router
.route("/:lyricFileId")
.post(verifyAccessToken, addFavorite)
.delete(verifyAccessToken, deleteFavorite);

module.exports = router;
