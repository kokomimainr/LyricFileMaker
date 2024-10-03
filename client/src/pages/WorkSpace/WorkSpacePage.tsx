import React from "react";
import styles from "./WorkSpacePage.module.css";
import { WorkSpace } from "@/features/workspace/ui";

type WorkSpacePageProps = {};

export const WorkSpacePage: React.FC<WorkSpacePageProps> = ({}) => {
  return (
    <>
      WorkSpacePage
      <div className={styles.container}>
      </div>
    </>
  );
};

export default WorkSpacePage;
