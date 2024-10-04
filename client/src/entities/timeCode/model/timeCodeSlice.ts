import { createSlice } from "@reduxjs/toolkit";
import { TimeCodeState } from ".";
import { getTimeCode, updateTimeCode } from "./timeCodeThunk";
import { message } from "antd";

const initialState: TimeCodeState = {
  timeCode: null,
  error: null,
  loading: false,
};

const timeCodeSlice = createSlice({
  name: "timeCode",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTimeCode.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTimeCode.fulfilled, (state, action) => {
        state.loading = false;
        state.timeCode = action.payload.timeCode;
        state.error = null;
      })
      .addCase(getTimeCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to get time code.";
        message.error(action.payload?.message || "Failed to get time code.");
      })
      .addCase(updateTimeCode.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTimeCode.fulfilled, (state, action) => {
        state.loading = false;
        state.timeCode = action.payload.timeCode;
        state.error = null;
      })
      .addCase(updateTimeCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update time code";
        message.error(action.payload?.message || "Failed to update time code");
      });
  },
});

export default timeCodeSlice.reducer;
