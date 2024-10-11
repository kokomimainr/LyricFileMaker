import { axiosInstance, setAccessToken } from "@/shared/lib/axiosInstance";
import { User } from "../model";

export class UserService {
  static async refreshAccessToken(): Promise<{
    data(data: any): unknown;
    accessToken: string;
    user: User;
  }> {
    const response = await axiosInstance.get("/tokens/refresh");
    setAccessToken(response.data.accessToken);
    return response.data;
  }

  static async signIn(
    email: string,
    password: string
  ): Promise<{ accessToken: string; user: User }> {
    const response = await axiosInstance.post("/auth/signin", {
      email,
      password,
    });
    setAccessToken(response.data.accessToken);
    return response.data;
  }

  static async signUp(
    username: string,
    email: string,
    password: string
  ): Promise<{ user: User }> {
    const response = await axiosInstance.post("/auth/signup", {
      username,
      email,
      password,
    });
    setAccessToken(response.data.accessToken);
    return response.data;
  }

  static async updateUser(
   formData: FormData
  ): Promise<{ user: User }> {
    const response = await axiosInstance.put(`/auth/update`, formData, {
      headers: {'Content-Type': 'multipart/form-data',}
    });
    setAccessToken(response.data.accessToken);
    return response.data;
  }

  static async logout(): Promise<void> {
    await axiosInstance.get("/auth/logout");
    setAccessToken("");
  }
}
