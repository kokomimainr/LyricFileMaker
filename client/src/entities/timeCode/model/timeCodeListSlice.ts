import { createSlice } from "@reduxjs/toolkit";
import { TimeCode, TimeCodeListState } from ".";
import { clearBufferTimeCodes, createTimeCode, getTimeCode, updateTimeCode } from "./timeCodeThunk";
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
        .addCase(clearBufferTimeCodes.fulfilled, (state) => {
            state.timeCodes = [] as TimeCode[];
        })
        ////////////////////////////////////////////////////////////////////////////

    },
})

export default timeCodeListSlice.reducer;