import React, { useEffect } from "react";
import { Button, Card, Image, Typography, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { getAllStrings } from "@/entities/string";
import {
  getFavorites,
  addFavorite,
  deleteFavorite,
} from "@/entities/favorite/model/FavoritesThunk";
import { deleteLyricFile, getLyricFile } from "../../model/lyricFileThunk";
import {
  DeleteFilled,
  DownloadOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons";
const { Title, Paragraph } = Typography;
import "./LyricFileCard.css";

export const LyricFileCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
  };

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

  const handleDownload = async () => {
    const textToCopy = strings
      ?.map((string) => `${string.TimeCodes?.[0]?.time || ""} ${string.text}`)
      .join("\n");
    const blob = new Blob([textToCopy || ""], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${lyricFile?.trackName.replace(/ /g, "_")}.lrc`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleDelete = async () => {
    if (!lyricFileId || !user) return;
    await dispatch(deleteLyricFile({ lyricFileId: +lyricFileId }));
    navigate(-1)
  };

  useEffect(() => {
    if (lyricFileId) {
      getLyricFileCard();
    }
    getUserFavorites();
  }, [dispatch, lyricFileId]);

  return (
    <>
      {lyricFile &&
      !lyricFile.public &&
      user?.id !== lyricFile.userId &&
      !user?.isAdmin ? (
        <div>
          <Title style={{ textAlign: "center" }}>
            Такого файла не существует
          </Title>
        </div>
      ) : (
        <Card className="progress-for-file" bordered={false}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {
              <Image
                src={`${import.meta.env.VITE_IMG}/${lyricFile?.cover}`}
                width={200}
                style={{
                  backgroundColor: "#ffffff",
                  objectFit: "cover",
                  borderRadius: "5px",
                  width: "200px",
                  height: "200px",
                }}
              ></Image>
            }
            <Title level={3} style={{ textAlign: "center", marginTop: "20px" }}>
              {lyricFile?.trackName}
            </Title>
            {user?.isAdmin ? (
              <Button
                type="dashed"
                icon={<DeleteFilled />}
                style={{ marginBottom: "20px" }}
                onClick={handleDelete}
              >
                Удалить файл
              </Button>
            ) : (
              <>
              
                {lyricFileId &&
                favorites &&
                favorites.length > 0 &&
                favorites.some((fav) => fav.lyricFileId === +lyricFileId) ? (
                  <Button
                    type="primary"
                    icon={<StarFilled />}
                    onClick={handleUnfavorite}
                    style={{ marginBottom: "20px" }}
                  >
                    Удалить из избранного
                  </Button>
                ) : (
                  <Button
                    type="dashed"
                    icon={<StarOutlined />}
                    onClick={handleFavorite}
                    style={{ marginBottom: "20px" }}
                  >
                    Добавить в избранное
                  </Button>
                )}
              </>
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
            className="progress-button-for-file"
          >
            <Button type="primary" onClick={copyToClipboard}>
              Скопировать весь текст
            </Button>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={handleDownload}
            >
              Скачать файл
            </Button>
            {user?.id === lyricFile?.userId && (
                <Button
                type="dashed"
                icon={<DeleteFilled />}
                style={{ marginBottom: "20px" }}
                onClick={handleDelete}
              >
                Удалить файл
              </Button>
              )}
          </div>
        </Card>
      )}
    </>
  );
};

export default LyricFileCard;
