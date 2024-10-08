const {
  verifyAccessToken,
  verifyRefreshToken,
} = require("../middleware/verifyToken");
const {
  createPublicationRequest,
  getPublicationRequests,
  deletePublicationRequest,
  updatePublicationRequest,
  getPublicationRequestsByUserId,
} = require("../controllers/publicationRequestController");

const router = require("express").Router();

router
  .route("/")
  .post(verifyAccessToken, createPublicationRequest)
  .get(verifyAccessToken, getPublicationRequests);

router
  .route("/:publicationRequestId")
  .delete(verifyAccessToken, deletePublicationRequest)
  .put(verifyAccessToken, updatePublicationRequest)
  .get(verifyAccessToken, getPublicationRequestsByUserId);

module.exports = router;
