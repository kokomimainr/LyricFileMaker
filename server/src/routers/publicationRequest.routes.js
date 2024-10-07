const {
  verifyAccessToken,
  verifyRefreshToken,
} = require("../middleware/verifyToken");
const {
  createPublicationRequest,
  getPublicationRequests,
  deletePublicationRequest,
  updatePublicationRequest,
} = require("../controllers/publicationRequestController");

const router = require("express").Router();

router
  .route("/")
  .post(verifyAccessToken, createPublicationRequest)
  .get(verifyRefreshToken, getPublicationRequests);

router
  .route("/:publicationRequestId")
  .delete(verifyRefreshToken, deletePublicationRequest)
  .put(verifyRefreshToken, updatePublicationRequest);

module.exports = router;
