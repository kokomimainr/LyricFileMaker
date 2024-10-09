import React from "react";
import "./LyricFileItem.css";
import { LyricFile } from "../..";
import { useNavigate } from "react-router-dom";
import { Card, Image } from "antd";

type LyricFileItemProps = {
  lyricFile: LyricFile;
};

export const LyricFileItem: React.FC<LyricFileItemProps> = ({ lyricFile }) => {
  const navigate = useNavigate();

  const handleShowCard = () => {
    navigate(`/lyric-file-card/${lyricFile.id}`);
  };

  return (
    <Card
      className="pointer-card custom-card"
      hoverable
      onClick={handleShowCard}
      cover={
        <Image
          src={`${import.meta.env.VITE_IMG}/${lyricFile?.cover}`}
          preview={false}
          alt="cover"
          style={{ width: "100%", height: "130px", objectFit: "contain" }}
        />
      }
    >
      <span className="track-name">{lyricFile.trackName}</span>
    </Card>
  );
};

export default LyricFileItem;
