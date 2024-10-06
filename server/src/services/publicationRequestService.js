const { PublicationRequest } = require("../../db/models");

class PublicationRequestService {
  static async createPublicationRequest(lyricFileId, userId) {
    try {
      const publicationRequest = await PublicationRequest.create({
        lyricFileId,
        userId,
      });
      return publicationRequest ? publicationRequest.get() : null;
    } catch ({ message }) {
      console.error(message);
    }
  }

  static async getPublicationRequests(isAdmin) {
    try {
      if (!isAdmin) {
        return null;
      }
      const publicationRequests = await PublicationRequest.findAll();
      return publicationRequests
        ? publicationRequests.map((publicationRequest) =>
            publicationRequest.get()
          )
        : null;
    } catch ({ message }) {
      console.error(message);
    }
  }

  static async deletePublicationRequest(publicationId, isAdmin) {
    try {
      if (!isAdmin) {
        return null;
      }
      const publicationRequest = await PublicationRequest.destroy({
        where: { id: publicationId },
      });
      return publicationRequest ? true : null;
    } catch ({ message }) {
      console.error(message);
    }
  }
}

module.exports = PublicationRequestService;
