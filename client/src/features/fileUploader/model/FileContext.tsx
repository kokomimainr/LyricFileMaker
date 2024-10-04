import React, { ReactNode, createContext, useState } from "react";


interface FileContextType {
    file: File | null;
    setFile: (file: File | null) => void;
}

export const FileContext = createContext<FileContextType | undefined>(undefined)

export const FileProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [file, setFile] = useState<File | null>(null);

    return (
        <FileContext.Provider value={{ file, setFile }}>
            {children}
        </FileContext.Provider>
    )
}