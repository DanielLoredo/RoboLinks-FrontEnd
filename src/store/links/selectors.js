
import { createSelector } from 'reselect';


export const selectLinksState = (state) => state.links;

export const selectAllLinks = createSelector(
  selectLinksState,
  (links) => links
);