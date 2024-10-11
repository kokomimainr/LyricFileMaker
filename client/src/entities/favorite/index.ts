import favoriteReducer from "./model/FavoritesSlice";
export {favoriteReducer}
export type {Favorite, FavoritesListState} from "./model"
export {FavoriteService} from "./api"
export {getFavorites} from "./model/FavoritesThunk"