import React, { useState } from "react";
import styles from "./CreateForm.module.css";

type CreateFormProps = {
  setProjectTitle: React.Dispatch<React.SetStateAction<string>>;
  setProjectFile: React.Dispatch<React.SetStateAction<undefined | File>>;
  setProjectText: React.Dispatch<React.SetStateAction<string>>;
  setActiveWorkspace: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreateForm: React.FC<CreateFormProps> = ({
  setProjectTitle,
  setProjectFile,
  setProjectText,
  setActiveWorkspace
}) => {
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setProjectFile(file);
  };

  const handleCreateProject = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProjectTitle(title);
    setProjectText(text);
    setTitle("");
    setText("");
    setActiveWorkspace(true);
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Добавление файлов</h1>
        <form onSubmit={handleCreateProject}>
          <div>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <input type="file" accept="audio/*" onChange={handleFileUpload} />
            <input
              type="text"
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
          </div>
          <button type="submit">Создать</button>
        </form>
      </div>
    </>
  );
};

export default CreateForm;
