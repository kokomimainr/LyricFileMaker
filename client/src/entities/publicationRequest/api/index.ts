import { axiosInstance } from "@/shared/lib/axiosInstance";


export class PublicationRequestService {

    static async createPublicationRequest(lyricFileId: number) {
        try {
            const publicationRequest = await axiosInstance.post("/publication-requests", {
                lyricFileId
            });
            return publicationRequest.data;
        } catch (error) {
            console.error("Error creating publication request:", error);
            throw new Error("Failed to create publication request");
        }
    }

    static async getPublicationRequests() {
        try {
            const publicationRequests = await axiosInstance.get(`/publication-requests`);
            return publicationRequests.data;
        } catch (error) {
            console.error("Error fetching publication requests:", error);
            throw new Error("Failed to fetch publication requests");
        }
    }

    static async deletePublicationRequest(publicationRequestId: number) {
        try {
            const response = await axiosInstance.delete(`/publication-requests/${publicationRequestId}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting publication request:", error);
            throw new Error("Failed to delete publication request");
        }
    }

}