import React, { useEffect } from "react";
import { Button, Card, Typography, message } from "antd";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { getLyricFile } from "../..";
import { getAllStrings } from "@/entities/string";
import { addFavorite } from "@/entities/favorite/model/FavoritesThunk";

const { Title, Paragraph } = Typography;

type LyricFileCardProps = {};

export const LyricFileCard: React.FC<LyricFileCardProps> = () => {
  const { lyricFileId } = useParams();
  const dispatch = useAppDispatch();
  const { lyricFile } = useAppSelector((state) => state.lyricFile);
  const { strings } = useAppSelector((state) => state.stringList);

  const getLyricFileCard = async () => {
    if (!lyricFileId) return;
    dispatch(getLyricFile({ lyricFileId: +lyricFileId }));
    await dispatch(getAllStrings({ lyricFileId: +lyricFileId }));
  };

  useEffect(() => {
    getLyricFileCard();
  }, [lyricFileId, dispatch]);

  const fullText = strings.map((string, index) => {
    const timeCode = string.TimeCodes && string.TimeCodes.length > 0 ? `${string.TimeCodes[0].time} ` : '';
    return (
      <div key={index}>
        <span>{timeCode}{string.text}</span>
        <br /> {/* Добавляем перенос строки */}
      </div>
    );
  });

  const addInFavorite = () => {
    if (lyricFileId !== undefined) {
      dispatch(addFavorite({ lyricFileId: +lyricFileId }));
    } else {
      console.error("lyricFileId is not defined");
    }
  }

  const copyToClipboard = () => {
    const textToCopy = strings
      .map((string) =>
        string.TimeCodes && string.TimeCodes.length > 0
          ? `${string.TimeCodes[0].time} ${string.text}`
          : string.text
      )
      .join("\n");
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      message.success("Текст скопирован в буфер обмена!");
    });
  };

  return (
    <Card className="progress-for-file" bordered={false}>
      <Title style={{ textAlign: "center" }} level={3}>
        {lyricFile?.trackName} 
        <Button type="primary" onClick={addInFavorite}>Добавить в избранное</Button>
      </Title>
      <div className="text">
        <Paragraph className="fullText">{fullText}</Paragraph>
      </div>
      <div className="button-container" style={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
        <Button type="primary" onClick={copyToClipboard}>
          Скопировать весь текст  
        </Button>
      </div>
    </Card>
  );
};

export default LyricFileCard;
