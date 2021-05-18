import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: {} },
  reducers: {
    getUserType: (state, { type, payload }) => {
      return { ...state, user: payload.auth };
    },
  },
});

// Action creators are generated for each case reducer function
export const { getUserType } = authSlice.actions;

export const authReducer = authSlice.reducer;
