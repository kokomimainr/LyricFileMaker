const { verifyAccessToken, verifyRefreshToken } = require("../middleware/verifyToken");
const {
  createPublicationRequest,
  getPublicationRequests,
  deletePublicationRequest,
} = require("../controllers/publicationRequestController");

const router = require("express").Router();

router
  .route("/")
  .post(verifyAccessToken, createPublicationRequest)
  .get(verifyAccessToken, getPublicationRequests);

router
  .route("/:publicationRequestId")
  .delete(verifyAccessToken, deletePublicationRequest);

module.exports = router;
