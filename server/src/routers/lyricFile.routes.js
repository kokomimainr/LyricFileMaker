const {
  getAllLyricFiles,
  getLyricFilesByUserId,
  getLyricFile,
  createLyricFile,
  updateLyricFile,
  deleteLyricFile,
} = require("../controllers/lyricFileController");
const verifyAccessToken = require("../middleware/verifyToken");
const router = require("express").Router();

router
  .route("/")
  .get(getAllLyricFiles)
  .post(verifyAccessToken, createLyricFile);

router
  .route("/:lyricFileId")
  .get(getLyricFile)
  .put(verifyAccessToken, updateLyricFile)
  .delete(verifyAccessToken, deleteLyricFile);

router.route("/my-files").get(verifyAccessToken, getLyricFilesByUserId);

module.exports = router;
