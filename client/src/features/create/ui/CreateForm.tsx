import React, { useContext, useState } from "react";
import styles from "./CreateForm.module.css";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { createLyricFile } from "@/entities/lyricFile";
import { createString } from "@/entities/string";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/app/router/routes";
import FileUploader from "@/features/fileUploader/components/FileUploader";
import { clearBufferTimeCodes } from "@/entities/timeCode";

const EOL = "\n";

type CreateFormProps = {};

export const CreateForm: React.FC<CreateFormProps> = ({}) => {
  const dispatcher = useAppDispatch();
  const { lyricFile } = useAppSelector((state) => state.lyricFile);
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const navigate = useNavigate();

  const splitText = (text: string) => {
    return text.split(EOL).map((text) => text.trim());
  };

  const handleCreateProject = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const response = await dispatcher(
      createLyricFile({ trackName: title, isPublic: true })
    );
    
    const payload = response.payload as { lyricFile: { id: number } };

    if (payload) {
      splitText(text).forEach((text, index) => {
        dispatcher(
          createString({
            lyricFileId: payload.lyricFile.id,
            stringNumber: index + 1,
            text: text,
          })
        );
      });
    }
    setTitle("");
    setText("");
    dispatcher(clearBufferTimeCodes())
    navigate(ROUTES.WORKSPACE);
  };

  return (
    <>
      <div className={styles.container}>
        {lyricFile && <h1 className={styles.title}>Файл создан</h1>}
        <h1 className={styles.title}>Добавление файлов</h1>
        <form onSubmit={handleCreateProject}>
          <div>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <FileUploader/>
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Введите текст с переносами строк..."
            />
          </div>
          <button type="submit">Создать</button>
        </form>
      </div>
    </>
  );
};

export default CreateForm;
