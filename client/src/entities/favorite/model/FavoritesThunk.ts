import { AxiosError } from "axios";
import { FavoriteService } from "../api";
import { FavoriteDeleteResponse, FavoriteListResponse, FavoriteResponse } from ".";
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
    return await FavoriteService.getFavoriteList();;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue({
      message: err.response?.data.message || err.message,
    });
  }
});

export const addFavorite = createAsyncThunk<
  FavoriteResponse,
  { lyricFileId: number },
  { rejectValue: RejectValue }
>("favorite/addFavorite", async ({ lyricFileId }, { rejectWithValue }) => {
  try {
    const response: FavoriteResponse = (await FavoriteService.addFavorite(
      lyricFileId
    )) as FavoriteResponse;
    return response;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue({
      message: err.response?.data.message || err.message,
    });
  }
});

export const deleteFavorite = createAsyncThunk<
  FavoriteDeleteResponse,
  { lyricFileId: number },
  { rejectValue: RejectValue }
>("favorite/deleteFavorite", async ({ lyricFileId }, { rejectWithValue }) => {
  try {
    const response: FavoriteDeleteResponse =
      (await FavoriteService.deleteFavorite(
        lyricFileId
      )) as FavoriteDeleteResponse;
    return response;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue({
      message: err.response?.data.message || err.message,
    });
  }
});
