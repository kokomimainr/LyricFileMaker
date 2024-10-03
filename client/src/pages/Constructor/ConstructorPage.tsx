import React, { useState } from "react";
import styles from "./ConstructorPage.module.css";
import { CreateForm } from "@/features/create/ui";
import { WorkSpace } from "@/features/workspace/ui";

type ConstructorPageProps = {};

export const ConstructorPage: React.FC<ConstructorPageProps> = ({}) => {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectFile, setProjectFile] = useState<undefined | File>(undefined);
  const [projectText, setProjectText] = useState<string>("");
  const [activeWorkspace, setActiveWorkspace] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      {activeWorkspace ? (
        <WorkSpace
          projectTitle={projectTitle}
          projectFile={projectFile}
          projectText={projectText}
        />
      ) : (
        <CreateForm
          setProjectFile={setProjectFile}
          setProjectText={setProjectText}
          setProjectTitle={setProjectTitle}
          setActiveWorkspace={setActiveWorkspace}
        />
      )}
    </div>
  );
};

export default ConstructorPage;
