import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: "no_access" },
  reducers: {
    getUserType: (state, { type, payload }) => {
      state.user = payload.auth;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getUserType } = authSlice.actions;

export const authReducer = authSlice.reducer;
