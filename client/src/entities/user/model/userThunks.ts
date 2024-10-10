import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthResponse, User } from ".";
import { UserService } from "../api";
import { AxiosError } from "axios";

type RejectValue = {
  message: string;
};

export const refreshAccessToken = createAsyncThunk<
  AuthResponse,
  void,
  { rejectValue: RejectValue }
>("user/refreshAccessToken", async (_, { rejectWithValue }) => {
  try {
    return await UserService.refreshAccessToken();
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue({
      message: err.response?.data.message || err.message,
    });
  }
});

export const signIn = createAsyncThunk<
  AuthResponse,
  { email: string; password: string },
  { rejectValue: RejectValue }
>("user/signIn", async ({ email, password }, { rejectWithValue }) => {
  try {
    return await UserService.signIn(email.toLowerCase(), password);
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue({
      message: err.response?.data.message || err.message,
    });
  }
});
export const signUp = createAsyncThunk<
  {user: User},
  { username: string; email: string; password: string },
  { rejectValue: RejectValue }
>('user/signUp', async ({ username, email, password }, { rejectWithValue }) => {
  try {
    return await UserService.signUp(username, email.toLowerCase(), password);
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue({
      message: err.response?.data.message || err.message,
    });
  }
});

export const updateUser = createAsyncThunk<
  {user: User},
  FormData,
  { rejectValue: RejectValue }
>('user/update', async (formData, { rejectWithValue }) => {
  try {
    return await UserService.updateUser( formData);
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue({
      message: err.response?.data.message || err.message,
    });
  }
});

export const logout = createAsyncThunk<
    void,
    void,
    {rejectValue: RejectValue}
>('user/logout', async (_, {rejectWithValue}) => {
    try {
        return await UserService.logout()
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
    return rejectWithValue({
      message: err.response?.data.message || err.message,
    });
    }
})