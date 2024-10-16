import { createAsyncThunk } from "@reduxjs/toolkit";
import { LyricFileListResponse, LyricFileResponse } from ".";
import { LyricFileService } from "../api";
import { AxiosError } from "axios";

type RejectValue = {
  message: string;
};

export const getAllLyricFiles = createAsyncThunk<
  LyricFileListResponse,
  void,
  { rejectValue: RejectValue }
>("lyricFile/getAllLyricFiles", async (_, { rejectWithValue }) => {
  try {
    return await LyricFileService.getAllLyricFiles();
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue({
      message: err.response?.data.message || err.message,
    });
  }
});

export const getLyricFileByUserId = createAsyncThunk<
  LyricFileListResponse,
  void,
  { rejectValue: RejectValue }
>("lyricFile/getLyricFileByUserId", async (_, { rejectWithValue }) => {
  try {
    return await LyricFileService.getLyricFilesByUserId();
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue({
      message: err.response?.data.message || err.message,
    });
  }
});

export const getLyricFile = createAsyncThunk<
  LyricFileResponse,
  { lyricFileId: number },
  { rejectValue: RejectValue }
>("lyricFile/getLyricFile", async ({ lyricFileId }, { rejectWithValue }) => {
  try {
    return await LyricFileService.getLyricFile(lyricFileId);
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue({
      message: err.response?.data.message || err.message,
    });
  }
});

export const createLyricFile = createAsyncThunk<
  LyricFileResponse,
  FormData,
  { rejectValue: RejectValue }
>(
  "lyricFile/createLyricFile",
  async (formData, { rejectWithValue }) => {
    try {

      return await LyricFileService.createLyricFile(formData);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return rejectWithValue({
        message: err.response?.data.message || err.message,
      });
    }
  }
);

export const updateLyricFile = createAsyncThunk<
  LyricFileResponse,
  { lyricFileId: number; trackName: string; isPublic: boolean },
  { rejectValue: RejectValue }
>(
  "lyricFile/updateLyricFile",
  async ({ lyricFileId, trackName, isPublic }, { rejectWithValue }) => {
    try {
      return await LyricFileService.updateLyricFile(
        lyricFileId,
        trackName,
        isPublic
      );
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return rejectWithValue({
        message: err.response?.data.message || err.message,
      });
    }
  }
);

export const deleteLyricFile = createAsyncThunk<
  { message: string },
  { lyricFileId: number },
  { rejectValue: RejectValue }
>("lyricFile/deleteLyricFile", async ({ lyricFileId }, { rejectWithValue }) => {
  try {
    return await LyricFileService.deleteLyricFile(lyricFileId);
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue({
      message: err.response?.data.message || err.message,
    });
  }
});
