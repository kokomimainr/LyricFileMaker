import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProjectFileState {
  projectFile: File | null;
}

const initialState: ProjectFileState = {
  projectFile: null,
};

const projectFileSlice = createSlice({
  name: 'projectFile',
  initialState,
  reducers: {
    setProjectFile(state, action: PayloadAction<File>) {
      state.projectFile = action.payload;
    },
  },
});

export const { setProjectFile } = projectFileSlice.actions;

export const projectFileReducer = projectFileSlice.reducer;