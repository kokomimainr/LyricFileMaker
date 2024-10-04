import React, { useEffect, useState } from "react";
import styles from "./StringList.module.css";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { getAllStrings } from "@/entities/string";
import { StringItem } from "@/entities/string/ui/StringItem";
import { createTimeCode, getTimeCode } from "@/entities/timeCode";
import { updateTimeCode } from "@/entities/timeCode/model/timeCodeThunk";
import { getLyricFile } from "@/entities/lyricFile";

type StringListProps = {
  lyricFileId: number;
  progress: number;
};

type StringType = {
  id: number;
  lyricFileId: number;
  stringNumber: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
};

type LineType = {
  time: string;
  text: string;
  stringId: number;
};

const EOL = "\n";

export const StringList: React.FC<StringListProps> = ({
  lyricFileId,
  progress,
}) => {
  const dispatcher = useAppDispatch();
  const { strings } = useAppSelector((state) => state.stringList);
  const { lyricFile } = useAppSelector((state) => state.lyricFile);
  const { timeCodes } = useAppSelector((state) => state.timeCodeList);
  const [resultTable, setResultTable] = useState<LineType[]>([]);
  const [stringIndex, setStringIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedLine, setSelectedLine] = useState<LineType | undefined>(
    undefined
  );
  const [showLrc, setShowLrc] = useState(false);
  const [lrcContent, setLrcContent] = useState("");

  const fetchStrings = async (lyricFileId: number) => {
    await dispatcher(getAllStrings({ lyricFileId }));
  };

  const handleSetTimeCode = (string: StringType, progress: number) => {
    const formattedTime = formateTime(progress);

    dispatcher(createTimeCode({ stringId: string.id, time: formattedTime }));

    setResultTable((prev) => [
      ...prev,
      { time: formattedTime, text: string.text, stringId: string.id },
    ]);
    handleNextIndex();
  };

  const formateTime = (progress: number) => {
    const minutes = Math.floor(progress / 60);
    const seconds = Math.floor(progress % 60);
    const milliseconds = Math.round((progress % 1) * 100);

    const formattedTime = `[${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}:${String(milliseconds).padStart(2, "0")}]`;

    return formattedTime;
  };

  const handleNextIndex = () => {
    setStringIndex((prev) => prev + 1);
  };

  const handleShowEdit = (line: LineType) => {
    setIsEditing(true);
    setSelectedLine(line);
  };

  const handleSubmitEdit = () => {
    const formattedTime = formateTime(progress);

    selectedLine &&
      dispatcher(
        updateTimeCode({
          stringId: selectedLine?.stringId,
          time: formattedTime,
        })
      );

    setResultTable((prev) =>
      prev.map((item) =>
        item.stringId === selectedLine?.stringId
          ? { ...item, time: formattedTime }
          : item
      )
    );
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedLine(undefined);
  };

  const handleCreateLrc = () => {
    dispatcher(getLyricFile({ lyricFileId: lyricFileId }));
    setShowLrc(true);
    setLrcContent(
      resultTable.map((item) => `${item.time}  ${item.text}`).join(EOL)
    );
  };

  const handleDownload = () => {
    const blob = new Blob([lrcContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${lyricFile?.trackName.replaceAll(" ","_")}.lrc`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    fetchStrings(lyricFileId);
  }, [lyricFileId]);

  return (
    <>
      <div className={styles.container}>
        {isEditing ? (
          <div>
            <button onClick={handleSubmitEdit}>🟢</button>
            <button onClick={handleCancelEdit}>❌</button>
            {selectedLine && (
              <StringItem
                key={selectedLine?.stringId}
                stringText={selectedLine?.text}
              />
            )}
          </div>
        ) : (
          <div>
            {strings &&
              [...strings]
                .sort((a, b) => a.stringNumber - b.stringNumber)
                .map(
                  (string, index) =>
                    index === stringIndex && (
                      <div>
                        <button
                          onClick={() => handleSetTimeCode(string, progress)}
                        >
                          🟢
                        </button>
                        <StringItem key={string.id} stringText={string.text} />
                      </div>
                    )
                )}
          </div>
        )}

        <ul>
          {resultTable.map((line) => (
            <div>
              <li onClick={() => handleShowEdit(line)}>
                {line.time} {line.text}
              </li>
            </div>
          ))}
        </ul>

        {strings.length === stringIndex && (
          <div>
            {showLrc ? (
              <div>
                <textarea name="" value={lrcContent} id="" cols={100} rows={20}></textarea>
                <button onClick={handleDownload}>Скачать .lrc файл</button>
              </div>
            ) : (
              <button onClick={handleCreateLrc}>Создать LRC</button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default StringList;
