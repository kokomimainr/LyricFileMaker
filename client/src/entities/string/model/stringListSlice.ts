import { createSlice } from "@reduxjs/toolkit"
import { createString, getAllStrings } from "./stringThunk"
import { message } from "antd";
import { StringListState } from ".";

const initialState: StringListState = {
    strings: [],
    error: null,
    loading: false,
}

const stringListSlice = createSlice({
    name: "stringList",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getAllStrings.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllStrings.fulfilled, (state, action) => {
                state.loading = false
                state.strings = action.payload.strings
                state.error = null
            })
            .addCase(getAllStrings.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload?.message || "Failed to get strings"
                message.error(action.payload?.message || "Failed to get strings")
            })
            /////////////////////////////////////////////////////////////////////////
            .addCase(createString.pending, (state) => {
                state.loading = true
            })
            .addCase(createString.fulfilled, (state, action) => {
                state.loading = false
                state.strings = [...state.strings, action.payload.string]
                state.error = null
            })
            .addCase(createString.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload?.message || "Failed to create string"
                message.error(action.payload?.message || "Failed to create string")
            })
    },
})

export default stringListSlice.reducer;