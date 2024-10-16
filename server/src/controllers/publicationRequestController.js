const PublicationRequestService = require("../services/publicationRequestService");

exports.createPublicationRequest = async (req, res) => {
  try {
    const userId = res.locals.user.id;
    const { lyricFileId } = req.body;
    const publicationRequest =
      await PublicationRequestService.createPublicationRequest(
        lyricFileId,
        userId
      );
    res
      .status(201)
      .json({ message: "Success", publicationRequest: publicationRequest });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
};

exports.getPublicationRequestsByUserId = async (req, res) => {
  try {
    const userId = res.locals.user.id;
    const publicationRequests =
      await PublicationRequestService.getPublicationRequestsByUserId(
        userId
      );
    res
      .status(200)
      .json({ message: "Success", publicationRequests: publicationRequests });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
}

exports.getPublicationRequests = async (req, res) => {
  try {
    const isAdmin = res.locals.user.isAdmin;
    const publicationRequests =
      await PublicationRequestService.getPublicationRequests(isAdmin);
    res
      .status(200)
      .json({ message: "Success", publicationRequests: publicationRequests });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
};

exports.deletePublicationRequest = async (req, res) => {
  try {
    const isAdmin = res.locals.user.isAdmin;
    const { publicationRequestId } = req.params;
    const isDeleted = await PublicationRequestService.deletePublicationRequest(
      publicationRequestId,
      isAdmin
    );
    res.status(200).json({ message: "Success", isDeleted: isDeleted });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
};

exports.updatePublicationRequest = async (req, res) => {
  try {
    const { isAdmin } = res.locals.user;
    const { publicationRequestId } = req.params;
    const { approved } = req.body;
    const updatedRequest = await PublicationRequestService.updatePublicationRequest(
      publicationRequestId,
      isAdmin,
      approved
    );

    res.status(200).json({ message: "Success", publicationRequest: updatedRequest });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
};
