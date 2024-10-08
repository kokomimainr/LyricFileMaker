import React, { useEffect, useState } from "react";
import { Button, Card, Typography, message } from "antd";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { getAllStrings } from "@/entities/string";
import { getFavorites, addFavorite, deleteFavorite } from "@/entities/favorite/model/FavoritesThunk";
import { getLyricFile } from "../../model/lyricFileThunk";

const { Title, Paragraph } = Typography;

export const LyricFileCard: React.FC = () => {
  const { favorites } = useAppSelector((state) => state.favorite);
  const { user } = useAppSelector((state) => state.user);
  const { lyricFile } = useAppSelector((state) => state.lyricFile);
  const { strings } = useAppSelector((state) => state.stringList);
  const { lyricFileId } = useParams<{ lyricFileId: string }>();
  const dispatch = useAppDispatch();
  const userId = user?.id;
  const getLyricFileCard = async () => {
    if (!lyricFileId) return;
    await dispatch(getLyricFile({ lyricFileId: +lyricFileId }));
    await dispatch(getAllStrings({ lyricFileId: +lyricFileId }));
  };

  useEffect(() => {
    getLyricFileCard();
  }, [lyricFileId, dispatch]);

  const lyricFileIdNum = Number(lyricFileId);

  // Локальное состояние для отслеживания избранного
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (lyricFileId) {
      dispatch(getLyricFile({ lyricFileId: lyricFileIdNum }));
      dispatch(getAllStrings({ lyricFileId: lyricFileIdNum }));
      dispatch(getFavorites());
    }
  }, [lyricFileId, dispatch, lyricFileIdNum]);

  // Обновляем состояние isFavorite, когда favorites обновляется
  useEffect(() => {
    if (favorites) {
      const isFav = favorites.some(
        (fav) => fav.lyricFileId === lyricFileIdNum && fav.userId === userId
      );
      setIsFavorite(isFav);
    }
  }, [favorites, lyricFileIdNum, userId]);

  const handleFavorite = async () => {
    if (isFavorite) {
      await dispatch(deleteFavorite({ lyricFileId: lyricFileIdNum }));
    } else {
      await dispatch(addFavorite({ lyricFileId: lyricFileIdNum }));
    }
    // Обновляем избранное после изменения
    dispatch(getFavorites());
  };

  const copyToClipboard = () => {
    const textToCopy = strings
      ?.map((string) => `${string.TimeCodes?.[0]?.time || ""} ${string.text}`)
      .join("\n");

    navigator.clipboard.writeText(textToCopy || "").then(() => {
      message.success("Текст скопирован в буфер обмена!");
    });
  };

  return (
    <Card className="progress-for-file" bordered={false}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column" }}>
      <Title level={3} style={{ textAlign: "center" }}>
        {lyricFile?.trackName}
      </Title>
      <Button type="primary" onClick={handleFavorite} style={{ marginBottom: "20px" }}>
          {isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
        </Button>
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
