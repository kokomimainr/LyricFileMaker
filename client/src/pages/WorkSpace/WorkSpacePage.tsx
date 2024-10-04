import React from "react";
import styles from "./WorkSpacePage.module.css";
import { WorkSpace } from "@/features/workspace/ui";

type WorkSpacePageProps = {};

export const WorkSpacePage: React.FC<WorkSpacePageProps> = ({}) => {
  return (
    <>
      WORKSPACE
      <div className={styles.container}>
        <WorkSpace />
      </div>
    </>
  );
};

export default WorkSpacePage;
