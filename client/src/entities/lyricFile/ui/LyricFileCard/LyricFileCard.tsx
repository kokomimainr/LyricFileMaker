import React, { useEffect, useState } from "react";
import { Button, Card, Typography, message } from "antd";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { getAllStrings } from "@/entities/string";
import {
  getFavorites,
  addFavorite,
  deleteFavorite,
} from "@/entities/favorite/model/FavoritesThunk";
import { getLyricFile } from "../../model/lyricFileThunk";
const { Title, Paragraph } = Typography;

export const LyricFileCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state) => state.favoriteList);
  const { user } = useAppSelector((state) => state.user);
  const { lyricFile } = useAppSelector((state) => state.lyricFile);
  const { strings } = useAppSelector((state) => state.stringList);
  const { lyricFileId } = useParams<{ lyricFileId: string }>();

  const getLyricFileCard = async () => {
    if (!lyricFileId) return;
    await dispatch(getLyricFile({ lyricFileId: +lyricFileId }));
    await dispatch(getAllStrings({ lyricFileId: +lyricFileId }));
  };

  const getUserFavorites = async () => {
    await dispatch(getFavorites());
  }

  const copyToClipboard = () => {
    const textToCopy = strings
      ?.map((string) => `${string.TimeCodes?.[0]?.time || ""} ${string.text}`)
      .join("\n");

    navigator.clipboard.writeText(textToCopy || "").then(() => {
      message.success("Текст скопирован в буфер обмена!");
    });
  };

  const handleFavorite = async () => {
    if (!lyricFileId || !user) return;
    await dispatch(addFavorite({ lyricFileId: +lyricFileId }));
  };

  const handleUnfavorite = async () => {
    if (!lyricFileId || !user) return;
    await dispatch(deleteFavorite({ lyricFileId: +lyricFileId }));
  };



  useEffect(() => {
    if(lyricFileId) {
      getLyricFileCard();
    }
    getUserFavorites();
    console.log(favorites, "favorites");
    
  }, [dispatch, lyricFileId]);

  return (
    <Card className="progress-for-file" bordered={false}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Title level={3} style={{ textAlign: "center" }}>
          {lyricFile?.trackName}
        </Title>
        {lyricFileId && favorites && favorites.length > 0 && 
        favorites.some((fav) => fav.lyricFileId === +lyricFileId) ? (
          <Button
            type="primary"
            onClick={handleUnfavorite}
            style={{ marginBottom: "20px" }}
          >
            Удалить из избранного
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={handleFavorite}
            style={{ marginBottom: "20px" }}
          >
            Добавить в избранное
          </Button>
        )}
      </div>
      <div className="text">
        {strings ? (
          <Paragraph className="fullText">
            {strings.map((string, index) => (
              <div key={index}>
                {`${string.TimeCodes?.[0]?.time || ""} ${string.text}`}
                <br />
              </div>
            ))}
          </Paragraph>
        ) : (
          <Paragraph>Загрузка...</Paragraph>
        )}
      </div>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button type="primary" onClick={copyToClipboard}>
          Скопировать весь текст
        </Button>
      </div>
    </Card>
  );
};

export default LyricFileCard;
