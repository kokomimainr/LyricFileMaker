import { createSlice } from "@reduxjs/toolkit";
import { FavoritesListState } from ".";
import { addFavorite, deleteFavorite, getFavorites } from "./FavoritesThunk";
import { message } from "antd";

const initialState: FavoritesListState = {
    favorites: [],
    error: null,
    loading: false,
  }

  const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(addFavorite.pending, (state) => {
        state.loading = true;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload.favorites;
        state.error = null;
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Неполучилось добавить в избранное";
        message.error(action.payload?.message || "Неполучилось добавить в избранное");
      })
      //////////////////////////////////////////////////////////////////////
        .addCase(getFavorites.pending, (state) => {
          state.loading = true;
        })
        .addCase(getFavorites.fulfilled, (state, action) => {
          state.loading = false;
          state.favorites = action.payload.favorites;
          state.error = null;
        })
        .addCase(getFavorites.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload?.message || "Неполучилось получить избранные файлы";
          message.error(action.payload?.message || "Неполучилось получить избранные файлы");
        })
        /////////////////////////////////////////////////////////////////////
        .addCase(deleteFavorite.pending, (state) => {
          state.loading = true;
        })
        .addCase(deleteFavorite.fulfilled, (state, action) => {
          state.loading = false;
          state.favorites = action.payload.favorites;
          state.error = null;
        })
        .addCase(deleteFavorite.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload?.message || "Неполучилось удалить из избранных";
          message.error(action.payload?.message || "Неполучилось удалить из избранных");
        })
    }, 
})

export default favoritesSlice.reducer