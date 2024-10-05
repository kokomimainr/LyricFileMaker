import React from "react";
import styles from "./LyricFilesPage.module.css";
import { LyricFileList } from "@/widget/LyricFileList";

type LyricFilesPageProps = {};

export const LyricFilesPage: React.FC<LyricFilesPageProps> = ({}) => {
  return (
    <div className={styles.container}>
      <LyricFileList />
    </div>
  );
};

export default LyricFilesPage;
