import { LyricFile } from "@/entities/lyricFile";

export type Favorite = {
    id: number;
    userId: number;
    lyricFileId: number;
    LyricFile: LyricFile;
    createdAt: Date;
    updatedAt: Date;
}

export type FavoriteResponse = {
    favorite: Favorite;
    message: string;
}

export type FavoriteDeleteResponse = {
    message: string;
    deletedId: number;
}

export type FavoriteListResponse = {
    favorites: Favorite[];
    message: string;
}

export type FavoritesListState = {
    favorites: Favorite[] | [];
    error: string | null;
    loading: boolean | null;
  }