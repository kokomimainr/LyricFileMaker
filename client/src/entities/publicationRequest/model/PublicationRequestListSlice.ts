import { createSlice } from "@reduxjs/toolkit";
import { PublicationRequestListState } from ".";

import { message } from "antd";
import {
  createPublicationRequest,
  deletePublicationRequest,
  getAllPublicationRequests,
} from "..";
import {
  getPublicationRequestsByUserId,
  updatePublicationRequest,
} from "./PublicationRequestThunk";

const initialState: PublicationRequestListState = {
  publicationRequests: [],
  error: null,
  loading: false,
};

const PublicationRequestListSlice = createSlice({
  name: "publicationRequestList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPublicationRequestsByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPublicationRequestsByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.publicationRequests = action.payload.publicationRequests;
        state.error = null;
      })
      .addCase(getPublicationRequestsByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to get publication requests";
        message.error(
          action.payload?.message || "Failed to get publication requests"
        );
      })
      .addCase(getAllPublicationRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPublicationRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.publicationRequests = action.payload.publicationRequests;
        state.error = null;
      })
      .addCase(getAllPublicationRequests.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to get publication requests";
        message.error(
          action.payload?.message || "Failed to get publication requests"
        );
      })
      .addCase(createPublicationRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPublicationRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.publicationRequests = [
          action.payload.publicationRequest,
          ...state.publicationRequests,
        ];
        state.error = null;
      })
      .addCase(createPublicationRequest.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to create publication request";
        message.error(
          action.payload?.message || "Failed to create publication request"
        );
      })
      .addCase(deletePublicationRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePublicationRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.publicationRequests = state.publicationRequests.filter(
          (publicationRequest) =>
            publicationRequest.id !== action.meta.arg.publicationRequestId
        );
        state.error = null;
      })
      .addCase(deletePublicationRequest.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to delete publication request";
        message.error(
          action.payload?.message || "Failed to delete publication request"
        );
      })
      .addCase(updatePublicationRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePublicationRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.publicationRequests = [...state.publicationRequests].map(
          (publicationRequest) =>
            publicationRequest.id === action.payload.publicationRequest.id
              ? action.payload.publicationRequest
              : publicationRequest
        );
        state.error = null;
      })
      .addCase(updatePublicationRequest.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to update publication request";
        message.error(
          action.payload?.message || "Failed to update publication request"
        );
      });
  },
});

export default PublicationRequestListSlice.reducer;
