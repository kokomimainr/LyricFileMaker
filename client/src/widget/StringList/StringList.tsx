import React, { useEffect } from "react";
import styles from "./StringList.module.css";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { getAllStrings } from "@/entities/string";
import { StringItem } from "@/entities/string/ui/StringItem";
import { createTimeCode, getTimeCodes } from "@/entities/timeCode";

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

export const StringList: React.FC<StringListProps> = ({
  lyricFileId,
  progress,
}) => {
  const dispatcher = useAppDispatch();
  const { strings } = useAppSelector((state) => state.stringList);
  const { timeCodes } = useAppSelector((state) => state.timeCodeList);
  const [resultTable, setResultTable] = React.useState<any[]>([]);
  const [stringIndex, setStringIndex] = React.useState(0);

  const fetchStrings = async (lyricFileId: number) => {
    await dispatcher(getAllStrings({ lyricFileId }));
  };

  const handleSetTimeCode = (string: StringType, progress: number) => {
    const minutes = Math.floor(progress / 60);
    const seconds = Math.floor(progress % 60);
    const milliseconds = Math.round((progress % 1) * 100); // Получаем миллисекунды

    // Форматируем время в строку "[мм:cc:мсмс]"
    const formattedTime = `[${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}:${String(milliseconds).padStart(2, "0")}]`;

    // Вызываем dispatcher с созданием временного кода
    dispatcher(createTimeCode({ stringId: string.id, time: formattedTime }));
    dispatcher(getTimeCodes({ stringId: string.id }));

    setResultTable((prev) => [
      ...prev,
      { time: formattedTime, stringId: string.id, text: string.text },
    ]);

    handleNextIndex();
  };

  const handleNextIndex = () => {
    setStringIndex((prev) => prev + 1);
  };

  useEffect(() => {
    fetchStrings(lyricFileId);
  }, [lyricFileId]);

  return (
    <>
      <div className={styles.container}>
        {strings &&
          [...strings]
            .sort((a, b) => a.stringNumber - b.stringNumber)
            .map((string, index) => (
                index === stringIndex &&
              <div>
                <button onClick={() => handleSetTimeCode(string, progress)}>
                  🟢
                </button>
                <StringItem key={string.id} string={string} />
              </div>
            ))}
        <ul>
          {resultTable.map((line) => (
            <li>
              {line.time} {line.text}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default StringList;
