import { getFavorites } from "@/entities/favorite";
import { LyricFileItem } from "@/entities/lyricFile/ui/LyricFileItem";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { Typography } from "antd";
import React, { useEffect } from "react";

export const FavoritesList: React.FC = () => {
  const { favorites } = useAppSelector((state) => state.favorite);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFavorites());
  }, [dispatch]);

  // Проверка, если данные загружаются
  if (!favorites) {
    return <div>Загрузка...</div>;
  }

  // Преобразование списка избранных в массив LyricFile
  const lyricFiles = favorites.map((favorite) => favorite.LyricFile);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "20px" }}>
    <div className="progress-files" style={{margin: "40px 0px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Typography.Title>Избранное</Typography.Title>
      {favorites.length === 0 ? <h1>У вас нет избранных файлов.</h1> : lyricFiles.map((lyricFile) => (
        <LyricFileItem lyricFile={lyricFile} key={lyricFile.id} />
      ))}
    </div>
    </div>
  );
};

export default FavoritesList;
