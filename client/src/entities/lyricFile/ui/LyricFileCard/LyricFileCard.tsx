import React, { useEffect } from "react";
import { Button, Card, Typography, message } from "antd";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { getLyricFile } from "../..";
import { getAllStrings } from "@/entities/string";

const { Title, Paragraph } = Typography;

type LyricFileCardProps = {};

export const LyricFileCard: React.FC<LyricFileCardProps> = () => {
  const { lyricFileId } = useParams();
  const dispatch = useAppDispatch();
  const { lyricFile } = useAppSelector((state) => state.lyricFile);
  const { strings } = useAppSelector((state) => state.stringList);
  const { user } = useAppSelector((state) => state.user);

  const getLyricFileCard = async () => {
    if (!lyricFileId) return;
    await dispatch(getLyricFile({ lyricFileId: +lyricFileId }));
    await dispatch(getAllStrings({ lyricFileId: +lyricFileId }));
  };

  useEffect(() => {
    getLyricFileCard();
  }, [lyricFileId, dispatch]);

  const fullText = strings.map((string, index) => {
    const timeCode =
      string.TimeCodes && string.TimeCodes.length > 0
        ? `${string.TimeCodes[0].time} `
        : "";
    return (
      <div key={index}>
        <span>
          {timeCode}
          {string.text}
        </span>
        <br /> {/* Добавляем перенос строки */}
      </div>
    );
  });

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
    <>
      {lyricFile &&
        user &&
        (lyricFile.public ||
          +user?.id === lyricFile.userId ||
          user?.isAdmin) && (
          <Card className="progress-for-file" bordered={false}>
            <Title style={{ textAlign: "center" }} level={3}>
              {lyricFile?.trackName}
            </Title>
            <div className="text">
              <Paragraph className="fullText">{fullText}</Paragraph>
            </div>
            <div
              className="button-container"
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
        )}
    </>
  );
};

export default LyricFileCard;
