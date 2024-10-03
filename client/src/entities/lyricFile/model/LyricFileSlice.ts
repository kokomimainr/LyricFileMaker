import { message } from "antd";
import { createSlice } from "@reduxjs/toolkit";
import { getLyricFile } from "./lyricFileThunk";
import { LyricFileState } from ".";

const initialState: LyricFileState = {
    lyricFile: null,
    error: null,
    loading: false,
}

const lyricFileSlice = createSlice({
    name: "lyricFile",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(getLyricFile.pending, (state) => {
            state.loading = true
        })
        .addCase(getLyricFile.fulfilled, (state, action) => {
            state.loading = false
            state.lyricFile = action.payload.lyricFile
            state.error = null
        })
        .addCase(getLyricFile.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || "Failed to get lyric file"
            message.error(action.payload?.message || "Failed to get lyric file")
        })
    }
})

export default lyricFileSlice.reducer