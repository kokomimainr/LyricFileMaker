import { AxiosError } from "axios";
import { FavoriteService } from "../api";
import { FavoriteListResponse } from ".";
import { createAsyncThunk } from "@reduxjs/toolkit";

type RejectValue = {
  message: string;
};

export const getFavorites = createAsyncThunk<
  FavoriteListResponse,
  void,
  { rejectValue: RejectValue }
>("favorite/getFavorites", async (_, { rejectWithValue }) => {
  try {
    const response: FavoriteListResponse =
      await FavoriteService.getFavoriteList();
      
    return response;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue({
      message: err.response?.data.message || err.message,
    });
  }
});

export const addFavorite = createAsyncThunk<
  FavoriteListResponse,
  { lyricFileId: number },
  { rejectValue: RejectValue }
>("favorite/addFavorite", async ({ lyricFileId }, { rejectWithValue }) => {
  try {
    const response: FavoriteListResponse = (await FavoriteService.addFavorite(
      lyricFileId
    )) as FavoriteListResponse;
    return response;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue({
      message: err.response?.data.message || err.message,
    });
  }
});

export const deleteFavorite = createAsyncThunk<
  FavoriteListResponse,
  { lyricFileId: number },
  { rejectValue: RejectValue }
>("favorite/deleteFavorite", async ({ lyricFileId }, { rejectWithValue }) => {
  try {
    const response: FavoriteListResponse =
      (await FavoriteService.deleteFavorite(
        lyricFileId
      )) as FavoriteListResponse;
    return response;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue({
      message: err.response?.data.message || err.message,
    });
  }
});
