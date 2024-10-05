import React, { useEffect } from "react";
import styles from "./LyricFileItem.module.css";
import { LyricFile } from "../..";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/app/router/routes";

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
      <div className={styles.container} onClick={handleShowCard}>
        {lyricFile.trackName}
      </div>
    </>
  );
};

export default LyricFileItem;
