import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authModalOpen: false,
};

const authModalSlice = createSlice({
  name: "AuthModal",
  initialState,
  reducers: {
    setAuthModalOpen: (state, action) => {
      state.authModalOpen = action.payload;
    },
  },
});

export const { setAuthModalOpen } = authModalSlice.actions;
export default authModalSlice.reducer;
