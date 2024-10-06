import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "@/entities/user";
import { timeCodeListReducer, timeCodeReducer } from "@/entities/timeCode";
import { stringListReducer } from "@/entities/string";
import { lyricFileListReducer, lyricFileReducer } from "@/entities/lyricFile";

const store = configureStore({
  reducer: {
    user: userReducer,
    timeCode: timeCodeReducer,
    timeCodeList: timeCodeListReducer,
    stringList: stringListReducer,
    lyricFileList: lyricFileListReducer,
    lyricFile: lyricFileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
