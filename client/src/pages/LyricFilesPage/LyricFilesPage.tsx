import React from "react";
import { LyricFileList } from "@/widget/LyricFileList";

type LyricFilesPageProps = {};

export const LyricFilesPage: React.FC<LyricFilesPageProps> = ({}) => {
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <LyricFileList />
    </div>
  );
};

export default LyricFilesPage;
