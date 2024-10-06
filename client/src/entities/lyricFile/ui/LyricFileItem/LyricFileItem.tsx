import React from "react";
import "./LyricFileItem.css";
import { LyricFile } from "../..";
import { useNavigate } from "react-router-dom";

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
        {lyricFile.trackName}
      </div>
    </>
  );
};

export default LyricFileItem;
