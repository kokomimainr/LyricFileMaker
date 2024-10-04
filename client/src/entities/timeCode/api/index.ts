import { axiosInstance } from "@/shared/lib/axiosInstance";
import { TimeCodeResponse } from "../model";

export class TimeCodeService {
  static async getTimeCode(stringId: number): Promise<TimeCodeResponse> {
    try {
      const response = await axiosInstance.get(`/time-codes/${stringId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching time code:", error);
      throw new Error("Failed to fetch time code!");
    }
  }

  static async createTimeCode(stringId: number, time: string): Promise<TimeCodeResponse> {
    try {
      const response = await axiosInstance.post(`/time-codes`, {
        stringId,
        time,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating time code:", error);
      throw new Error("Failed to create time code!");
    }
  }

  static async updateTimeCode(stringId: number, time: string): Promise<TimeCodeResponse> {
    try { 
      const response = await axiosInstance.put(`/time-codes/${stringId}`, {
        time,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating time code:", error);
      throw new Error("Failed to update time code!");
    }
  }
}
