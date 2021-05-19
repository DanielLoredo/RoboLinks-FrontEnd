import { createSelector } from "reselect";

export const selectUserState = (state) => state.auth;

export const selectUser = createSelector(selectUserState, ({ user }) => user);
