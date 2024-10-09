export type LyricFile = {
  id: number;
  userId: number;
  trackName: string;
  public: boolean;
  cover: string | null ;
  createdAt: Date;
  updatedAt: Date;
};

export type LyricFileList = LyricFile[];

export type LyricFileResponse = {
  message: string;
  lyricFile: LyricFile;
};

export type LyricFileListResponse = {
  message: string;
  lyricFiles: LyricFileList;
};

export type LyricFileState = {
  lyricFile : LyricFile | null;
  error: string | null;
  loading: boolean | null;
}

export type LyricFileListState = {
  lyricFiles: LyricFileList | [];
  error: string | null;
  loading: boolean | null;
}
