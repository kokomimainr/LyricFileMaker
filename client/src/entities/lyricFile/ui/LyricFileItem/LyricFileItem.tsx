import React from "react";
import "./LyricFileItem.css";
import { LyricFile } from "../..";
import { useNavigate } from "react-router-dom";
import { Avatar, Image } from "antd";

type LyricFileItemProps = {
  lyricFile: LyricFile;
};

export const LyricFileItem: React.FC<LyricFileItemProps> = ({ lyricFile }) => {
    const navigate = useNavigate();

    const handleShowCard = () => {
        navigate(`/lyric-file-card/${lyricFile.id}`);
    }

  return (
    <>
      <div className="card pointer-card" onClick={handleShowCard}>
        {<Image
            src={`${import.meta.env.VITE_IMG}/${lyricFile?.cover}`}
            width={200}
              style={{
                backgroundColor: "#ffffff",
              }}
            >
            </Image>}
        {lyricFile && lyricFile.trackName}
      </div>
    </>
  );
};

export default LyricFileItem;
