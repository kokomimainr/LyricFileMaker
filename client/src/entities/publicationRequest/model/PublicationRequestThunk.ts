import { createAsyncThunk } from "@reduxjs/toolkit";
import { PublicationRequestListResponse, PublicationRequestResponse } from ".";
import { PublicationRequestService } from "../api";
import { AxiosError } from "axios";

type RejectValue = {
  message: string;
};

export const createPublicationRequest = createAsyncThunk<
  PublicationRequestResponse,
  { lyricFileId: number },
  { rejectValue: RejectValue }
>(
  "publicationRequest/createPublicationRequest",
  async ({ lyricFileId }, { rejectWithValue }) => {
    try {
      return await PublicationRequestService.createPublicationRequest(
        lyricFileId
      );
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return rejectWithValue({
        message: err.response?.data.message || err.message,
      });
    }
  }
);

export const getPublicationRequestsByUserId = createAsyncThunk<
  PublicationRequestListResponse,
  void,
  { rejectValue: RejectValue }
>(
  "publicationRequest/getPublicationRequestByUserId",
  async (_, { rejectWithValue }) => {
    try {
      return await PublicationRequestService.getPublicationRequestsByUserId();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return rejectWithValue({
        message: err.response?.data.message || err.message,
      });
    }
  }
);

export const getAllPublicationRequests = createAsyncThunk<
  PublicationRequestListResponse,
  void,
  { rejectValue: RejectValue }
>(
  "publicationRequest/getAllPublicationRequests",
  async (_, { rejectWithValue }) => {
    try {
      return await PublicationRequestService.getPublicationRequests();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return rejectWithValue({
        message: err.response?.data.message || err.message,
      });
    }
  }
);

export const deletePublicationRequest = createAsyncThunk<
  PublicationRequestResponse,
  { publicationRequestId: number },
  { rejectValue: RejectValue }
>(
  "publicationRequest/deletePublicationRequest",
  async ({ publicationRequestId }, { rejectWithValue }) => {
    try {
      return await PublicationRequestService.deletePublicationRequest(
        publicationRequestId
      );
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return rejectWithValue({
        message: err.response?.data.message || err.message,
      });
    }
  }
);

export const updatePublicationRequest = createAsyncThunk<
  PublicationRequestResponse,
  { publicationRequestId: number; status: boolean },
  { rejectValue: RejectValue }
>(
  "publicationRequest/updatePublicationRequest",
  async ({ publicationRequestId, status }, { rejectWithValue }) => {
    try {
      return await PublicationRequestService.updatePublicationRequest(
        publicationRequestId,
        status
      );
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return rejectWithValue({
        message: err.response?.data.message || err.message,
      });
    }
  }
);
