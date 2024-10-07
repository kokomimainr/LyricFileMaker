const {
  getAllLyricFiles,
  getLyricFilesByUserId,
  getLyricFile,
  createLyricFile,
  updateLyricFile,
  deleteLyricFile,
} = require("../controllers/lyricFileController");
const {verifyAccessToken} = require("../middleware/verifyToken");
const router = require("express").Router();

router
  .route("/")
  .get(verifyAccessToken, getAllLyricFiles)
  .post(verifyAccessToken, createLyricFile)

router
  .route("/:lyricFileId")
  .get(getLyricFile)
  .put(verifyAccessToken, updateLyricFile)
  .delete(verifyAccessToken, deleteLyricFile);

module.exports = router;
