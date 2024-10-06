import React, { useEffect, useState } from "react";
import "./LyricFileList.css";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { getAllLyricFiles } from "@/entities/lyricFile";
import { LyricFileItem } from "@/entities/lyricFile/ui/LyricFileItem";
import { Input, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons"; // Импорт иконки


type LyricFileListProps = {};

export const LyricFileList: React.FC<LyricFileListProps> = ({}) => {
  const { lyricFiles } = useAppSelector((state) => state.lyricFileList);
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const getLyricFiles = () => {
    dispatch(getAllLyricFiles());
  };

  useEffect(() => {
    getLyricFiles();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredLyricFiles = lyricFiles.filter((lyricFile) =>
    lyricFile.trackName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div  className="progress-files" style={{margin: "40px 0px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Typography.Title style={{ textAlign: "center" }}>
          Список lrc файлов
        </Typography.Title>
        <Input
          placeholder="Поиск по названию..."
          value={searchTerm}
          onChange={handleChange}
          style={{ width: "80%", marginBottom: "20px" }}
          addonBefore={<SearchOutlined />}
        />
        <div  className="cards" style={{width: "100%", display: "flex", flexDirection: 'row', alignItems: 'center', gap: '40px', justifyContent: 'center' }}>
          {filteredLyricFiles.map((lyricFile) => (
            <LyricFileItem key={lyricFile.id} lyricFile={lyricFile} />
          ))}
        </div>
      </div>
    </>
  );
};

export default LyricFileList;
 