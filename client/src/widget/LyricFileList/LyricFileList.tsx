import React, { useEffect } from "react";
import styles from "./LyricFileList.module.css";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { getAllLyricFiles } from "@/entities/lyricFile";
import { LyricFileItem } from "@/entities/lyricFile/ui/LyricFileItem";

type LyricFileListProps = {};

export const LyricFileList: React.FC<LyricFileListProps> = ({}) => {
  const { lyricFiles } = useAppSelector((state) => state.lyricFileList);
  const dispatch = useAppDispatch();

  const getLyricFiles = () => {
    dispatch(getAllLyricFiles());
  };

  useEffect(() => {
    getLyricFiles();
  }, []);

  return (
    <>
      <div className={styles.container}>
        {lyricFiles && [...lyricFiles].map((lyricFile) => <LyricFileItem key={lyricFile.id} lyricFile={lyricFile} />)}
        </div>;
    </>
  );
};

export default LyricFileList;
