import { axiosInstance } from "@/shared/lib/axiosInstance";
import { FavoriteListResponse } from "../model";

export class FavoriteService {
  static async getFavoriteList(): Promise<FavoriteListResponse> {
    try {
      const response = await axiosInstance.get("/favorites");
      return response.data;
    } catch (error) {
      console.error("Error fetching favorite list:", error);
      throw new Error("Failed to fetch favorite list");
    }
  }

  static async addFavorite(lyricFileId: number): Promise<{}> {
    try {
      const response = await axiosInstance.post(`/favorites/${lyricFileId}`);
      return response.data;
    } catch (error) {
      console.error("Error adding favorite:", error);
      throw new Error("Failed to add favorite");
    }
  }

  static async deleteFavorite(lyricFileId: number): Promise<{}> {
    try {
      const response = await axiosInstance.delete(`/favorites/${lyricFileId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting favorite:", error);
      throw new Error("Failed to delete favorite");
    }
  }
}
