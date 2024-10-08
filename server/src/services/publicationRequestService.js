const { PublicationRequest, LyricFile } = require("../../db/models");

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

  static async deletePublicationRequest(publicationRequestId, isAdmin) {
    try {
      if (!isAdmin) {
        return null;
      }
      const publicationRequest = await PublicationRequest.destroy({
        where: { id: publicationRequestId },
      });
      return publicationRequest ? true : null;
    } catch ({ message }) {
      console.error(message);
    }
  }

  static async updatePublicationRequest(publicationId, isAdmin, status) {
    try {
      if (!isAdmin) {
        return null;
      }
      const publicationRequest = await PublicationRequest.findOne({
        where: { id: publicationId },
      })

      const lyricFile = await LyricFile.findOne({where : {id : publicationRequest.lyricFileId}});
      if (!publicationRequest) {
        return null;
      }
      const updatedLyricFile = await lyricFile.update({ public: status });  
      const updatedRequest = await publicationRequest.update({ approved: status });
      return (updatedRequest && updatedLyricFile) ? updatedRequest : null;
    } catch ({ message }) {
      console.error(message);
    }
  }
}

module.exports = PublicationRequestService;
