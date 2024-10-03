import { createSlice } from "@reduxjs/toolkit";
import { LyricFileListState } from ".";
import {
  createLyricFile,
  deleteLyricFile,
  getAllLyricFiles,
  getLyricFileByUserId,
  updateLyricFile,
} from "./lyricFileThunk";
import { message } from "antd";

const initialState: LyricFileListState = {
  lyricFiles: [],
  error: null,
  loading: false,
};

const lyricFileListSlice = createSlice({
  name: "lyricFileList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllLyricFiles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllLyricFiles.fulfilled, (state, action) => {
        state.loading = false;
        state.lyricFiles = action.payload.lyricFiles;
        state.error = null;
      })
      .addCase(getAllLyricFiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to get lyric files";
        message.error(action.payload?.message || "Failed to get lyric files");
      })
      //////////////////////////////////////////////////////////////////////////
      .addCase(getLyricFileByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLyricFileByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.lyricFiles = action.payload.lyricFiles;
        state.error = null;
      })
      .addCase(getLyricFileByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to get lyric files";
        message.error(action.payload?.message || "Failed to get lyric files");
      })
      //////////////////////////////////////////////////////////////////////////
      .addCase(createLyricFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(createLyricFile.fulfilled, (state, action) => {
        state.loading = false;
        state.lyricFiles = [...state.lyricFiles, action.payload.lyricFile];
        state.error = null;
      })
      .addCase(createLyricFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create lyric file";
        message.error(action.payload?.message || "Failed to create lyric file");
      })
      //////////////////////////////////////////////////////////////////////////
      .addCase(updateLyricFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLyricFile.fulfilled, (state, action) => {
        state.loading = false;
        state.lyricFiles = state.lyricFiles.map((lyricFile) =>
          lyricFile.id === action.payload.lyricFile.id
            ? action.payload.lyricFile
            : lyricFile
        );
        state.error = null;
      })
      .addCase(updateLyricFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update lyric file";
        message.error(action.payload?.message || "Failed to update lyric file");
      })
      //////////////////////////////////////////////////////////////////////////
      .addCase(deleteLyricFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteLyricFile.fulfilled, (state, action) => {
        state.loading = false;
        state.lyricFiles = state.lyricFiles.filter(
          (lyricFile) => lyricFile.id !== action.meta.arg.lyricFileId
        );
        state.error = null;
      })
      .addCase(deleteLyricFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to delete lyric file";
        message.error(action.payload?.message || "Failed to delete lyric file");
      });
  },
});

export default lyricFileListSlice.reducer;