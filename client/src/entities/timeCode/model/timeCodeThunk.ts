import { createAsyncThunk } from "@reduxjs/toolkit";
import { TimeCodeListResponse, TimeCodeResponse } from ".";
import { TimeCodeService } from "../api";
import { AxiosError } from "axios";

type RejectValue = {
  message: string;
};

export const getTimeCodes = createAsyncThunk<
  TimeCodeListResponse,
  { stringId: number },
  { rejectValue: RejectValue }
>("/time-codes", async ({stringId}, { rejectWithValue }) => {
  try {
    return await TimeCodeService.getTimeCodes( stringId);
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue({
      message: err.response?.data.message || err.message,
    });
  }
});

export const createTimeCode = createAsyncThunk<
  TimeCodeResponse,
  { stringId: number; time: string },
  { rejectValue: RejectValue }
>("/time-codes", async ({stringId, time}, { rejectWithValue }) => {
  try {
    return await TimeCodeService.createTimeCode( stringId, time);
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue({
      message: err.response?.data.message || err.message,
    });
  }
});
