export type PublicationRequest = {
    id: number;
    userId: number;
    lyricFileId: number;
    createdAt: Date;
    updatedAt: Date;
}

export type PublicationRequestList = PublicationRequest[];

export type PublicationRequestResponse = {
    message: string;
    publicationRequest: PublicationRequest;
}

export type PublicationRequestListResponse = {
    message: string;
    publicationRequests: PublicationRequestList;
}

export type PublicationRequestState = {
    publicationRequests: PublicationRequest | null;
    error: string | null;
    loading: boolean | null;
}

export type PublicationRequestListState = {
    publicationRequests: PublicationRequestList | [];
    error: string | null;
    loading: boolean | null;
}   