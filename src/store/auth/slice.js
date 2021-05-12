import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {
    getUserType: (state, { type, payload }) => {
      return payload.auth;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getUserType } = authSlice.actions;

export const authReducer = authSlice.reducer;
