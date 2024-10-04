import { axiosInstance } from "@/shared/lib/axiosInstance";
import { TimeCodeListResponse, TimeCodeResponse } from "../model";

export class TimeCodeService {
  static async getTimeCodes(stringId: number): Promise<TimeCodeListResponse> {
    try {
      const response = await axiosInstance.get(`/time-codes/${stringId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching time codes:", error);
      throw new Error("Failed to fetch time codes!");
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
}
