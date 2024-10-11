import React from "react";
import { LyricFileCard } from "@/entities/lyricFile/ui/LyricFileCard";

type LyricFilePageProps = {};

export const LyricFilePage: React.FC<LyricFilePageProps> = () => {
  return (
    <>
      <div>
        <LyricFileCard />
      </div>
    </>
  );
};

export default LyricFilePage;
