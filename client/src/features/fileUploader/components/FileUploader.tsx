import React, { useContext } from "react";
import { Upload, Button, message } from "antd";
import { FileContext } from "../model/FileContext";
import { UploadOutlined } from "@ant-design/icons";

const FileUploader: React.FC = () => {
    const context = useContext(FileContext);

    if (!context) {
        throw new Error("FileUploader must be used within a FileProvider");
    }

    const { setFile } = context;

    const handleFileUpload = (file: File) => {
        setFile(file);
        message.success(`${file.name} загружен успешно.`);
        return false; // Prevent automatic upload
    };

    return (
        <Upload 
            accept="audio/*" 
            beforeUpload={handleFileUpload} 
            showUploadList={false}
        >
            <Button icon={<UploadOutlined />}>Загрузить аудио файл</Button>
        </Upload>
    );
};

export default FileUploader;
