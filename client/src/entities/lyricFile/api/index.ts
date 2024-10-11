import { axiosInstance } from "@/shared/lib/axiosInstance";
import { LyricFileListResponse, LyricFileResponse } from "../model";

export class LyricFileService {
  static async getAllLyricFiles(): Promise<LyricFileListResponse> {
    try {
      const response = await axiosInstance.get("/lyric-files");
      return response.data;
    } catch (error) {
      console.error("Error fetching lyric files:", error);
      throw new Error("Failed to fetch lyric files");
    }
  }

  static async getLyricFilesByUserId(): Promise<LyricFileListResponse> {
    try {
      const response = await axiosInstance.get(`/my-files`);
      return response.data;
    } catch (error) {
      console.error("Error fetching lyric file:", error);
      throw new Error("Failed to fetch lyric file");
    }
  }

  static async getLyricFile(lyricFileId: number): Promise<LyricFileResponse> {
    try {
      const response = await axiosInstance.get(`/lyric-files/${lyricFileId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching lyric file:", error);
      throw new Error("Failed to fetch lyric file");
    }
  }

  static async createLyricFile(
    formData: FormData,
  ): Promise<LyricFileResponse> {
    try {
      const response = await axiosInstance.post("/lyric-files", formData, {
        headers: {'Content-Type': 'multipart/form-data',}
      });
      return response.data;
    } catch (error) {
      console.error("Error creating lyric file:", error);
      throw new Error("Failed to create lyric file");
    }
  }

  static async updateLyricFile(
    lyricFileId: number,
    trackName: string,
    isPublic: boolean
  ): Promise<LyricFileResponse> {
    try {
      const response = await axiosInstance.put(`/lyric-files/${lyricFileId}`, {
        trackName,
        public: isPublic,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating lyric file:", error);
      throw new Error("Failed to update lyric file");
    }
  }

  static async deleteLyricFile(
    lyricFileId: number
  ): Promise<{ message: string }> {
    try {
      const response = await axiosInstance.delete(
        `/lyric-files/${lyricFileId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting lyric file:", error);
      throw new Error("Failed to delete lyric file");
    }
  }
}
