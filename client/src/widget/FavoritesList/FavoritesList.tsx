import { getFavorites } from "@/entities/favorite";
import { LyricFileItem } from "@/entities/lyricFile/ui/LyricFileItem";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import React, { useEffect } from "react";

type FavoritesListProps = {};

export const FavoritesList: React.FC<FavoritesListProps> = ({}) => {
  const {favorites} = useAppSelector((state) => state.favorite);
  const dispatch = useAppDispatch();

  const getFavoritesList = async () => {
    await dispatch(getFavorites());
  };

  useEffect(() => {
    getFavoritesList();
  }, [dispatch]);

  const lyricFiles = favorites.map((favorite) => favorite.LyricFile);

  if(!favorites) {
    return (
      <div>
        looadinsg
      </div>
    )
  }


  return (
    <div>
      <h1>Избранное</h1>
      {lyricFiles && lyricFiles.map((lyricFile) => (
        <LyricFileItem lyricFile={lyricFile} key={lyricFile.id} />
      ))}
    </div>
  );
};

export default FavoritesList;
