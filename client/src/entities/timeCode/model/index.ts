
export type TimeCode = {
    id: number;
    stringId: number;
    time: string;
    createdAt: Date;
    updatedAt: Date;
}

export type TimeCodeList = TimeCode[];

export type TimeCodeResponse = {
    timeCode: TimeCode;
}

export type TimeCodeListResponse = {
    timeCodes: TimeCodeList;
}

export type TimeCodeState = {
    timeCode: TimeCode | null;
    error: string | null;
    loading: boolean;
}

export type TimeCodeListState = {
    timeCodes: TimeCodeList | [];
    error: string | null;
    loading: boolean | null;
}