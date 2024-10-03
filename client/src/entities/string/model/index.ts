import { type } from "os";

export type String = {
    id: number;
    lyricFileId: number;
    stringNumber: number;
    text: string;
    createdAt: Date;
    updatedAt: Date;
};

export type StringList = String[];

export type StringResponse = {
    message: string;
    string: String;
}

export type StringListResponse = {
    message: string;
    strings: StringList;
}

export type StringState = {
    string: String | null;
    error: string | null;
    loading: boolean;
}

export type StringListState = {
    strings: StringList | [];
    error: string | null;
    loading: boolean | null;
}