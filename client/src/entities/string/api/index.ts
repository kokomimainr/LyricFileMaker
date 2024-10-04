import { axiosInstance } from "@/shared/lib/axiosInstance";
import { StringListResponse, StringResponse } from "../model";

export class StringService {
  static async getStrings(lyricFileId: number): Promise<StringListResponse> {
    try {
      const response = await axiosInstance.get(`/strings/${lyricFileId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching strings:", error);
      throw new Error("Failed to fetch strings");
    }
  }

  static async createString(
    lyricFileId: number,
    stringNumber: number,
    text: string
  ): Promise<StringResponse> {
    try {
      const response = await axiosInstance.post(`/strings`, {
        lyricFileId,
        stringNumber,
        text,
      });

      return response.data;
    } catch (error) {
      console.error("Error creating string:", error);
      throw new Error("Failed to create string");
    }
  }
}
