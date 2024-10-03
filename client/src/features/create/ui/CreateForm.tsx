import React, { useState } from "react";
import styles from "./CreateForm.module.css";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { createLyricFile } from "@/entities/lyricFile";
import { createString } from "@/entities/string";
import { setProjectFile } from "@/entities/projectFile/model/projectFileSlice";

const EOL = "\r\n";

type CreateFormProps = {
};

export const CreateForm: React.FC<CreateFormProps> = ({

}) => {
  const dispatcher = useAppDispatch();
  const { lyricFile } = useAppSelector((state) => state.lyricFile);
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    file? dispatcher(setProjectFile(file)): console.log("no file");
  };

  const splitText = (text: string) => {
    return text.split(EOL);
  };

  const handleCreateProject = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatcher(createLyricFile({ trackName: title, isPublic: true }));
    if (lyricFile) {
      splitText(text).forEach((text, index) => {
        dispatcher(
          createString({
            lyricFileId: lyricFile.id,
            stringNumber: index,
            text: text,
          })
        );
      });
    }
    console.log(lyricFile);
    setTitle("");
    setText("");
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
