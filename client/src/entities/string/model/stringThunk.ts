import { createAsyncThunk } from "@reduxjs/toolkit";
import { StringListResponse, StringResponse } from ".";
import { StringService } from "../api";
import { AxiosError } from "axios";

type RejectValue = {
    message: string;
  };

  export const getAllStrings = createAsyncThunk<
    StringListResponse,
    {lyricFileId: number},
    { rejectValue: RejectValue }
  >("string/getAllStrings", async ({lyricFileId}, { rejectWithValue }) => {
    try {
      return await StringService.getStrings(lyricFileId);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return rejectWithValue({
        message: err.response?.data.message || err.message,
      });
    }
  });

  export const createString = createAsyncThunk<
    StringResponse,
    {lyricFileId: number; stringNumber: number; text: string},
    { rejectValue: RejectValue }
  >("string/createString", async ({lyricFileId, stringNumber, text}, { rejectWithValue }) => {
    try {
      return await StringService.createString(lyricFileId, stringNumber, text);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return rejectWithValue({
        message: err.response?.data.message || err.message,
      });
    }
  });