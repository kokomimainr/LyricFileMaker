import React, { useContext } from "react";
import { FileContext } from "../model/FileContext";

const FileUploader: React.FC = () => {
    const context = useContext(FileContext);

    if(!context) {
        throw new Error("FileUploader must be used within a FileProvider");
    }

    const { setFile } = context;

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        file ? setFile(file) : console.log("no file");
    }

    return (
        <input type="file" accept="audio/*" onChange={handleFileUpload} />
    )
}

export default FileUploader