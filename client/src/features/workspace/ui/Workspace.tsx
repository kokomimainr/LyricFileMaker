import React, { useState } from "react";
import styles from "./WorkSpace.module.css";
import { useAppSelector } from "@/shared/hooks/reduxHooks";
import { StringList } from "@/widget/StringList";
import { MusicPlayer } from "@/features/musicPlayer/ui";
import { Typography } from "antd";

type WorkSpaceProps = {};

export const WorkSpace: React.FC<WorkSpaceProps> = ({}) => {
  const { lyricFile } = useAppSelector((state) => state.lyricFile);
  const [progress, setProgress] = useState<number>(0);

  return (
    <>
      {lyricFile && (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Typography.Title className={styles.title}>{lyricFile?.trackName}</Typography.Title>
          <MusicPlayer progress={progress} setProgress={setProgress}/>
          <StringList lyricFileId={lyricFile?.id} progress={progress}/>
        </div>
      )}
    </>
  );
};
