import React from "react";
import styles from "./LyricFilePage.module.css";
import { LyricFileCard } from "@/entities/lyricFile/ui/LyricFileCard";

type LyricFilePageProps = {};

export const LyricFilePage: React.FC<LyricFilePageProps> = ({}) => {
  return (
    <>
      <div className={styles.container}>
        <LyricFileCard />
      </div>
    </>
  );
};

export default LyricFilePage;
