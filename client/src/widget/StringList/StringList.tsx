import React, { useEffect, useState } from "react";
import "./StringList.css";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { getAllStrings } from "@/entities/string";
import { StringItem } from "@/entities/string/ui/StringItem";
import { createTimeCode } from "@/entities/timeCode";
import { updateTimeCode } from "@/entities/timeCode/model/timeCodeThunk";
import { getLyricFile } from "@/entities/lyricFile";
import { Button, Input, message, Typography } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  CopyOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

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
    // a.download = `${lyricFile?.trackName.replaceAll(" ","_")}.lrc`;
    a.download = `${lyricFile?.trackName.replace(/ /g, "_")}.lrc`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(lrcContent)
      .then(() => {
        message.success("Текст скопирован в буфер обмена!");
      })
      .catch(() => {
        message.error("Не удалось скопировать текст.");
      });
  };

  useEffect(() => {
    fetchStrings(lyricFileId);
  }, [lyricFileId]);

  console.log(resultTable.length === 0);

  return (
    <>
      <div>
        {isEditing ? (
          <div className="progress-for-string" style={{ marginBottom: "15px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "3px",
                width: "80%",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "3px" }}
              >
                <Button
                  style={{ marginRight: "10px" }}
                  type="primary"
                  icon={<CheckOutlined />}
                  onClick={handleSubmitEdit}
                ></Button>
                <Button
                  icon={<CloseOutlined />}
                  onClick={handleCancelEdit}
                ></Button>
              </div>

              {selectedLine && (
                <StringItem
                  key={selectedLine?.stringId}
                  stringText={selectedLine?.text}
                />
              )}
            </div>
          </div>
        ) : (
          <div>
            {strings &&
              [...strings]
                .sort((a, b) => a.stringNumber - b.stringNumber)
                .map(
                  (string, index) =>
                    index === stringIndex && (
                      <div style={{ marginBottom: "20px" }} className="progress-for-string">
                        <div
                          style={{
                            width: "80%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            type="primary"
                            icon={<CheckOutlined />}
                            onClick={() => handleSetTimeCode(string, progress)}
                          />
                          <StringItem
                            key={string.id}
                            stringText={string.text}
                          />
                        </div>
                      </div>
                    )
                )}
          </div>
        )}
        {resultTable.length === 0 ? (
          <></>
        ) : (
          <ul className="progress-for-string" style={{ marginBottom: "10px" }}>
            <Typography.Title level={5}>Результат</Typography.Title>
            {resultTable.map((line) => (
              <div className="">
                <li
                  style={{
                    margin: "5px 0",
                    width: "auto",
                    textAlign: "center",
                  }}
                  className="pointer-text"
                  onClick={() => handleShowEdit(line)}
                >
                  {line.time} {line.text}
                </li>
              </div>
            ))}
          </ul>
        )}

        {strings.length === stringIndex && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            {showLrc ? (
              <div className="progress-for-string" style={{marginBottom: "20px"}}>
                <div
                  style={{
                    width: "80%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography.Title level={5}>LRC файл</Typography.Title>
                  <Input.TextArea
                    style={{ width: "100%", resize: "none", marginBottom: "10px" }}
                    value={lrcContent}
                    readOnly
                    autoSize={{ minRows: 5, maxRows: 30 }}
                  ></Input.TextArea>
                  <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "10px" }}>
                    <Button
                      type="primary"
                      icon={<DownloadOutlined />}
                      onClick={handleDownload}
                    >
                      Скачать файл
                    </Button>
                    <Button
                      type="default"
                      icon={<CopyOutlined />}
                      onClick={handleCopy}
                    >
                      Копировать
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <Button
              style={{marginBottom: "15px"}}
                type="primary"
                icon={<DownloadOutlined />}
                onClick={handleCreateLrc}
              >
                Создать LRC
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default StringList;
