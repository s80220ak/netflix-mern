import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "zh-TW",
};

const languageSlice = createSlice({
  name: "Language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
