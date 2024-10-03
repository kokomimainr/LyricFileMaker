import { createSlice } from "@reduxjs/toolkit";
import { TimeCodeListState } from ".";
import { createTimeCode, getTimeCodes } from "./timeCodeThunk";
import { message } from "antd";


const initialState: TimeCodeListState = {
    timeCodes: [],
    error: null,
    loading: false,
}

const timeCodeListSlice = createSlice({
    name: "timeCodeList",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(getTimeCodes.pending, (state) => {
            state.loading = true;
        })
        .addCase(getTimeCodes.fulfilled, (state, action) => {
            state.loading = false;
            state.timeCodes = action.payload.timeCodes;
            state.error = null;
        })
        .addCase(getTimeCodes.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to get time codes";
            message.error(action.payload?.message || "Failed to get time codes");
        })
        /////////////////////////////////////////////////////////////////////////////
        .addCase(createTimeCode.pending, (state) => {
            state.loading = true;
        })
        .addCase(createTimeCode.fulfilled, (state, action) => {
            state.loading = false;
            state.timeCodes = [...state.timeCodes, action.payload.timeCode];
            state.error = null;
        })
        .addCase(createTimeCode.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to create time code";
            message.error(action.payload?.message || "Failed to create time code");
        })
    },
})

export default timeCodeListSlice.reducer;