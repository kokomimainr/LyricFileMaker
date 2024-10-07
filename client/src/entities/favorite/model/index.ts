import { LyricFile } from "@/entities/lyricFile";

export type Favorite = {
    id: number;
    userId: number;
    lyricFileId: number;
    LyricFile: LyricFile;
    createdAt: Date;
    updatedAt: Date;
}

export type FavoriteListResponse = {
    favorites: Favorite[];
}

export type FavoritesListState = {
    favorites: Favorite[] | [];
    error: string | null;
    loading: boolean | null;
  }